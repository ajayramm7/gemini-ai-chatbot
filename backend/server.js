import 'dotenv/config';
import app from './srcApp.js';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Gemini chatbot backend running on http://localhost:${PORT}`);
});
