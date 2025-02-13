import type { NextApiRequest, NextApiResponse } from 'next';

interface GameResponse {
  message: string;
  id: string;
  result: number[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GameResponse | { error: string }>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const response = await fetch('http://127.0.0.1:8000/save-game', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    });

    if (!response.ok) {
      throw new Error('Backend server error');
    }

    const data = await response.json();
    console.log(data)
    res.status(200).json(data);
  } catch (error) {
    console.error('Error saving game:', error);
    res.status(500).json({ error: 'Failed to save game' });
  }
} 