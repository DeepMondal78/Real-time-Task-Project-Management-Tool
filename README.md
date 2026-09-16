# Real-time-Task-Project-Management-Tool
# Real-time Task Manager (Microservices Architecture)

A robust, containerized Real-time Task Manager built using a microservices architecture with Node.js, Express, MongoDB, Socket.io, and Docker.

---

## 🚀 Architecture & Services

The application is split into three main microservices orchestrated via Docker Compose:

1. **API Gateway (`port 5000`)**: Acts as the single entry point, routing requests to the appropriate backend microservices using `http-proxy-middleware`.
2. **Auth Service (`port 5001`)**: Handles user authentication, registration, and JWT/bcrypt-based security.
3. **Task Service (`port 5002`)**: Manages tasks and establishes real-time bi-directional communication using **Socket.io**.

---

## 🛠️ Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** MongoDB, Mongoose
* **Real-time Communication:** Socket.io
* **Security & Auth:** JSON Web Tokens (JWT), Bcrypt.js
* **Containerization:** Docker & Docker Compose

---

## 📁 Project Structure

```text
realtime-task-manager/
├── api-gateway/
│   ├── src/
│   ├── Dockerfile
│   └── package.json
├── auth-service/
│   ├── src/
│   ├── Dockerfile
│   └── package.json
├── task-service/
│   ├── src/
│   ├── Dockerfile
│   └── package.json
└── docker-compose.yml
⚙️ Getting Started & Installation
Prerequisites
Make sure you have the following installed on your machine:

Docker & Docker Compose

Node.js (v18+ recommended)

Running with Docker Compose
Clone the repository:

Bash
git clone [https://github.com/YourUsername/realtime-task-manager.git](https://github.com/YourUsername/realtime-task-manager.git)
cd realtime-task-manager
Build and start all microservices using Docker:

Bash
docker compose up --build
The services will be up and running at:

API Gateway: http://localhost:5000

Auth Service: http://localhost:5001

Task Service: http://localhost:5002

🔌 API Endpoints (via Gateway)
Auth Routes: http://localhost:5000/api/auth/...

Task Routes: http://localhost:5000/api/tasks/...

📄 License
This project is open-source and available under the ISC License.
