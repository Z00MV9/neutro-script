// app/api/route.ts
import { NextResponse } from 'next/server';
import { PythonShell, Options } from 'python-shell';

export async function POST(request: Request) {
  const { topic } = await request.json();

  const options:Options = {
    mode: 'text',
    pythonOptions: ['-u'], // unbuffered output
    scriptPath: './python/', // path to your Python script
    args: [topic],
  };

  try {
    const result = await new Promise<string>((resolve, reject) => {
      PythonShell.run('main.py', options ).then(messaage => {
        console.log('results: %j', result);
      });
    });

    return NextResponse.json({ result });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
}