import { compare } from 'bcryptjs';

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

    return new Response(
      JSON.stringify({ id: user.id }), 
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