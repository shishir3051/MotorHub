# 🏍️ MotoCop - E-Commerce Motorcycle Dealership

MotoCop is a modern, high-performance, full-stack E-Commerce application for a premium motorcycle dealership. Built with the **MERN Stack** (MongoDB, Express, React, Node.js), it features an ultra-sleek UI with fluid animations, a complete shopping cart system, customer authentication, and a powerful Admin Dashboard for managing inventory and marketing.

## 🚀 Key Features
- **Storefront**: Browse premium motorcycles and gear (cruisers, sportbikes, adventure, naked, and accessories).
- **Authentication**: Secure JWT-based login for both regular Customers and System Administrators.
- **Admin Dashboard**: A secure portal to manage inventory (add/edit/delete motorcycles) and view Newsletter Subscribers.
- **Dynamic UI**: Stunning interface powered by Tailwind CSS and Framer Motion.
- **Newsletter System**: Lead-generation capture connected directly to the MongoDB backend.

## 🛠️ Technology Stack
- **Frontend**: React, Vite, Tailwind CSS, Framer Motion, Zustand (State Management)
- **Backend**: Node.js, Express.js, Mongoose
- **Database**: MongoDB
- **Deployment Ready**: Fully configured for Vercel Serverless deployment.

---

## 💻 Local Development Setup

To run this project locally, you will need to start both the backend server and the frontend client.

### 1. Backend Setup
1. Open a terminal and navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` directory and add your MongoDB connection string and JWT secret:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_super_secret_key
   ```
4. Start the backend development server:
   ```bash
   npm run dev
   ```

### 2. Frontend Setup
1. Open a *new* terminal and navigate to the `client` folder:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend development server:
   ```bash
   npm run dev
   ```
4. The frontend will automatically run on `http://localhost:3000` and communicate with your backend on `http://localhost:5000`.

---

## ☁️ Vercel Deployment

This repository is strictly configured to be deployed as **two separate projects** on Vercel.

1. **Deploy Backend**: Import this repo into Vercel, set the Root Directory to `backend`, add your environment variables (`MONGODB_URI`, `JWT_SECRET`), and click Deploy.
2. **Deploy Frontend**: Import this repo into Vercel *again* as a new project, set the Root Directory to `client`, add the `VITE_API_URL` environment variable pointing to your newly created backend URL (e.g., `https://motocop-api.vercel.app/api`), and click Deploy.
