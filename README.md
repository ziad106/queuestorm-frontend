# QueueStorm Frontend

React + Vite SPA. Airwallex-inspired design. Calls the QueueStorm backend API.

## Local Setup
1. `npm install`
2. Create `.env.local` with `VITE_API_URL=http://localhost:8000`
3. `npm run dev`

## Deploy (Vercel)
1. Push to GitHub
2. Vercel → New Project → import repo
3. Framework: Vite (auto-detected)
4. Environment Variable: `VITE_API_URL` = your Render URL
5. Deploy

## Stack
React 18, Vite, no extra UI libraries, Inter font from Google Fonts.
