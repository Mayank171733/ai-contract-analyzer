# AI Contract Analyzer

# PROJECT_DEVELOPMENT_GUIDE.md

---

# AI Contract Analyzer - Complete Development Guide

**Goal:** Build a working MVP in 3 Days# 📄 AI Contract Analyzer

An AI-powered web application that analyzes legal contracts and documents using Google's Gemini AI. Users can securely upload PDF or DOCX files, extract text, receive AI-generated summaries, identify important clauses, assess risks, and get actionable recommendations.

---

## 🚀 Features

- 🔐 User Authentication (JWT)
- 👤 User Registration & Login
- 📄 Upload PDF and DOCX contracts
- 📑 Automatic text extraction
- 🤖 AI-powered contract analysis using Gemini API
- 📋 Contract summary generation
- ⚠️ Risk score calculation
- 📌 Important clause extraction
- 🚨 Risk identification
- 💡 AI recommendations
- 📊 Dashboard to manage uploaded contracts
- 🗑️ Delete uploaded contracts
- 🔒 Protected routes with authentication

---

## 🛠 Tech Stack

### Frontend

- React
- Vite
- React Router DOM
- Axios
- CSS / Tailwind CSS (Optional)

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Multer
- pdf-parse
- mammoth

### AI

- Google Gemini API

---

## 📂 Project Structure

```
AI-Contract-Analyzer/

client/
│
├── src/
│   ├── components/
│   ├── context/
│   ├── pages/
│   ├── services/
│   ├── App.jsx
│   └── main.jsx
│
server/
│
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── services/
├── uploads/
├── server.js
└── .env
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/yourusername/AI-Contract-Analyzer.git
```

### Backend

```bash
cd server

npm install
```

Create `.env`

```env
PORT=3000

MONGO_URI=your_mongodb_connection

JWT_SECRET=your_secret

GEMINI_API_KEY=your_api_key
```

Run

```bash
npm run dev
```

---

### Frontend

```bash
cd client

npm install

npm run dev
```

---

## 📌 API Endpoints

### Authentication

| Method | Endpoint | Description |
|----------|----------------|----------------|
| POST | /api/auth/register | Register User |
| POST | /api/auth/login | Login User |

### Contracts

| Method | Endpoint |
|----------|--------------------------|
| POST | /api/contracts/upload |
| GET | /api/contracts |
| DELETE | /api/contracts/:id |

### Analysis

| Method | Endpoint |
|----------|------------------------|
| POST | /api/analysis/:id |
| GET | /api/analysis/:id |

---

## 🔄 Workflow

```
User Login
      │
      ▼
Dashboard
      │
      ▼
Upload Contract
      │
      ▼
Extract Text
      │
      ▼
Gemini AI Analysis
      │
      ▼
Store Analysis
      │
      ▼
Display Summary, Clauses & Risks
```

---

## 🎯 Future Improvements

- 📥 PDF Report Download
- 📧 Email Analysis Report
- 🌙 Dark Mode
- 📊 Charts & Analytics
- 🏷️ Contract Categories
- 🔍 Search & Filter Contracts
- 📝 Contract Comparison
- ☁️ Cloud Storage Integration

---

## 👨‍💻 Author

**Mayank Vishwakarma**

- GitHub: https://github.com/Mayank171733
- LinkedIn: https://www.linkedin.com/in/mayank-vishwakarma/

---

## 📜 License

This project is developed for educational and portfolio purposes.

**Tech Stack**

* React + Vite
* Tailwind CSS
* Node.js
* Express.js
* MongoDB
* JWT Authentication
* Multer
* pdf-parse
* mammoth
* OpenAI/Gemini API

---

# Final MVP Features

By the end of the project users should be able to:

* Register
* Login
* Upload PDF/DOCX
* Extract contract text
* Analyze contract using AI
* View summary
* View important clauses
* View risk score
* Download report

---

# Final Folder Structure

```text
AI-Contract-Analyzer/

client/
server/
docs/
README.md
```

---

# Backend Structure

```text
server/

config/
    db.js

controllers/
    authController.js
    contractController.js
    analysisController.js

middleware/
    authMiddleware.js
    uploadMiddleware.js

models/
    User.js
    Contract.js
    Analysis.js

routes/
    authRoutes.js
    contractRoutes.js
    analysisRoutes.js

services/
    aiService.js
    pdfService.js

uploads/

server.js
package.json
.env
```

---



# Definition of Done

The project is complete when all of the following work successfully:

* User authentication
* Secure JWT authorization
* PDF/DOCX upload
* Contract text extraction
* AI analysis
* Risk score generation
* Clause extraction
* Dashboard display
* PDF report generation
* MongoDB data persistence

If every item above works end-to-end, you have a functional AI Contract Analyzer MVP suitable for a college project and portfolio.
