# MyWebsite — MERN Portfolio with Three.js & Firebase

![HERO](image.png)

An interactive personal portfolio showcasing projects, skills, and contact via a **React (Vite) + Tailwind + Three.js** frontend and an **Express API** on **Firebase Functions (v2)** with **MongoDB Atlas**.  
Includes local testing with **Firebase Emulators**, a rate-limited **SMTP** contact form, and optional **Cloudflare** custom domain.

## ✨ Features

- 3D interactions via **@react-three/fiber** + **drei** (GLTF models, decals, lights), **Responsive layout**
- **Projects** & **Skills** served from **Express + MongoDB Atlas**
- **Contact** endpoint with **rate limiting** and **SMTP** (Nodemailer)
- **Firebase Hosting** rewrites to `/api/**` (same paths for local & prod)
- Test on real phones over LAN with Vite `--host`

---

## Tech Stack

- **Frontend:** React 18, Vite, Tailwind CSS, Framer Motion, Three.js (@react-three/fiber, @react-three/drei)
- **Backend:** Node 22, Express, Firebase Functions v2 (`onRequest`)
- **Database:** MongoDB Atlas (Mongoose), Mongo Compass, Postman
- **Infra:** Firebase Hosting + Functions; optional Cloudflare DNS for custom domain


## Project Structure
```bash
myweb/
│── client/                       # React + Vite frontend
│   ├── public/                   # static assets (icons, models, favicon)
│   └── src/
│       ├── components/           # UI, 3D canvases, overlays
│       ├── pages/                # route components
│       ├── lib/                  # hooks (useProjects, useSkills), helpers
│       └── main.jsx              # app entry
│
│── server/                       # Express app for Firebase Functions v2
│   └── src/
│       ├── env.js                # env mapping/validation
│       ├── db.js                 # Mongo connection (Mongoose)
│       ├── routes/
│       │   ├── projects.js       # GET /api/projects
│       │   ├── skills.js         # GET /api/skills
│       │   └── contact.js        # POST /api/contact (rate-limited)
│       ├── utils/mailer.js       # Nodemailer SMTP
│       └── index.js              # express -> onRequest handler
│
│── firebase.json                 # Custom
│── .firebaserc                   # Custom
│── .env                          # local environment (CUSTOM)
│── package.json
│── readme.md                     # project documentation (this file)
```

## Key Notes

- Do not call app.listen(...) in Functions v2; the platform binds ports for emulators and prod.
- For mobile performance in Three.js, reduce shadows/polycount and use dpr={[1,2]}.
- Many GLTF models ship with transforms; center and scale once using Box3 utilities.

## Installation & Usage

Prerequisites
- Node.js 22+ and npm
- Docker Desktop (for the Docker workflow)
- Git

Project Structure
```bash
myweb/
├─ client/
│  ├─ src/
│  ├─ vite.config.(ts|js)
│  ├─ .env.development      # client env for local dev (NOT secrets)
│  └─ .env.production       # optional; build-time vars for prod preview
├─ server/
│  ├─ src/
│  ├─ Dockerfile.dev
│  └─ .env                  # server-only secrets
└─ docker-compose.dev.yml
```
### Option A — Run locally (no Docker)
1. Install dependencies
```bash
cd server && npm ci
cd ../client && npm ci
```

2. Create server/.env 
```bash
# HTTP
PORT=5050
CLIENT_ORIGIN=http://localhost:5173

# Database (choose one)
# Local/host Mongo
# MONGO_URI=mongodb://localhost:27017/myweb
# Atlas/remote Mongo
MONGO_URI=mongodb+srv://<user>:<pass>@cluster0.xxxxx.mongodb.net/myweb

# Mail (optional; for MailHog use)
SMTP_HOST=localhost
SMTP_PORT=1025
SMTP_SECURE=false
# SMTP_FROM="My Web <me@example.com>"
```

3. Start dev server
```bash
# Terminal 1
cd server && npm run dev

# Terminal 2
cd client && npm run dev
```

### Option B — Run with Docker (recommended for contributors)
This path lets new contributors clone → up with hot reload.
The API reads environment variables from server/.env using env_file.

1. Put your real values in server/.env
```bash
PORT=5050
CLIENT_ORIGIN=http://localhost:5173
# Use Atlas or your host DB:
...
```
2. Start the stack
```bash
docker compose -f docker-compose.dev.yml up -d --build #from root
```

3. Services
Web (Vite): http://localhost:5173
API: http://localhost:5050