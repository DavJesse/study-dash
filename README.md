# StudyDash – Zone01 Profile Dashboard

[![StudyDash](https://github.com/DavJesse/DavJesse/blob/main/studydash.gif)](https://study-dash-z01-demo.vercel.app/)  

A modern, React-based dashboard for **Zone01 students** to visualize their learning progress using the platform's GraphQL API.  
Built as a learning exercise in **GraphQL querying**, **JWT authentication**, and **SVG-based data visualization**.

![React](https://img.shields.io/badge/React-18-blue?logo=react)
![GraphQL](https://img.shields.io/badge/GraphQL-API-purple?logo=graphql)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-teal?logo=tailwindcss)
![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel)

---

## 📌 Key Features

### 🔐 Authentication
- Login with **username:password** or **email:password**
- Secure **JWT-based authentication** (token stored in `localStorage`)
- Logout functionality

### 📊 Dashboard
- Displays personal stats:
  - User profile info
  - Total XP earned
  - Pass/Fail ratio
- All data is **fetched live** from Zone01’s GraphQL API

### 📈 Visualizations
- **XP Progress Over Time** (interactive SVG line graph)
- **Pass vs. Fail Ratio** (SVG-based 3D pie chart)
- Responsive UI with Tailwind CSS

### 📂 Data Sources
- `user` – Basic profile data
- `transaction` – XP & audit logs
- `progress` / `result` – Grades & progress tracking
- `object` – Project metadata

---

## 🚀 Live Demo
🔗 [View StudyDash on Vercel](https://study-dash-z01-demo.vercel.app/)

**Demo credentials:**
```
username: demo
password: demo
```

---

## 🛠️ Tech Stack
- **Frontend:** React (Vite), Tailwind CSS
- **Data:** GraphQL API
- **Auth:** JWT + Basic Auth
- **Deployment:** Vercel

---

## 📥 Installation & Setup

### Prerequisites
- Node.js **v18+**
- npm or yarn

### Steps
```bash
# Clone the repo
git clone https://github.com/DavJesse/study-dash
cd study-dash

# Install dependencies
npm install

# Start dev server
npm run dev
```
App will run at:
http://localhost:5173

## 🔧 Building for Production
```bash
npm run build  # or yarn build
```
Then deploy using Vercel or your preferred hosting.

## 🔑 Authentication Details
- Credentials sent via Basic Auth to:
  ```bash
  https://learn.zone01kisumu.ke/api/auth/signin
  ```
- On success, JWT is stored locally and used as a Bearer token in GraphQL queries.

## 🧩 Example GraphQL Queries
```graphql
# Get user ID and login
{
  user {
    id
    login
  }
}

# Get XP transactions
{
  transaction(where: {type: {_eq: "xp"}}, order_by: {createdAt: asc}) {
    amount
    createdAt
    object { name type }
  }
}

# Get pass/fail results
{
  result {
    grade
    createdAt
    user { id login }
  }
}
```

## 🎯 Customization
- Add new stats by editing the React components & GraphQL queries
- Tailwind CSS for easy UI tweaks
- Modular structure for adding more visualizations

## 📜 License
This project is for educational purposes only and is not affiliated with Zone01.
Use responsibly — do not share your personal credentials.
