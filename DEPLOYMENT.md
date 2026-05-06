# Deployment Guide

Deploy the backend first, then deploy the frontend.

## 1. Backend on Render

1. Push this project to GitHub.
2. Open Render and create a new **Web Service**.
3. Connect the GitHub repository.
4. Use these settings:

```text
Root Directory: backend
Runtime: Node
Build Command: npm install
Start Command: npm start
Health Check Path: /api/health
```

5. Add environment variables:

```env
GEMINI_API_KEY=your_real_key
GEMINI_MODEL=gemini-2.5-flash
NODE_ENV=production
MAX_UPLOAD_MB=10
CLIENT_URL=https://your-frontend-domain.vercel.app
CLIENT_URLS=https://your-frontend-domain.vercel.app,https://your-frontend-domain.netlify.app
```

6. Deploy and copy the backend URL, for example:

```text
https://gemini-chatbot-backend.onrender.com
```

7. Confirm this works:

```text
https://gemini-chatbot-backend.onrender.com/api/health
```

## 2. Frontend on Vercel

1. Create a new Vercel project from the same GitHub repo.
2. Set:

```text
Root Directory: frontend
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
```

3. Add this environment variable:

```env
VITE_API_URL=https://your-render-backend-url.onrender.com/api
```

4. Deploy.
5. Copy the Vercel frontend URL.
6. Go back to Render and update:

```env
CLIENT_URL=https://your-vercel-app.vercel.app
CLIENT_URLS=https://your-vercel-app.vercel.app
```

7. Redeploy or restart the Render backend.

## 3. Frontend on Netlify

If using Netlify instead of Vercel:

1. Create a new Netlify site from GitHub.
2. Set:

```text
Base directory: frontend
Build command: npm run build
Publish directory: frontend/dist
```

3. Add:

```env
VITE_API_URL=https://your-render-backend-url.onrender.com/api
```

4. Deploy.
5. Update Render:

```env
CLIENT_URL=https://your-netlify-site.netlify.app
CLIENT_URLS=https://your-netlify-site.netlify.app
```

6. Restart the backend.

## 4. Final Test

Open the deployed frontend and test:

- Text chat
- PDF upload
- TXT upload
- JPG/PNG upload
- Image preview modal
- Document preview
- New Chat reset
- Sidebar multiple chats

The first Render request can be slow on the free plan because the service may sleep when inactive.
