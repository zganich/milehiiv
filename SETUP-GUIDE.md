# MileHiiv Setup Guide

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm 8+
- Supabase account (free)
- Git

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Supabase Database

#### Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Note your project URL and anon key

#### Run Database Schema
1. Go to your Supabase dashboard
2. Navigate to SQL Editor
3. Copy and paste the contents of `src/lib/database.sql`
4. Run the SQL script to create all tables and policies

### 3. Configure Environment Variables

Create `.env.local` file:
```bash
cp .env.local.example .env.local
```

Update `.env.local` with your actual values:
```env
# Database Configuration (Supabase)
DATABASE_URL=postgresql://postgres:[YOUR_PASSWORD]@db.[YOUR_PROJECT].supabase.co:5432/postgres

# Authentication
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d

# File Upload
MAX_FILE_SIZE=10485760

# App URLs
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://[YOUR_PROJECT].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key-here

# Development Environment
NODE_ENV=development
```

### 4. Start Development Server
```bash
npm run dev
```

### 5. Test the Application
- **Frontend**: http://localhost:3000
- **API**: http://localhost:3000/api
- **Test Script**: `node test-api.js`

## 🔧 Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### API Testing
```bash
# Test all API endpoints
node test-api.js

# Test specific endpoint
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Password123","name":"Test User"}'
```

## 📊 Database Schema

The application uses the following tables:

### Users
- `id` (UUID, Primary Key)
- `email` (VARCHAR, Unique)
- `name` (VARCHAR)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### Trips
- `id` (UUID, Primary Key)
- `user_id` (UUID, Foreign Key)
- `date` (DATE)
- `start_mileage` (INTEGER)
- `end_mileage` (INTEGER)
- `business` (BOOLEAN)
- `location` (VARCHAR, Optional)
- `notes` (TEXT, Optional)

### Gaps
- `id` (UUID, Primary Key)
- `user_id` (UUID, Foreign Key)
- `date` (DATE)
- `expected_miles` (INTEGER)
- `actual_miles` (INTEGER)
- `resolved` (BOOLEAN)

### Uploads
- `id` (UUID, Primary Key)
- `user_id` (UUID, Foreign Key)
- `filename` (VARCHAR)
- `file_size` (INTEGER)
- `processed_at` (TIMESTAMP)
- `status` (VARCHAR)
- `trips_extracted` (INTEGER)

## 🔐 Security Features

- **Row Level Security (RLS)** enabled on all tables
- **JWT Authentication** with configurable expiration
- **Password Hashing** using bcrypt with 12 rounds
- **Input Validation** on all endpoints
- **SQL Injection Protection** through parameterized queries

## 🚀 Deployment

### Deploy to Vercel

1. **Connect to Vercel**
   ```bash
   npm i -g vercel
   vercel login
   vercel
   ```

2. **Set Environment Variables** in Vercel dashboard:
   - `DATABASE_URL` - Your Supabase connection string
   - `JWT_SECRET` - Your JWT secret key
   - `JWT_EXPIRES_IN` - Token expiration (default: 7d)
   - `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anon key

3. **Deploy**
   ```bash
   vercel --prod
   ```

## 🧪 Testing

### API Endpoints Test
```bash
# Run comprehensive API tests
node test-api.js
```

### Manual Testing
1. Register a new user
2. Login with credentials
3. Create a trip
4. Upload a PDF
5. Check gap detection
6. View summary

## 📝 Troubleshooting

### Common Issues

#### 1. "supabaseUrl is required" Error
- Ensure `NEXT_PUBLIC_SUPABASE_URL` is set in `.env.local`
- Restart the development server after changing environment variables

#### 2. Database Connection Issues
- Verify your Supabase credentials
- Check that the database schema has been created
- Ensure RLS policies are properly configured

#### 3. API Endpoints Returning HTML
- Check that all dependencies are installed: `npm install`
- Restart the development server
- Verify environment variables are loaded

#### 4. PDF Processing Fails
- Ensure `pdf-parse` dependency is installed
- Check file size limits (default: 10MB)
- Verify file is a valid PDF

### Debug Mode
```bash
# Enable debug logging
DEBUG=* npm run dev
```

## 📚 Documentation

- **API Documentation**: `API-DOCUMENTATION.md`
- **Design System**: `DESIGN-SYSTEM.md`
- **UX Flow**: `UX-FLOW-ANALYSIS.md`
- **Developer Handoff**: `DEVELOPER-HANDOFF.md`

## 🎯 Next Steps

After setup:
1. **Test all API endpoints** with the test script
2. **Configure Supabase** with your actual credentials
3. **Test PDF upload** functionality
4. **Verify gap detection** algorithm
5. **Deploy to production** when ready

The application is now ready for development and testing! 🚀
