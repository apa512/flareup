import { hash } from 'bcryptjs';

export async function onRequestPost(context) {
  try {
    const { email_address, password } = await context.request.json();

    if (!email_address || !password) {
      return new Response(
        JSON.stringify({ error: 'Email and password are required' }), 
        { status: 400, headers: { 'Content-Type': 'application/json' }}
      );
    }

    const password_digest = await hash(password, 10);

    const { results } = await context.env.DB.prepare(
      'INSERT INTO users (email_address, password_digest) VALUES (?, ?) RETURNING id'
    )
    .bind(email_address, password_digest)
    .run();

    return new Response(
      JSON.stringify({ id: results[0].id }), 
      { 
        status: 201,
        headers: { 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: 'Failed to create user' }), 
      { status: 500, headers: { 'Content-Type': 'application/json' }}
    );
  }
}
