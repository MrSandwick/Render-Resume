# MyWebsite — MERN Portfolio with Three.js & Firebase

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

```bash 
git clone <your-repo-url>
cd myweb
npm i
cd client && npm i && cd ..
cd server && npm i && cd ..
cd client
npm run dev -- --host
```
