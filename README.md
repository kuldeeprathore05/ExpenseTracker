# Expense Tracker App

A full-stack **Expense Tracker** application built with **React**, **Node.js**, and **Express**, allowing users to securely manage income and expenses, categorize transactions, and visualize financial data using interactive charts.

---

## Test Credentials
- Email = test@gmail.com
- Password = 123123
 
---

## Features

- 🔐 **Authentication System** : User registration and login using JWT tokens.

- 💸 **Add / Edit / Delete Transactions** : Manage income and expenses with category, amount, date, and description.

- 📊 **Interactive Dashboard** : Displays total income, total expenses, and balance summary.

- 📈 **Charts & Stats** : Visual representation of spending and earnings over time.

- 📅 **Date-based Filtering** : View and filter transactions by specific category.

- 🧾 **Responsive UI** : Built with TailwindCSS for a clean and responsive design.

- ⚡ **Real-time Updates** : Automatically refresh stats and charts after transactions.

---

## 🧩 Tech Stack

### **Frontend**
- React.js (Vite)
- TailwindCSS
- React Hot Toast (for notifications)
- SweetAlert2 (for confirmations)
- Recharts (for data visualization)

### **Backend**
- Node.js + Express.js
- MongoDB + Mongoose
- JWT for authentication
- bcrypt.js for password hashing
- CORS and dotenv configuration

---

## 🌐 API Endpoints

### **Auth Routes**
| Method | Endpoint              | Description             |
|:-------|:----------------------|:------------------------|
| **POST** | `/api/auth/signup`   | Register a new user     |
| **POST** | `/api/auth/signin`   | Login user and get token |

### **Transaction Routes**
| Method | Endpoint                    | Description           |
|:-------|:-----------------------------|:----------------------|
| **GET** | `/api/transaction`          | Get all transactions  |
| **POST** | `/api/transaction`         | Add a new transaction |
| **PUT** | `/api/transaction/:id`      | Edit a transaction    |
| **DELETE** | `/api/transaction/:id`   | Delete a transaction  |

---

## ⚙️ Setup Instructions

Follow these steps to run the Expense Tracker locally.


### 1️⃣ Clone the Repository

```bash
git clone https://github.com/<your-username>/expense-tracker.git
cd expense-tracker
```
### Backend setup

```bash
cd backend
npm install
npm run dev
```
.env in /backend
- PORT=8000
- MONGO_URI=your_mongodb_connection_string
- JWT_SECRET=your_secret_key

The backend will start on http://localhost:8000

### Frontend setup
```bash
cd ../frontend
npm install
npm run dev
```

The frontend will start on http://localhost:5173

---
