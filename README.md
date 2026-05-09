# 🛒 Cloud E-Commerce Platform
### CSE 363 - Cloud Computing | Galala University

---

## 📋 Project Overview

A fully containerized e-commerce web application that demonstrates core cloud computing concepts including **virtualization**, **networking**, **storage**, **scalability**, and **monitoring**.

The application allows users to browse products, register, login, manage a shopping cart, and wishlist items — all served through a cloud-native architecture with load balancing and real-time monitoring.

---

## 👥 Group Members

- Youssef Husseiny
- Adham Mohamed
- Abdelrahman Gamal
---

## 🏗️ Architecture

```
Internet / Browser
        ↓
  Nginx (Load Balancer) — Port 80
   ↙         ↓         ↘
backend1   backend2   backend3
(Node.js)  (Node.js)  (Node.js)
   ↘         ↓         ↙
       PostgreSQL DB
       (Port 5433)

Frontend (React/Vite) — served via Nginx
cAdvisor (Monitoring) — Port 8080
```

### Services Summary

| Service | Image | Port | Role |
|---------|-------|------|------|
| `postgres` | postgres:16-alpine | 5433 | Database |
| `backend1` | custom Node.js | internal | API server instance 1 |
| `backend2` | custom Node.js | internal | API server instance 2 |
| `backend3` | custom Node.js | internal | API server instance 3 |
| `frontend` | custom Nginx+React | internal | Static frontend |
| `nginx` | nginx:alpine | **80** | Load balancer |
| `cadvisor` | gcr.io/cadvisor | **8080** | Monitoring dashboard |

---

## ✅ Requirements Coverage

### 1. Compute Layer — Docker Containers
All services run in **isolated Docker containers**, each with its own filesystem, process space, and network interface. We run **7 containers** managed together via Docker Compose.

**Why containers?** Containers provide lightweight isolation compared to VMs, faster startup, and are ideal for microservices architecture.

### 2. Network Virtualization — Docker Virtual Network
All services communicate over `cloud_computing_ecom_default`, a **virtual bridge network** created automatically by Docker Compose. Services reach each other using **service names as hostnames** (e.g., `DB_HOST: postgres`, `server backend1:8000`) — no hardcoded IPs.

### 3. Data Persistence — Docker Volume
PostgreSQL data is stored in a named Docker volume `pgdata` mapped to `/var/lib/postgresql/data`. Data **survives container restarts and rebuilds**.

```yaml
volumes:
  pgdata:
```

### 4. Resource Management — CPU & Memory Limits
All services have explicit resource boundaries configured:

| Service | CPU Limit | Memory Limit |
|---------|-----------|--------------|
| postgres | 1.0 core | 512 MB |
| backend1 | 0.5 core | 256 MB |
| backend2 | 0.5 core | 256 MB |
| backend3 | 0.5 core | 256 MB |
| frontend | 0.5 core | 128 MB |
| nginx | 0.3 core | 64 MB |

**Why this matters:** In a shared cloud environment, without limits a single container could consume all host resources, causing other services to crash or degrade — this is called the "noisy neighbor" problem.

### 5. Scalability — Load Balancing (Option A)
We run **3 backend replicas** behind an **Nginx load balancer** using the `least_conn` algorithm, which routes each new request to the backend with the fewest active connections.

```nginx
upstream backend_pool {
    least_conn;
    server backend1:8000;
    server backend2:8000;
    server backend3:8000;
}
```

Traffic is distributed across all 3 instances. If one backend is stopped, Nginx automatically routes traffic to the remaining two.

### 6. Cloud Deployment — Accessible Externally
The application runs on port 80 and is accessible from any machine on the same local network via the host machine's IP address.

---

## 🎁 Bonus Features

### Bonus 1: Monitoring Dashboard (cAdvisor)
A live **cAdvisor** container monitors all running containers in real-time, showing:
- CPU usage per container
- Memory consumption
- Network I/O
- Disk I/O

**Access:** `http://localhost:8080`

### Bonus 2: Kubernetes (minikube)
*(If implemented — add details here)*

---

## 🚀 How to Run

### Prerequisites
- Docker Desktop installed and running
- Git

### Steps

**1. Clone the repository:**
```bash
git clone https://github.com/AdhammElwakeel/cloud_computing_ecom.git
cd cloud_computing_ecom
```

**2. Start all services:**
```bash
docker compose up --build -d
```

**3. Verify all containers are running:**
```bash
docker compose ps
```

Expected output:
```
cloud_computing_ecom-postgres-1    Healthy
cloud_computing_ecom-backend1-1    Up
cloud_computing_ecom-backend2-1    Up
cloud_computing_ecom-backend3-1    Up
cloud_computing_ecom-frontend-1    Up
cloud_computing_ecom-nginx-1       Up   0.0.0.0:80->80/tcp
cloud_computing_ecom-cadvisor-1    Up   0.0.0.0:8080->8080/tcp
```

**4. Access the application:**
- 🌐 Main site: `http://localhost`
- 📊 Monitoring: `http://localhost:8080`

**5. Stop all services:**
```bash
docker compose down
```

---

## 🎬 Demo Guide

### Show all running services:
```bash
docker compose ps
```

### Demonstrate Load Balancing:
```bash
# Watch logs of all 3 backends simultaneously
docker compose logs -f backend1 backend2 backend3
```
Then open the browser and make requests — you'll see different backends handling them.

### Simulate backend failure (stop one replica):
```bash
docker compose stop backend1
# Site still works — backend2 and backend3 handle traffic
docker compose start backend1
# backend1 rejoins the pool
```

### Demonstrate Data Persistence:
```bash
# Stop everything
docker compose down

# Start again (data still there)
docker compose up -d
# Open http://localhost — all data preserved
```

### Demonstrate Network Communication:
```bash
# Enter nginx container and ping backend by hostname
docker exec -it cloud_computing_ecom-nginx-1 sh
ping backend1
ping backend2
ping postgres
```

### Demonstrate Resource Limits:
```bash
docker stats
```
Shows live CPU and memory usage with enforced limits per container.

---

## 📁 Project Structure

```
cloud_computing_ecom/
├── docker-compose.yml        ← Orchestrates all services
├── nginx.conf                ← Load balancer configuration
├── E-commerce-backend/
│   ├── Dockerfile
│   ├── package.json
│   └── src/                  ← Node.js API source
└── E-commerce-front/
    ├── Dockerfile
    ├── nginx.conf            ← Frontend static server config
    ├── package.json
    └── src/                  ← React/Vite frontend source
```

---

## 🔧 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React + Vite + TypeScript |
| Backend | Node.js + Express |
| Database | PostgreSQL 16 |
| Load Balancer | Nginx |
| Containerization | Docker + Docker Compose |
| Monitoring | cAdvisor |
| Orchestration | Kubernetes / minikube *(bonus)* |
