'use server';

const ROBOFLOW_API_KEY = process.env.ROBOFLOW_API_KEY;
const ROBOFLOW_OCR_WORKFLOW = process.env.ROBOFLOW_OCR_WORKFLOW;

export async function detectTextInImage(imageBase64) {
  const url = `https://detect.roboflow.com/infer/workflows/${ROBOFLOW_OCR_WORKFLOW}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      api_key: ROBOFLOW_API_KEY,
      inputs: {
        image: {
          type: 'base64',
          value: imageBase64,
        },
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to detect text in image. Response status: ${response.status}.`);
  }

  const result = await response.json();
  return result?.outputs?.[0]?.text || '';
}
