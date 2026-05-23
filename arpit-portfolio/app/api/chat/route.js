import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

// Initialize the Gemini API with your environment variable
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    // Changed to the correct model name
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    
    // System instruction to guide the AI's persona
    const prompt = `
      You are Arpit's AI Assistant on his portfolio website. 
      Arpit is a 19-year-old developer from Nagpur, bridging the gap between AI intelligence and robust software. 
      He is pursuing a B.Tech in Artificial Intelligence and Data Science.
      His skills include Java, JDBC, C/C++, API development, and SQL. 
      Keep your responses professional, concise, and helpful.
      
      User's message: ${message}
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    return NextResponse.json({ response: responseText });
  } catch (error) {
    console.error('Gemini API Error:', error);
    return NextResponse.json({ error: 'Failed to process the request' }, { status: 500 });
  }
}