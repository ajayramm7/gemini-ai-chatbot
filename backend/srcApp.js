import express from 'express';
import cors from 'cors';
import chatRoutes from './routes/chatRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import { notFoundHandler, errorHandler } from './middleware/errorMiddleware.js';

const app = express();

const allowedOrigins = [
  process.env.CLIENT_URL,
  ...(process.env.CLIENT_URLS || '').split(',')
]
  .map((origin) => origin?.trim())
  .filter(Boolean);

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }

    callback(new Error(`CORS blocked request from origin: ${origin}`));
  },
  credentials: false
}));
app.use(express.json({ limit: '2mb' }));

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'gemini-chatbot-api' });
});

app.use('/api/chat', chatRoutes);
app.use('/api/upload', uploadRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
