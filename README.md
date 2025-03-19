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
- ✅ **Filter contests** by platform (e.g., only Codeforces, or Codeforces + LeetCode).
- ✅ **Bookmark contests** to save them for later.
- ✅ **YouTube solutions integration**:
  - Manually link solutions to past contests via a form.
  - (Bonus) **Automatically fetch contest solutions** from YouTube.
- ✅ **Contest Reminders**:
  - Users can **sign up for email or SMS reminders**.
  - Choose when to get reminders (e.g., **1 hour or 30 minutes** before the contest).

---

## 📂 Tech Stack

- **Frontend**: Next.js (React) with TypeScript & Tailwind CSS
- **Backend**: Node.js (Express.js) with Sequelize ORM
- **Database**: PostgreSQL
- **Notifications**: Nodemailer (Email) & Twilio (SMS)
- **YouTube API**: To fetch contest solution videos automatically

---

## ⚙️ Prerequisites

Before installing, ensure you have the following installed:

- [Node.js](https://nodejs.org/en/) (v16+ recommended)
- [PostgreSQL](https://www.postgresql.org/) (for database management)
- [Git](https://git-scm.com/) (to clone the repository)

---

## 🛠️ Installation

### 1️⃣ Clone the Repository

```sh
git clone https://github.com/your-username/contest-tracker.git
cd contest-tracker
