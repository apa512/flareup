async function authenticateToken(context) {
  const authHeader = context.request.headers.get('Authorization');
  
  if (!authHeader) {
    return context.next();
  }

  if (!authHeader.startsWith('Bearer ')) {
    return new Response(
      JSON.stringify({ error: 'Invalid authorization header' }), 
      { status: 401, headers: { 'Content-Type': 'application/json' }}
    );
  }

  const token = authHeader.split(' ')[1];
  
  const { results } = await context.env.DB.prepare(`
    SELECT users.id, users.email_address 
    FROM users 
    JOIN tokens ON users.id = tokens.user_id 
    WHERE tokens.token = ?
  `)
  .bind(token)
  .run();

  if (!results.length) {
    return new Response(
      JSON.stringify({ error: 'Invalid token' }), 
      { status: 401, headers: { 'Content-Type': 'application/json' }}
    );
  }

  context.data = { user: results[0] };
  return context.next();
}

export const onRequest = [authenticateToken];