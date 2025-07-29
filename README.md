# Vending Machine Application

A full-stack vending machine application built with Node.js, React, and PostgreSQL.

## Features

- Product management for sellers
- Purchase functionality for buyers
- Balance management
- Real-time inventory updates

## Tech Stack

- **Frontend**: React + Vite + TypeScript
- **Backend**: Node.js + Express + TypeScript
- **Database**: PostgreSQL
- **Containerization**: Docker

## Getting Started

### Prerequisites

- Docker Desktop
- Docker Compose
- Node.js (for local development)

### Running with Docker

1. Clone the repository:
```bash
git clone https://github.com/yourusername/vendo-machine.git
cd vendo-machine
```

2. Start the application:
```bash
docker-compose up --build
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5500
- PostgreSQL: localhost:5432

### Environment Variables

Backend:
```env
PORT=5500
DB_HOST=localhost
DB_PORT=5432
DB_USER=admin
DB_PASSWORD=admin
DB_TABLE_NAME=vendo-machine-db
```

## API Endpoints

- `GET /api/getInventory` - List all Chocolates
- `GET /api/user-balance` - Get user balance
- `PATCH /api/restockChocolate` - Update Inventory
- `PATCH /api/buyChocolate` - Update Inventory and Deduct Balance
- `PATCH /api/user-balance` - Add balance to User

## Development

1. Install dependencies:
```bash
cd frontend && npm install
cd ../backend && npm install
```
2. create .env file backend folder

3. Run development servers:
```bash
# Frontend
cd frontend && npm run dev

# Backend
cd backend && npm run start
```