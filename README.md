# Gemini AI Chatbot Web Application

A polished full-stack Gemini chatbot built for an internship assignment with a premium SaaS-style interface, multimodal chat, in-memory context, document understanding, image understanding, markdown responses, and a clean Express architecture.

## Highlights

- Text chat with context-aware Gemini responses
- PDF and TXT uploads with `pdf-parse` text extraction
- PNG, JPG, and JPEG uploads with image preview and Gemini vision support
- In-memory chat context only: messages, document text, and current image
- New Chat flow that clears files, previews, messages, and context
- Multiple chats list in the sidebar
- Drag-and-drop uploads, upload progress, toast notifications, skeleton loading, typing indicator, smooth Framer Motion transitions
- Markdown rendering with GitHub-flavored markdown and syntax-highlighted code blocks
- Copy button for AI responses
- Responsive dark glassmorphism UI inspired by ChatGPT, Claude, Perplexity, and Vercel demos

## Screenshots

Add screenshots after running the project:

- `screenshots/chat-empty-state.png`
- `screenshots/document-context.png`
- `screenshots/image-preview.png`
- `screenshots/mobile-layout.png`

## Tech Stack

**Frontend:** React, Vite, Tailwind CSS, Framer Motion, Axios, React Icons, React Markdown, Highlight.js  
**Backend:** Node.js, Express.js, Multer, pdf-parse, dotenv, cors  
**AI:** Google Gemini API using the recommended `@google/genai` SDK and `gemini-2.5-flash` by default  
**State:** In-memory only, no database, no auth, no sessions

## Folder Structure

```text
.
├── backend
│   ├── controllers
│   ├── middleware
│   ├── routes
│   ├── services
│   ├── utils
│   ├── .env.example
│   ├── package.json
│   ├── server.js
│   └── srcApp.js
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── context
│   │   ├── hooks
│   │   ├── pages
│   │   ├── services
│   │   └── utils
│   ├── .env.example
│   ├── package.json
│   └── vite.config.js
├── .env.example
├── DEPLOYMENT.md
├── package.json
├── render.yaml
└── README.md
```

## Gemini API Setup

1. Open Google AI Studio and create an API key.
2. Copy `backend/.env.example` to `backend/.env`.
3. Add your key:

```env
GEMINI_API_KEY=your_google_gemini_api_key_here
GEMINI_MODEL=gemini-2.5-flash
PORT=5000
CLIENT_URL=http://localhost:5173
CLIENT_URLS=http://localhost:5173
MAX_UPLOAD_MB=10
```

The implementation uses Google’s current recommended JavaScript SDK, `@google/genai`, and defaults to `gemini-2.5-flash`.

Official docs:

- Gemini API quickstart: https://ai.google.dev/gemini-api/docs/quickstart
- Gemini API SDKs: https://ai.google.dev/gemini-api/docs/sdks

## Installation

Install dependencies from the project root:

```bash
npm install
npm run install:all
```

Or install each app manually:

```bash
cd backend
npm install

cd ../frontend
npm install
```

## Run Locally

Start both apps from the root:

```bash
npm run dev
```

Or run separately:

```bash
npm run dev:backend
npm run dev:frontend
```

Frontend: http://localhost:5173  
Backend health check: http://localhost:5000/api/health

## Deployment

Deployment instructions are included in [`DEPLOYMENT.md`](./DEPLOYMENT.md).

Recommended setup:

- Backend: Render web service from the `backend` folder
- Frontend: Vercel or Netlify from the `frontend` folder
- Frontend environment variable: `VITE_API_URL=https://your-backend-url.onrender.com/api`
- Backend environment variables: `GEMINI_API_KEY`, `GEMINI_MODEL`, `CLIENT_URL`, `CLIENT_URLS`, `MAX_UPLOAD_MB`

## Frontend Environment

Copy `frontend/.env.example` to `frontend/.env` if you need to customize the API URL:

```env
VITE_API_URL=http://localhost:5000/api
```

## Example Usage

1. Start a new chat.
2. Ask a text question.
3. Upload a PDF or TXT file and ask Gemini to summarize, compare, or extract insights from it.
4. Upload an image and ask visual questions about it.
5. Continue the conversation. Gemini receives recent message history, active document context, and the active uploaded image.
6. Click **New Chat** to clear all in-memory context and start fresh.

## Architecture Notes

- The backend stores all chat state in a process-local `Map`.
- Uploaded PDF/TXT text is extracted and retained only in server memory for the current chat.
- Image data is stored in memory as base64 for the current chat and sent to Gemini when relevant.
- The frontend receives document metadata and image preview data, while full document text stays server-side.
- No authentication, database, sessions, RAG, embeddings, vector database, or chunking are used.

## Future Improvements

- Streaming Gemini responses
- Export chat as markdown
- Optional local persistence
- Automated test coverage with Vitest and Supertest
- Accessibility audit and Playwright visual regression checks
