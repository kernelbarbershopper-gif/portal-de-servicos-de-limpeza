export default async function handler(req: any, res: any) {
  const send = (code: number, data: any) => {
    res.writeHead(code, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
  };

  if (req.method !== 'POST') return send(405, { error: 'Method not allowed' });

  let body = '';
  for await (const chunk of req) body += chunk;

  let parsed: any;
  try {
    parsed = JSON.parse(body);
  } catch {
    return send(400, { error: 'Invalid JSON' });
  }

  const { messages, lang } = parsed;
  if (!messages || !Array.isArray(messages)) return send(400, { error: 'Messages array required' });

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) return send(500, { error: 'GROQ_API_KEY not configured' });

  const system = lang === 'pt'
    ? 'Você é um assistente amigável da plataforma LimpezaJá, um portal de serviços de limpeza. Ajude o usuário com dúvidas sobre como publicar diárias, encontrar diaristas, preços, avaliações, etc. Seja breve e direto (máximo 3 frases).'
    : lang === 'es'
    ? 'Eres un asistente amigable de la plataforma LimpezaJá, un portal de servicios de limpieza. Ayuda al usuario con dudas sobre cómo publicar trabajos, encontrar limpiadores, precios, reseñas, etc. Sé breve y directo (máximo 3 frases).'
    : 'You are a friendly assistant for the LimpezaJá platform, a cleaning services portal. Help users with questions about posting jobs, finding cleaners, prices, reviews, etc. Be brief and direct (max 3 sentences).';

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [{ role: 'system', content: system }, ...messages],
        temperature: 0.7,
        max_tokens: 256,
      }),
    });

    const data = await response.json();
    if (!response.ok) return send(response.status, { error: data.error?.message || 'Groq error' });

    return send(200, { text: data.choices?.[0]?.message?.content || '' });
  } catch (err: any) {
    return send(500, { error: err.message || 'Internal error' });
  }
}
