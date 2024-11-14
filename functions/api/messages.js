export async function onRequestPost(context) {
  if (!context.data?.user) {
    return new Response(
      JSON.stringify({ error: 'Unauthorized' }), 
      { status: 401 }
    );
  }

  try {
    const { conversation } = await context.request.json();
    console.log(conversation);

    if (!conversation) {
      return new Response(
        JSON.stringify({ error: 'Conversation is required' }), 
        { status: 400 }
      );
    }

    return new Response(
      JSON.stringify({ id: 666 }), 
      { 
        status: 201,
      }
    );

  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Failed to suggest a message' }), 
      { status: 500 }
    );
  }
}
