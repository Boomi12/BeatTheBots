# ATS Resume Analyzer - Complete Project Documentation

Welcome to the documentation for your **ATS Resume Analyzer**! This guide explains every part of your project, from the tools used to the purpose of each file and dependency.

---

## 🚀 Project Overview
The **ATS Resume Analyzer** is a full-stack web application designed to help job seekers optimize their resumes. It uses **Artificial Intelligence (Gemini AI)** to compare a user's resume against a job description, providing a compatibility score and actionable feedback.

### Core Features:
1. **Resume Parsing**: Extracts text directly from uploaded PDF files.
2. **ATS Scoring**: Calculates how well a resume matches a job description.
3. **AI Feedback**: Provides suggestions for missing skills and bullet point improvements using Google's Gemini AI.
4. **History Tracking**: Users can save and view their previous analysis reports.

---

## 🛠️ Tools & Technologies Used
| Tool | Purpose | Why we used it? |
| :--- | :--- | :--- |
| **React.js (Vite)** | Frontend Framework | Fast development with Vite and better performance for building dynamic user interfaces. |
| **Node.js & Express** | Backend Environment | Scalable and efficient platform for building the API and handling file uploads. |
| **MongoDB & Mongoose** | Database | A flexible NoSQL database to store user login info and resume analysis history. |
| **Gemini AI** | AI Engine | Google's advanced language model used for intelligent resume analysis and suggestions. |
| **Multer** | File Uploads | A standard middleware for handling PDF file uploads in Node.js. |
| **JWT** | Authentication | JSON Web Tokens ensure that users can securely log in and see only their own data. |

---

## 📂 File Structure & Explanations

### 1. Backend (The Brain)
Responsible for handling data, parsing PDFs, and communicating with the AI.

*   **`server.js`**: The entry point. Connects to MongoDB, sets up middleware (CORS, JSON), and defines the main API routes.
*   **`routes/`**:
    *   `authRoutes.js`: Handles user registration and login web requests.
    *   `resumeRoutes.js`: Handles resume upload, analysis, and history retrieval requests.
*   **`controllers/`**:
    *   `authController.js`: Contains the logic for signing up and logging in users.
    *   `resumeController.js`: The "engine" that handles files, calls the AI, and saves results to the database.
*   **`utils/`**:
    *   `aiAnalyzer.js`: Sets up the connection to **Gemini AI** and sends the prompt for analysis.
    *   `resumeParser.js`: Uses `pdfjs-dist` to read the text content from a PDF file.
    *   `atsScore.js`: A helper script that compares keywords to calculate a match percentage.
*   **`models/`**:
    *   `User.js`: Defines the structure for user accounts in the database.
    *   `Resume.js`: Defines how the AI analysis reports are stored.

### 2. Frontend (The Face)
The user interface where people interact with the app.

*   **`src/main.jsx`**: Starts the React application.
*   **`src/App.jsx`**: Defines the main routes (Home, Login, Your Resumes, etc.).
*   **`src/Components/`**:
    *   `Home/`: The landing page that explains the tool.
    *   `Login/ & Registered/`: The pages for user authentication.
    *   `YourResumes/`: The dashboard where users upload resumes and see their results.
    *   `Navbar/`: The navigation bar visible on all pages.

---

## 📦 Key Dependencies (Libraries)

### Backend Dependencies:
*   **`express`**: Fast web framework for Node.js.
*   **`mongoose`**: Simplifies working with MongoDB.
*   **`@google/generative-ai`**: The official library to talk to Google Gemini AI.
*   **`multer`**: Used to accept file uploads from the frontend.
*   **`pdfjs-dist`**: A powerful library used to extract text from PDF documents.
*   **`bcryptjs`**: Encrypts user passwords so they are stored safely in the database.
*   **`jsonwebtoken`**: Generates secure tokens for user sessions.

### Frontend Dependencies:
*   **`react-router-dom`**: Handles page navigation without refreshing the browser.
*   **`axios`**: Used to send requests from the frontend to the backend (e.g., uploading a file).

---

## 💡 How to Run the Project
1. **Backend**:
    - Go to `/Backend`, run `npm install`.
    - Create a `.env` file with `MONGO_URI` and `GEMINI_API_KEY`.
    - Run `npm run dev` or `node server.js`.
2. **Frontend**:
    - Go to `/Frontend`, run `npm install`.
    - Run `npm run dev` to start the interface.

---
**Happy Coding!** 🚀
