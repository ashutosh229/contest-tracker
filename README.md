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

| Method | Endpoint                       | Description                                         |
|--------|--------------------------------|-----------------------------------------------------|
| GET    | `/api/contest/get_all_contests`| Fetch upcoming and past (last 7 days) contests      |
| POST   | `/api/contest/:id/bookmark`    | Bookmarks the contests                              |
| GET    | `/api/contest/contest_solution`| Fetches the solutions of past contests from youtube |
| POST   | `/api/reminder/create`         | Creates the reminders                               |
| DELETE | `/api/reminder/:id`            | Deletes a reminder                                  |
| GET    | `/api/reminder/`               | Get all the reminders                               |
| POST   | `/api/reminder/send`           | Send the notifications for the contests             |

## 🤝 Contributing

We welcome contributions to improve this project! Follow these steps to contribute:

1. **Fork the Repository**  
   Click the `Fork` button on the top right of this repository to create a copy in your GitHub account.

2. **Clone the Repository**  
   Clone your forked repository to your local system:  
   ```sh
   git clone https://github.com/your-username/repository-name.git
   ```
   Replace your-username with your GitHub username and repository-name with the forked repository name.

3. **Create a New Branch**
```sh
git checkout -b feature-name
```
Replace feature-name with a meaningful name for your feature or fix.

4. **Make Your Changes**
Ensure your code follows best practices.
Test the changes before committing.

5. **Commit the changes**
```sh
git add .
git commit -m "Added feature: description of the feature"
```
6. **Push the changes to your fork**
```sh
git push origin feature-name
```
7. **Open a Pull Request**
Go to the original repository on GitHub.
Click on Pull Requests → New Pull Request.
Select your branch and submit the pull request with a meaningful description.

8. **Wait for Review**
Your PR will be reviewed by maintainers.
Make changes if requested and update the PR accordingly.

9. **Pull the merged code**
After the PR is merged, change the branch to the dev branch
Pull the recent changes from the original repository
Delete the feature branch 

10. **Repeat the process**
Repeat the steps again to make another PR

## Drive Link 
https://drive.google.com/drive/folders/18NHfZNZORQcMHRF3_eVJ-VbwiAF7l2dy?usp=drive_link









