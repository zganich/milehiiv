# MileHiiv API Documentation

## Overview

MileHiiv provides a comprehensive REST API for mileage tracking, gap detection, and trip management. All endpoints require JWT authentication unless otherwise specified.

## Base URL

- **Development**: `http://localhost:3000/api`
- **Production**: `https://milehiiv.com/api`

## Authentication

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## API Endpoints

### Authentication

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePassword123",
  "name": "John Doe"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "name": "John Doe",
      "created_at": "2024-01-01T00:00:00Z"
    },
    "token": "jwt-token"
  },
  "message": "User registered successfully"
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePassword123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "name": "John Doe",
      "created_at": "2024-01-01T00:00:00Z"
    },
    "token": "jwt-token"
  },
  "message": "Login successful"
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe",
    "created_at": "2024-01-01T00:00:00Z",
    "updated_at": "2024-01-01T00:00:00Z"
  }
}
```

#### Update User Profile
```http
PUT /api/auth/me
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "John Smith",
  "email": "johnsmith@example.com"
}
```

### Trip Management

#### Get Trips
```http
GET /api/mileage/trips?page=1&limit=50&business=true&start_date=2024-01-01&end_date=2024-12-31
Authorization: Bearer <token>
```

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 50)
- `business` (optional): Filter by business trips (true/false)
- `start_date` (optional): Filter trips from this date
- `end_date` (optional): Filter trips to this date

**Response:**
```json
{
  "success": true,
  "data": {
    "trips": [
      {
        "id": "uuid",
        "user_id": "uuid",
        "date": "2024-01-01",
        "start_mileage": 1000,
        "end_mileage": 1050,
        "business": true,
        "location": "Office to Client",
        "notes": "Client meeting",
        "created_at": "2024-01-01T00:00:00Z",
        "updated_at": "2024-01-01T00:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 50,
      "total": 1
    }
  }
}
```

#### Create Trip
```http
POST /api/mileage/trips
Authorization: Bearer <token>
Content-Type: application/json

{
  "date": "2024-01-01",
  "start_mileage": 1000,
  "end_mileage": 1050,
  "business": true,
  "location": "Office to Client",
  "notes": "Client meeting"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "user_id": "uuid",
    "date": "2024-01-01",
    "start_mileage": 1000,
    "end_mileage": 1050,
    "business": true,
    "location": "Office to Client",
    "notes": "Client meeting",
    "created_at": "2024-01-01T00:00:00Z",
    "updated_at": "2024-01-01T00:00:00Z"
  },
  "message": "Trip created successfully"
}
```

#### Get Trip by ID
```http
GET /api/mileage/trips/{id}
Authorization: Bearer <token>
```

#### Update Trip
```http
PUT /api/mileage/trips/{id}
Authorization: Bearer <token>
Content-Type: application/json

{
  "date": "2024-01-01",
  "start_mileage": 1000,
  "end_mileage": 1050,
  "business": true,
  "location": "Updated location",
  "notes": "Updated notes"
}
```

#### Delete Trip
```http
DELETE /api/mileage/trips/{id}
Authorization: Bearer <token>
```

### Gap Detection

#### Get Gaps
```http
GET /api/mileage/gaps?resolved=false&start_date=2024-01-01&end_date=2024-12-31
Authorization: Bearer <token>
```

**Query Parameters:**
- `resolved` (optional): Filter by resolved status (true/false)
- `start_date` (optional): Filter gaps from this date
- `end_date` (optional): Filter gaps to this date

**Response:**
```json
{
  "success": true,
  "data": {
    "gaps": [
      {
        "id": "uuid",
        "user_id": "uuid",
        "date": "2024-01-02",
        "expected_miles": 25,
        "actual_miles": 0,
        "resolved": false,
        "created_at": "2024-01-01T00:00:00Z",
        "updated_at": "2024-01-01T00:00:00Z"
      }
    ]
  }
}
```

#### Detect Gaps
```http
POST /api/mileage/gaps
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "gaps_detected": 3,
    "gaps": [
      {
        "user_id": "uuid",
        "date": "2024-01-02",
        "expected_miles": 25,
        "actual_miles": 0,
        "resolved": false
      }
    ]
  },
  "message": "Gap detection completed"
}
```

#### Resolve Gap
```http
PUT /api/mileage/gaps/{id}/resolve
Authorization: Bearer <token>
Content-Type: application/json

{
  "actual_miles": 25,
  "notes": "Added missing trip"
}
```

### File Upload

#### Upload PDF
```http
POST /api/upload/pdf
Authorization: Bearer <token>
Content-Type: multipart/form-data

file: <PDF file>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "upload_id": "uuid",
    "filename": "mileage_report.pdf",
    "file_size": 1024000,
    "trips_extracted": 5,
    "trips": [
      {
        "date": "2024-01-01",
        "start_mileage": 1000,
        "end_mileage": 1050,
        "business": true,
        "location": "Extracted from PDF",
        "notes": "Auto-extracted from PDF upload"
      }
    ],
    "status": "completed"
  },
  "message": "PDF processed successfully"
}
```

### Summary

#### Get Mileage Summary
```http
GET /api/mileage/summary?start_date=2024-01-01&end_date=2024-12-31
Authorization: Bearer <token>
```

**Query Parameters:**
- `start_date` (optional): Summary from this date
- `end_date` (optional): Summary to this date

**Response:**
```json
{
  "success": true,
  "data": {
    "summary": {
      "total_miles": 5000,
      "business_miles": 4500,
      "personal_miles": 500,
      "total_trips": 50,
      "business_trips": 45,
      "personal_trips": 5,
      "avg_business_miles": 100,
      "avg_personal_miles": 100,
      "first_trip_date": "2024-01-01",
      "last_trip_date": "2024-12-31"
    },
    "gaps": {
      "unresolved_count": 3,
      "gaps": [
        {
          "id": "uuid",
          "date": "2024-01-02",
          "expected_miles": 25,
          "actual_miles": 0,
          "resolved": false
        }
      ]
    }
  }
}
```

## Error Responses

All error responses follow this format:

```json
{
  "success": false,
  "error": "Error message",
  "data": {
    "errors": {
      "field": ["Error message"]
    }
  }
}
```

### Common HTTP Status Codes

- `200` - Success
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `409` - Conflict (e.g., email already exists)
- `422` - Validation Error
- `500` - Internal Server Error

## Rate Limiting

- **Authentication endpoints**: 5 requests per minute
- **Trip management**: 100 requests per minute
- **File upload**: 10 requests per minute
- **Gap detection**: 5 requests per minute

## File Upload Limits

- **Maximum file size**: 10MB
- **Allowed formats**: PDF only
- **Processing timeout**: 30 seconds

## Security

- All passwords are hashed using bcrypt with 12 rounds
- JWT tokens expire after 7 days by default
- All endpoints use HTTPS in production
- Row Level Security (RLS) enabled on all database tables
- Input validation on all endpoints
- SQL injection protection through parameterized queries

## Development

### Environment Variables

```env
# Database
DATABASE_URL=postgresql://postgres:[password]@db.[project].supabase.co:5432/postgres

# Authentication
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d

# File Upload
MAX_FILE_SIZE=10485760

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://[project].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### Testing

Use the provided Postman collection or test with curl:

```bash
# Register user
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Password123","name":"Test User"}'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Password123"}'

# Get trips (replace TOKEN with actual JWT)
curl -X GET http://localhost:3000/api/mileage/trips \
  -H "Authorization: Bearer TOKEN"
```
