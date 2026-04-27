# 🧠 VitaTrack

**Precision wellness tracking for your longevity**

VitaTrack is a fullstack web application that enables users to track weight, monitor progress, and achieve health goals through a clean, data-driven interface.

---

## 🚀 Features

* 🔐 User authentication (JWT-based login & registration)
* ⚖️ Daily weight tracking
* 📊 Dashboard with analytics (weekly & monthly trends)
* 🎯 Goal setting & progress tracking
* 📝 Notes for each entry
* 📈 Visual charts using Recharts
* 🔄 Instant UI updates after actions

---

## 🛠️ Tech Stack

### Frontend

* React (Vite)
* TypeScript
* TailwindCSS
* React Router
* Recharts

### Backend

* Node.js
* Express
* MongoDB (Mongoose)
* JWT Authentication
* bcryptjs

---

## 📁 Project Structure

```txt
VitaTrack/
├── public/
│   └── Pictures/
│
└── src/
   ├── backend/
   │   ├── controllers/
   │   ├── middleware/
   │   ├── models/
   │   ├── routes/
   │   ├── services/
   │   └── server.cjs
   │
   └── frontend/
       ├── Components/
       └── pages/
          ├── authPage/
          ├── dashboard/
          └── Tracking/
              └── Components/
```

---

## ⚙️ Setup & Installation

### 1. Clone the project

```bash
git clone <your-repo-url>
cd fullstack-seminarie-solo
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env` file

Create a `.env` file in the root:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

### 4. Start the app

```bash
npm run dev
```

This runs both:

* Backend → http://localhost:5000
* Frontend → http://localhost:5173

---

## 🔐 Authentication

* JWT tokens stored in `localStorage`
* Protected backend routes using middleware

---

## 📊 API Endpoints

### Auth

* `POST /api/auth/register`
* `POST /api/auth/login`

### Weights

* `POST /api/weights`
* `GET /api/weights/dashboard`
* `PATCH /api/weights/:id`
* `DELETE /api/weights/:id`

### Goals

* `POST /api/goals`
* `GET /api/goals`
* `GET /api/goals/active`
* `PATCH /api/goals/:id`
* `DELETE /api/goals/:id`

### Dashboard

* `GET /api/dashboard`

---

## 📌 Notes

* Weight must be between **30–300 kg**
* Only one active goal per user
* Dashboard data is calculated dynamically

---

## 🧪 Scripts

```bash
npm run dev        # Run frontend + backend
npm run backend    # Backend only
npm run frontend   # Frontend only
```

---

## 🔮 Future Improvements

* Route protection on frontend
* Better loading states
* Mobile responsiveness
* Advanced analytics

---

## 👤 Author

**Rasmus Rolin** — VitaTrack
