import express from 'express';
import dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

const app = express();
app.use(express.json());

const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.VITE_OPENAI_API_KEY,
  })
);

app.post('/api/ask', async (req, res) => {
  const { theme } = req.body;

  let prompt = '';
  if (theme === 'cinema') {
    prompt = theme.startsWith('en_') ? 'Talk about the greatest movies of all time.' : 'Fale sobre os melhores filmes de todos os tempos.';
  } else if (theme === 'ia_vertical') {
    prompt = theme.startsWith('en_') ? 'Explain the concept of Vertical AI and its applications.' : 'Explique o conceito de IA Vertical e suas aplicações.';
  } else if (theme === 'futebol') {
    prompt = theme.startsWith('en_') ? 'Who are the best soccer players in history?' : 'Quais são os melhores jogadores de futebol da história?';
  }

  try {
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt,
      max_tokens: 150,
    });

    res.json({ answer: response.data.choices[0].text.trim() });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao se conectar à IA.' });
  }
});

const port = process.env.PORT || 5177;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});