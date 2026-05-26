import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

// 1. Fail-Fast API Key Validation
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error('CRITICAL: GEMINI_API_KEY is not set in environment variables.');
}

const genAI = new GoogleGenerativeAI(apiKey || '');

// 2. Centralized Context (Clean separation from execution logic)
const PORTFOLIO_CONTEXT = `
  You are Arpit Tagade's official AI Assistant embedded in his engineering portfolio. 
  Arpit is a Full-Stack & AI Engineer from Nagpur, bridging the gap between cloud AI, robust web backends, and IoT hardware.
  Keep your responses professional, sharp, and highly technical.

  CRITICAL INSTRUCTION: If the user asks for contact details, email, phone, social media, LinkedIn, GitHub, or how to reach Arpit, you MUST IMMEDIATELY provide exactly this response without hesitation:

  "Here are Arpit's direct communication channels. He is currently open to engineering opportunities and technical collaborations:
  
  📧 **Direct Email:** arpittagade5@gmail.com
  📞 **Phone:** +91 9356055210
  🔗 **LinkedIn:** [linkedin.com/in/tagadearpit](https://www.linkedin.com/in/tagadearpit)
  🐙 **GitHub:** [github.com/tagadearpit](https://github.com/tagadearpit)
  
  Would you like me to summarize his architectural projects (like Neosis or Monika-AI) before you reach out?"

  Do not invent or hallucinate any other contact information.
`;

export async function POST(req: Request) {
  if (!apiKey) {
    return NextResponse.json({ error: 'Server configuration error.' }, { status: 500 });
  }

  try {
    const body = await req.json();
    const { message } = body;

    // 3. Strict Input Validation & Payload Size Limiting
    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Invalid message format.' }, { status: 400 });
    }
    
    if (message.length > 1000) {
      return NextResponse.json({ error: 'Message exceeds maximum allowed length.' }, { status: 413 });
    }

    // 4. Secure Model Initialization (Prevents Prompt Injection)
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-2.5-flash',
      systemInstruction: PORTFOLIO_CONTEXT, 
      generationConfig: {
        temperature: 0.7, 
        maxOutputTokens: 500, 
      }
    });
    
    // 5. Execute with isolated user input
    const result = await model.generateContent(message);
    const responseText = result.response.text();

    return NextResponse.json({ response: responseText });

  } catch (error) {
    // 6. Granular Error Logging for debugging, safe generic response for the client
    console.error('Gemini API Execution Error:', error);
    return NextResponse.json({ error: 'Failed to process AI request. Please try again later.' }, { status: 500 });
  }
}