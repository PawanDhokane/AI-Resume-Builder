# 🧠 AI Resume Builder

An AI-powered resume builder that helps users create, enhance, and share professional resumes effortlessly.

Built with **React, Node.js, Express, MongoDB**, and **AI integrations**, this project allows users to generate polished resumes, preview them in real-time, and share public resume links.

---

## 🚀 Features

- 🔐 User Authentication (JWT-based)
- 📝 Resume Builder with multiple sections
  - Personal Information
  - Professional Summary (AI enhanced)
  - Experience (AI-enhanced job descriptions)
  - Education
  - Skills & Projects
- 🎨 Multiple Resume Templates
- 🎯 Accent Color Customization
- 👁️ Live Resume Preview
- 🌐 Public Resume Share Link
- ☁️ Image Upload Support
- 🤖 AI-powered content enhancement

---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- Redux Toolkit
- Tailwind CSS
- React Router
- Lucide Icons

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Multer (file uploads)

### AI & Cloud
- OpenAI API
- ImageKit

---

## 📁 Project Structure

AI-Resume-Builder/
├── client/ # React frontend
├── server/ # Express backend
├── README.md
└── .gitignore

## ⚙️ Environment Variables
### Backend (`server/.env`)
MONGO_URI=
JWT_SECRET=
OPENAI_API_KEY=
IMAGEKIT_PUBLIC_KEY=
IMAGEKIT_PRIVATE_KEY=
IMAGEKIT_URL_ENDPOINT=

### Frontend (`client/.env`)
VITE_API_BASE_URL=

## 🧪 Running Locally
### 1️⃣ Clone the repository
git clone https://github.com/PawanDhokane/AI-Resume-Builder.git
cd AI-Resume-Builder

### 2️⃣ Backend setup
cd server
npm install
npm run server

### 3️⃣ Frontend setup
cd client
npm install
npm run dev

