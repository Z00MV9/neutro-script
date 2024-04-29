'use client'
import React, { useState } from 'react';
import { GoogleGenerativeAI ,HarmBlockThreshold, HarmCategory} from '@google/generative-ai';

const genAI = new GoogleGenerativeAI('AIzaSyBTcdxvGiyAN4tT3EJceBf3JMdnzt6gnbc');
//configure({ apiKey: 'AIzaSyBTcdxvGiyAN4tT3EJceBf3JMdnzt6gnbc' });

// Set up the model
const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 0,
    maxOutputTokens: 8192,
};

const safetySettings = [
    {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
    },
];

const systemInstruction = {
    role: "model",
      parts: [
        {
          "text": "You are a chat bot that produces an unbiased up to date latest news article on any given topic provided."
        }
    ]
    //role:'You are a chat bot that produces an unbiased up to date latest news article on any given topic provided.'
};

const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-pro-latest',
    safetySettings,
    generationConfig,
    systemInstruction,
});

const chat  = model.startChat();

async function generateNewsArticle(topic: string): Promise<string> {
    const result = await chat.sendMessage(topic);
    const response = await result.response;
    const text = response.text();
    return text;
}

const NewsGenerator: React.FC = () => {
    const [topic, setTopic] = useState('');
    const [result, setResult] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const generatedArticle = await generateNewsArticle(topic);
        setResult(generatedArticle);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="Give a topic to receive an unbiased news article"
                />
                <button type="submit">Generate</button>
            </form>
            {result && <pre>{result}</pre>}
        </div>
    );
};

export default NewsGenerator;