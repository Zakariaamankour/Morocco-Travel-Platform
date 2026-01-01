# Morocco Travel Platform - Backend API

Express.js backend with MySQL database for the Morocco Travel Platform.

## Features

- **Destinations Management**: CRUD operations for Morocco destinations
- **Places Management**: Hotels, restaurants, activities, attractions, shopping
- **Community Submissions**: User-submitted places with approval workflow
- **AI Trip Planner**: Generate personalized itineraries
- **Admin Authentication**: JWT-based auth for admin users
- **Nearby Places**: Distance-based recommendations using Haversine formula

## Prerequisites

- Node.js 18+ 
- MySQL 8.0+
- npm or yarn

## Installation

1. **Install dependencies:**
   ```bash
   cd backend
   npm install
   ```

2. **Configure environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your database credentials:
   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=morocco_travel
   JWT_SECRET=your_secret_key
   PORT=5000
   ```

3. **Setup database:**
   ```bash
   # Login to MySQL
   mysql -u root -p
   
   # Run schema
   source database/schema.sql
   
   # Run seed data
   source database/seed.sql
   ```

4. **Start the server:**
   ```bash
   # Development mode with auto-reload
   npm run dev
   
   # Production mode
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/register` - Register admin (admin only)
- `GET /api/auth/me` - Get current user

### Destinations
- `GET /api/destinations` - Get all destinations
- `GET /api/destinations/:slug` - Get destination by slug
- `POST /api/destinations` - Create destination (admin)
- `PUT /api/destinations/:id` - Update destination (admin)
- `DELETE /api/destinations/:id` - Delete destination (admin)

### Places
- `GET /api/places` - Get all places (supports filters)
- `GET /api/places/:id` - Get place by ID
- `GET /api/places/:id/nearby` - Get nearby places
- `POST /api/places` - Create place (admin)
- `PUT /api/places/:id` - Update place (admin)
- `DELETE /api/places/:id` - Delete place (admin)

### Community Submissions
- `POST /api/submissions` - Submit a place (public)
- `GET /api/submissions` - Get all submissions (admin)
- `GET /api/submissions/stats` - Get statistics (admin)
- `GET /api/submissions/:id` - Get submission by ID (admin)
- `PATCH /api/submissions/:id/status` - Update status (admin)
- `DELETE /api/submissions/:id` - Delete submission (admin)

### Trip Plans
- `POST /api/trip-plans/generate` - Generate trip plan
- `GET /api/trip-plans/:id` - Get trip plan by ID

## Database Schema

### Tables
- `destinations` - Morocco destinations
- `places` - Hotels, restaurants, activities
- `submissions` - User-submitted places
- `trip_plans` - Generated itineraries
- `admin_users` - Admin accounts
- `reviews` - Place reviews (optional)

## Authentication

The API uses JWT tokens for authentication. Include the token in requests:

```
Authorization: Bearer YOUR_TOKEN
```

## CORS Configuration

Update `CORS_ORIGIN` in `.env` to match your frontend URL.

## Production Deployment

1. Set `NODE_ENV=production`
2. Use a strong `JWT_SECRET`
3. Configure proper MySQL credentials
4. Use environment variables for sensitive data
5. Enable HTTPS
6. Set up proper logging and monitoring

## License

MIT
