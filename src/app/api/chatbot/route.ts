import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.AZURE_OPENAI_API_KEY,
  baseURL: `${process.env.AZURE_OPENAI_ENDPOINT}/openai/deployments/${process.env.AZURE_OPENAI_DEPLOYMENT_NAME}`,
  defaultQuery: {
    'api-version': process.env.AZURE_OPENAI_API_VERSION!,
  },
  defaultHeaders: {
    'api-key': process.env.AZURE_OPENAI_API_KEY!,
  },
});

export async function POST(req: Request) {
  const body = await req.json();

  console.log('AZURE_OPENAI_DEPLOYMENT_NAME:', process.env.AZURE_OPENAI_DEPLOYMENT_NAME);
  console.log('AZURE_OPENAI_API_KEY:', process.env.AZURE_OPENAI_API_KEY ? 'Exists' : 'Missing');
  console.log('AZURE_OPENAI_ENDPOINT:', process.env.AZURE_OPENAI_ENDPOINT);
  console.log('AZURE_OPENAI_API_VERSION:', process.env.AZURE_OPENAI_API_VERSION);

  try {
    const completion = await openai.chat.completions.create({
      model:process.env.AZURE_OPENAI_DEPLOYMENT_NAME!, 
      messages: [
        {
          role: 'system',
          content: 'Posisikan anda sebagai konsultan yang ahli dalam merancang biaya pembangunan. Dan perkenalkan diri anda sebagai TrustBot',
        },
        {
          role: 'user',
          content: body.prompt,
        },
      ],
    });

    return NextResponse.json({ result: completion.choices[0].message.content });
  } catch (err: any) {
    console.error('Azure OpenAI Error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

