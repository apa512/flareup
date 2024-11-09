export async function onRequestGet(context) {
  if (!context.data?.user) {
    return new Response(
      JSON.stringify({ error: 'Unauthorized' }), 
      { status: 401, headers: { 'Content-Type': 'application/json' }}
    );
  }

  return new Response(
    JSON.stringify(context.data.user),
    { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    }
  );
}