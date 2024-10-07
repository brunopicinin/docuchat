'use server';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export async function getChatCompletion(messages) {
  const url = 'https://api.openai.com/v1/chat/completions';
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: "gpt-4o",
      messages: messages,
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to get chat completion. Response status: ${response.status}.`);
  }

  const result = await response.json();
  return result?.choices?.[0]?.message;
}
