# WebhookX Frontend

A modern webhook monitoring dashboard built with Next.js, Tailwind CSS, and TypeScript for managing webhooks, monitoring deliveries, tracking failures, and analyzing webhook performance in real-time.

---

## 🚀 Overview

WebhookX Frontend provides a clean and responsive dashboard for interacting with the WebhookX backend delivery engine.

Users can:

- Register and login securely
- Create and manage webhooks
- Monitor webhook delivery attempts
- View delivery logs and latency
- Track failed deliveries
- Retry dead-letter queue jobs
- View real-time analytics and metrics

This frontend communicates with the FastAPI backend using JWT authentication and REST APIs.

---

## 🔗 Links

### 🌐 Live Demo
https://webhookx-frontend-production.up.railway.app/

### 💻 Frontend Repository
https://github.com/code-udit/webhookx-frontend.git

### ⚙️ Backend Repository
https://github.com/code-udit/webhookx-backend.git

---

## 🛠 Tech Stack

- Next.js 15
- TypeScript
- Tailwind CSS
- Axios
- React Hooks
- JWT Authentication
- Responsive UI

---

## 📁 Project Structure

```bash
webhookx-frontend/
│
├── app/
│   ├── dashboard/
│   ├── login/
│   ├── register/
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── dashboard/
│   ├── deliveries/
│   ├── dlq/
│   └── webhooks/
│
├── services/
│   ├── api.ts
│   ├── auth.ts
│   └── webhook.ts
│
├── store/
├── utils/
├── public/
├── styles/
└── middleware.ts
````

---

## ✨ Features

### 🔐 Authentication

* User Registration
* User Login
* JWT Token Storage
* Protected Routes
* Session Persistence

### 🔗 Webhook Management

* Create Webhooks
* Delete Webhooks
* List Registered Webhooks
* Generate Secret Keys

### 📊 Dashboard Analytics

* Total Deliveries
* Failed Deliveries
* Pending Deliveries
* Average Latency
* Success Rate

### 📜 Delivery Logs

* Attempt History
* Status Tracking
* Response Codes
* Response Body Logs
* Delivery Latency

### ☠️ Dead Letter Queue (DLQ)

* View Failed Deliveries
* Manual Retry Support
* Retry Status Updates

### 🎨 UI Features

* Responsive Dashboard
* Loading States
* Toast Notifications
* Clean Modern Design
* Mobile Friendly Interface

---

## ⚙️ Environment Variables

Create a `.env.local` file in the root directory.

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

## 📦 Installation

### 1. Clone Repository

```bash
git clone https://github.com/yourusername/webhookx-frontend.git
cd webhookx-frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Development Server

```bash
npm run dev
```

Application runs on:

```bash
http://localhost:3000
```

---

## 🔌 Backend Connection

Make sure the backend server is running before starting the frontend.

Backend API:

```bash
http://localhost:8000
```

---

## 📸 Dashboard Modules

### Dashboard Overview

Displays:

* Total Delivered
* Failed Deliveries
* Pending Jobs
* Success Metrics

### Webhook Management

Users can:

* Add webhook URLs
* Select event types
* Delete webhooks

### Delivery Monitoring

Tracks:

* Delivery attempts
* HTTP response codes
* Delivery latency
* Retry status

### DLQ Management

Allows users to:

* View permanently failed jobs
* Retry failed deliveries manually

---

## 🔐 Authentication Flow

1. User logs in
2. Backend returns JWT token
3. Token stored in local storage
4. Protected routes validated
5. Axios attaches token automatically

---

## 📈 Future Improvements

* Real-time WebSocket updates
* Advanced filtering
* Search and pagination
* Multi-user teams
* Dark mode support
* Charts and analytics




