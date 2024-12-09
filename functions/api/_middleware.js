const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Content-Type': 'application/json'
};

async function handleCors(context) {
  if (context.request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: corsHeaders
    });
  }

  const response = await context.next();
  const newResponse = new Response(response.body, response);
  
  Object.entries(corsHeaders).forEach(([key, value]) => {
    newResponse.headers.set(key, value);
  });

  return newResponse;
}

async function authenticateToken(context) {
  const authHeader = context.request.headers.get('Authorization');
  
  if (!authHeader) {
    return context.next();
  }

  if (!authHeader.startsWith('Bearer ')) {
    return new Response(
      JSON.stringify({ error: 'Invalid authorization header' }), 
      { status: 401, headers: corsHeaders }
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
      { status: 401, headers: corsHeaders }
    );
  }

  context.data = { user: results[0] };
  return context.next();
}

export const onRequest = [handleCors, authenticateToken];