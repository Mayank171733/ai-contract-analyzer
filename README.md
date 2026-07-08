# AI Contract Analyzer

# PROJECT_DEVELOPMENT_GUIDE.md

---

# AI Contract Analyzer - Complete Development Guide

**Goal:** Build a working MVP in 3 Days

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

# Frontend Structure

```text
client/

src/

components/
    Navbar.jsx
    Sidebar.jsx
    UploadBox.jsx
    RiskCard.jsx
    SummaryCard.jsx

pages/
    Login.jsx
    Register.jsx
    Dashboard.jsx
    Upload.jsx
    Analysis.jsx

services/
    api.js

App.jsx
main.jsx
```

---

# Development Roadmap

## STEP 1

Create Git Repository

```bash
git init
```

Commit

```bash
git commit -m "Initial Project Setup"
```

---

## STEP 2

Setup Backend

Install

```bash
npm init -y

npm install express mongoose dotenv cors bcryptjs jsonwebtoken multer pdf-parse mammoth openai

npm install --save-dev nodemon
```

Create

```text
server.js
```

Run server

Expected output

```text
Server Running
```

---

## STEP 3

Connect MongoDB

Create

```text
config/db.js
```

Tasks

* Create MongoDB connection
* Store URI inside .env
* Test connection

Expected

```text
MongoDB Connected
```

Commit

```text
MongoDB Connected Successfully
```

---

## STEP 4

Create User Model

Fields

```text
name

email

password
```

Tasks

* Create Schema
* Hash Password

---

## STEP 5

Authentication

Create APIs

```text
POST /register

POST /login
```

Tasks

* Register
* Login
* JWT Token
* Password Hashing

Test using Postman

Commit

```text
Authentication Completed
```

---

## STEP 6

File Upload

Install

```bash
npm install multer
```

Create

```text
uploads/
```

API

```text
POST /contracts/upload
```

Tasks

* Upload PDF
* Upload DOCX
* Save path in MongoDB

Commit

```text
Contract Upload Completed
```

---

## STEP 7

Extract Text

Libraries

```text
pdf-parse

mammoth
```

Workflow

```text
Upload

↓

Extract Text

↓

Return Text
```

Test

```text
Upload agreement.pdf

↓

Text appears
```

Commit

```text
Text Extraction Completed
```

---

## STEP 8

AI Integration

Create

```text
services/aiService.js
```

Workflow

```text
Extracted Text

↓

Prompt

↓

AI

↓

JSON Response
```

Prompt

```text
Analyze this contract.

Return:

Summary

Risk Score

Important Clauses

Risks

Recommendations

Return JSON only.
```

Expected

```json
{
  "summary":"...",
  "riskScore":6,
  "clauses":[...],
  "risks":[...],
  "recommendations":[...]
}
```

Commit

```text
AI Integration Completed
```

---

## STEP 9

Database

Create

Contract Collection

```text
filename

filepath

userid

uploadedAt
```

Analysis Collection

```text
contractId

summary

riskScore

clauses

risks

recommendations
```

---

## STEP 10

Frontend

Create Vite

Install

```bash
npm create vite@latest
```

Install

```bash
npm install axios react-router-dom
```

Install Tailwind CSS

Build Pages

* Login
* Register
* Dashboard
* Upload
* Analysis

Commit

```text
Frontend Setup Completed
```

---

## STEP 11

API Integration

Connect

Frontend

↓

Backend

Using Axios

Create

```text
services/api.js
```

Endpoints

```text
POST Login

POST Register

POST Upload

GET Analysis
```

---

## STEP 12

Dashboard

Show

* Uploaded Contracts
* Summary
* Risk Score
* Clauses
* Recommendations

Layout

```text
Sidebar

Dashboard

Upload

Analysis

Profile
```

---

## STEP 13

Report Generation

Install

```bash
npm install pdfkit
```

Generate PDF containing

* Contract Name
* Summary
* Risks
* Recommendations

API

```text
GET /report/:id
```

---

# API Checklist

Authentication

* Register
* Login

Contracts

* Upload
* Get All
* Get One
* Delete

Analysis

* Analyze
* Get Result

Reports

* Generate PDF

---

# Database Checklist

Users

Contracts

Analysis

---

# UI Checklist

Landing Page

Login

Register

Dashboard

Upload

Analysis

---

# Testing Checklist

□ Register works

□ Login works

□ JWT works

□ Upload works

□ PDF extraction works

□ DOCX extraction works

□ AI returns JSON

□ Analysis stored in MongoDB

□ Dashboard displays results

□ PDF report downloads

---

# Suggested Git Commits

```text
Initial Project Setup

Backend Setup

MongoDB Connected

Authentication Completed

JWT Authentication Added

File Upload Added

PDF Parsing Added

AI Integration Completed

Dashboard Completed

Report Generation Added

UI Improved

Project Completed
```

---

# 3-Day Development Plan

## Day 1 (Backend)

* Project setup
* MongoDB connection
* Authentication
* File upload
* Store contracts

**Goal:** Backend APIs working.

---

## Day 2 (AI)

* Extract text from PDF/DOCX
* Integrate AI API
* Save analysis
* Test responses

**Goal:** AI analysis pipeline working.

---

## Day 3 (Frontend)

* Build React UI
* Connect APIs
* Display analysis
* Generate reports
* Final testing

**Goal:** Complete MVP ready for demonstration.

---

# Final MVP Workflow

```text
Register/Login
      ↓
Dashboard
      ↓
Upload Contract
      ↓
Store File
      ↓
Extract Text
      ↓
Send Text to AI
      ↓
Receive JSON Analysis
      ↓
Save Results
      ↓
Display Summary & Risk Score
      ↓
Download PDF Report
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
