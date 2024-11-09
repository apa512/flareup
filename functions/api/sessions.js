import { compare } from 'bcryptjs';

function generateToken() {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

export async function onRequestPost(context) {
  try {
    const { email_address, password } = await context.request.json();

    if (!email_address || !password) {
      return new Response(
        JSON.stringify({ error: 'Email and password are required' }), 
        { status: 400, headers: { 'Content-Type': 'application/json' }}
      );
    }

    const { results } = await context.env.DB.prepare(
      'SELECT id, password_digest FROM users WHERE email_address = ?'
    )
    .bind(email_address)
    .run();

    if (!results.length) {
      return new Response(
        JSON.stringify({ error: 'Invalid email or password' }), 
        { status: 401, headers: { 'Content-Type': 'application/json' }}
      );
    }

    const user = results[0];
    const validPassword = await compare(password, user.password_digest);

    if (!validPassword) {
      return new Response(
        JSON.stringify({ error: 'Invalid email or password' }), 
        { status: 401, headers: { 'Content-Type': 'application/json' }}
      );
    }

    const token = generateToken();
    
    await context.env.DB.prepare(
      'INSERT INTO tokens (user_id, token) VALUES (?, ?)'
    )
    .bind(user.id, token)
    .run();

    return new Response(
      JSON.stringify({ token }), 
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Failed to sign in' }), 
      { status: 500, headers: { 'Content-Type': 'application/json' }}
    );
  }
}

export async function onRequestDelete(context) {
  try {
    const authHeader = context.request.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return new Response(
        JSON.stringify({ error: 'Missing token' }), 
        { status: 401, headers: { 'Content-Type': 'application/json' }}
      );
    }

    const token = authHeader.split(' ')[1];
    
    await context.env.DB.prepare(
      'DELETE FROM tokens WHERE token = ?'
    )
    .bind(token)
    .run();

    return new Response(null, { status: 204 });

  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Failed to sign out' }), 
      { status: 500, headers: { 'Content-Type': 'application/json' }}
    );
  }
}