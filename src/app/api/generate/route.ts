import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();

  const response = await fetch('http://localhost:8000/generate-course', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      topic: body.topic,
      format: 'json'
    })
  });

  const data = await response.json();
  return NextResponse.json(data);
}
