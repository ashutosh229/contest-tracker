# 🏆 Contest Tracker

A powerful web application that helps competitive programmers track upcoming and past coding contests from multiple platforms. Users can filter contests, bookmark them, get reminders via email or SMS, and access solution links from YouTube.

---

## 📌 Overview

The **Contest Tracker** application fetches upcoming and past coding contests from **Codeforces, CodeChef, and LeetCode** and provides additional features like bookmarking, reminders, and solution tracking.

---

## 🚀 Features

- ✅ **Fetch upcoming contests** from **Codeforces, CodeChef, and LeetCode**.
- ✅ **Display contest details** including **date, time left, and platform**.
- ✅ **Show past contests** (from the last 1 week).
- ✅ **Filter contests** by platform i.e. either single or multiple platform (e.g., only Codeforces, or Codeforces + LeetCode).
- ✅ **Bookmark contests** to save them for later.
- ✅ **YouTube solutions integration**:
  - **Automatically fetch contest solutions** from YouTube.
- ✅ **Contest Reminders**:
  - Users can **sign up for email or SMS reminders**.
  - Choose when to get reminders (e.g., **1 hour or 30 minutes or any other custom time** before the contest).

---

## 📂 Tech Stack

- **Frontend**: React with TypeScript
- **Styling**: Tailwind CSS
- **UI Library**: Shadcn UI
- **Backend**: Node.js and Express.js
- **Database**: MongoDB
- **Notifications**: Nodemailer (Email) & Twilio (SMS)
- **YouTube API**: To fetch contest solution videos automatically

---

## ⚙️ Prerequisites

Before installing, ensure you have the following installed:

- [Node.js](https://nodejs.org/en/) (v16+ recommended)
- [Git](https://git-scm.com/) (to clone the repository)

---

## 🛠️ Installation

### 1️⃣ Clone the Repository

```sh
git clone https://github.com/your-username/contest-tracker.git
cd contest-tracker
```

### 2️⃣ Install Dependencies

```sh 
cd backend
npm install
cd .. 
cd frontend 
npm install 
cd .. 
```

### 3️⃣ Set Up Environment Variables

Create a .env file in the root of the backend folder and add:
```sh
PORT = 3000
MONGODB_URI = your-mongodb-connection-string (prefer to setup cloud cluster and not local)
YOUTUBE_API_KEY = youtube-api-key 
CODECHEF_PLAYLIST = "PLcXpkI9A-RZIZ6lsE0KCcLWeKNoG45fYr"
CODEFORCES_PLAYLIST = "PLcXpkI9A-RZLUfBSNp-YQBCOezZKbDSgB"
LEETCODE_PLAYLIST = "PLcXpkI9A-RZI6FhydNz3JBt_-p_i25Cbr"
SMTP_HOST = "smtp.gmail.com"
SMTP_PORT = "465"
EMAIL_USER = your-email-address
EMAIL_PASS = your-generated-password
TWILIO_SID = your-twilio-password
TWILIO_AUTH_TOKEN = your-twilio-auth-token
TWILIO_PHONE_NUMBER = your-twilio-auto-generated-phone-number
BACKEND_DOMAIN = "http://localhost:3000"
LEETCODE_API_USERNAME = leetcode-api-username
LEETCODE_API_KEY = leetcode-api-key
```

### 4️⃣ Start the Application
Frontend
```sh 
cd frontend 
npm run dev --debug 
```

Backend
```sh 
cd backend 
npm run dev --debug
```

## 🎯 Usage

### 📅 View Upcoming and Past Contests
- Navigate to the homepage to see **upcoming contests**.
- Switch to the **past contests** section to see contests from the last 7 days.

### 🔍 Filter Contests
- Select one or more platforms (**Codeforces, CodeChef, LeetCode**) to filter contests.

### ⭐ Bookmark Contests
- Click the **bookmark button** to save a contest.
- View your **bookmarked contests** via the **color of the bookmark icon**.

### 📺 View Contest Solutions
- **YouTube solutions** are automatically fetched from designated playlist 
- **Solutions of the past contest** will be available without manual input.

### ⏰ Set Up Contest Reminders
- Sign up for **email/SMS reminders** for upcoming contests.
- Choose when to receive the reminder (**1 hour or 30 minutes or any other custom time before the contest**).

## 📌 API Endpoints

| Method | Endpoint                       | Description                           |
|--------|--------------------------------|---------------------------------------|
| GET    | `/api/contest/get_all_contests`| Fetch upcoming contests               |
| POST   | `/api/contest/:id/bookmark`    | Fetch past contests (last 7 days)     |
| GET    | `/api/contest/contest_solution`| Bookmark a contest                    |
| POST   | `/api/reminder/create`         | Get all bookmarked contests           |
| DELETE | `/api/reminder/:id`            | Set up a contest reminder             |
| GET    | `/api/reminder/`               | Add a YouTube solution manually       |
| POST   | `/api/reminder/send`           | Get YouTube solutions for a contest   |




