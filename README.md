# ✦ BeatTheBots (ATS Resume Analyzer)

BeatTheBots is a full-stack AI-powered application designed to help job seekers optimize their resumes for Applicant Tracking Systems (ATS). Upload a resume, receive a compatibility score against a job description, and get intelligent, actionable suggestions to make your resume stand out and *beat the bots*!

## 🚀 Features

- **Resume Parsing:** Upload your PDF resume to extract skills, experience, and content dynamically.
- **ATS Scoring:** Matches the resume content against a job description and gives a Compatibility Score out of 100.
- **AI-Powered Suggestions:** Uses Gemini AI to highlight missing skills, pinpoint extra skills, and offer reasoning behind formatting logic.
- **Actionable Bullet Improvements:** Provides intelligent rewrites of your bullet points to ensure they are impactful and ATS-friendly.
- **User Dashboard:** Secure login and registration system. Users can save and review the history of all their uploaded resumes and past AI analysis.
- **Ready for Deployment:** Code base is decoupled (Vite Frontend, Node API Backend), making it effortless to host on platforms like Vercel and Render.

## 🛠 Tech Stack

**Frontend:**
- React 19 / Vite
- React Router DOM
- CSS3 (Custom responsive styling, dynamic gradients, UI animations)

**Backend:**
- Node.js & Express.js
- MongoDB & Mongoose (Database & ODM)
- JSON Web Token (JWT) & bcrypt (Authentication)
- Google Gemini API (AI analysis)
- Multer (File Upload Parsing)

---

## 💻 Getting Started (Local Development)

### 1. Clone the Repository
```bash
git clone https://github.com/Boomi12/BeatTheBots.git
cd BeatTheBots
```

### 2. Backend Setup
```bash
cd Backend
npm install
```
Create a `.env` file inside the `/Backend` directory and add the following keys:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
GEMINI_API_KEY=your_google_gemini_key
```
Run the backend server:
```bash
npm start
```

### 3. Frontend Setup
Open a new terminal window:
```bash
cd Frontend
npm install
```
Build or start the frontend development server:
```bash
npm run dev
```

The application will be running locally at `http://localhost:5173`. 

---

## 🌍 Deployment

You can deploy the separated systems independently for free:
- **Frontend** should deploy seamlessly on **Vercel** (Set Root Directory to `Frontend`). Vercel requires environmental variable `VITE_API_URL` leading to your Render URL.
- **Backend API** runs smoothly on **Render** as a Web Service (Set Root Directory to `Backend`). Store your local `.env` data directly in Render's environment variables dashboard.

*Make sure not to upload your `.env` variables to GitHub!*

## 📝 License
This project is open-source. Created to empower jobseekers worldwide.

✨ Made with ❤️ ✨
