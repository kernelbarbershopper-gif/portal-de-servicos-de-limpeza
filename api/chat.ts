import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages, lang } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Messages array required' });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'GROQ_API_KEY not configured' });
  }

  const systemMessage = lang === 'pt'
    ? 'Você é um assistente amigável da plataforma LimpezaJá, um portal de serviços de limpeza. Ajude o usuário com dúvidas sobre como publicar diárias, encontrar diaristas, preços, avaliações, etc. Seja breve e direto (máximo 3 frases).'
    : lang === 'es'
    ? 'Eres un asistente amigable de la plataforma LimpezaJá, un portal de servicios de limpieza. Ayuda al usuario con dudas sobre cómo publicar trabajos, encontrar limpiadores, precios, reseñas, etc. Sé breve y directo (máximo 3 frases).'
    : 'You are a friendly assistant for the LimpezaJá platform, a cleaning services portal. Help users with questions about posting jobs, finding cleaners, prices, reviews, etc. Be brief and direct (max 3 sentences).';

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: systemMessage },
          ...messages,
        ],
        temperature: 0.7,
        max_tokens: 256,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Groq API error:', data);
      return res.status(response.status).json({ error: data.error?.message || 'Groq API error' });
    }

    return res.json({
      text: data.choices?.[0]?.message?.content || '',
    });
  } catch (err: any) {
    console.error('Groq fetch error:', err);
    return res.status(500).json({ error: err.message || 'Internal error' });
  }
}
