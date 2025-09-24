# 🗄️ Supabase Setup Guide for MileHiiv

## 📋 Overview

This guide will walk you through setting up Supabase for MileHiiv, including database creation, schema setup, and configuration.

## 🚀 Step 1: Create Supabase Project

### **1.1 Sign Up/Login to Supabase**
1. Go to [https://supabase.com](https://supabase.com)
2. Click "Start your project" or "Sign In"
3. Create a new account or login with existing credentials

### **1.2 Create New Project**
1. Click "New Project" in your dashboard
2. **Organization**: Choose your organization (or create one)
3. **Project Name**: `milehiiv` (or your preferred name)
4. **Database Password**: Create a strong password (save this!)
5. **Region**: Choose closest to your users (e.g., US East for US users)
6. Click "Create new project"

### **1.3 Wait for Setup**
- Project creation takes 2-3 minutes
- You'll see a loading screen with progress
- Don't close the browser tab during setup

## 🗃️ Step 2: Database Schema Setup

### **2.1 Access SQL Editor**
1. Once project is ready, click "SQL Editor" in the left sidebar
2. Click "New Query" to create a new SQL script

### **2.2 Run Database Schema**
1. Copy the entire contents of `src/lib/database.sql` from your MileHiiv project
2. Paste it into the SQL Editor
3. Click "Run" to execute the schema

**The schema will create:**
- ✅ `users` table with authentication fields
- ✅ `trips` table for mileage tracking
- ✅ `gaps` table for missing mileage detection
- ✅ `uploads` table for PDF processing tracking
- ✅ Row Level Security (RLS) policies
- ✅ Performance indexes
- ✅ Audit triggers

### **2.3 Verify Schema Creation**
1. Go to "Table Editor" in the left sidebar
2. You should see 4 tables: `users`, `trips`, `gaps`, `uploads`
3. Click on each table to verify columns are created correctly

## 🔑 Step 3: Get API Credentials

### **3.1 Get Project URL and Keys**
1. Go to "Settings" → "API" in the left sidebar
2. Copy the following values:
   - **Project URL** (looks like: `https://your-project.supabase.co`)
   - **anon/public key** (starts with `eyJ...`)
   - **service_role key** (starts with `eyJ...`) - Keep this secret!

### **3.2 Get Database Connection String**
1. Go to "Settings" → "Database"
2. Scroll down to "Connection string"
3. Copy the "URI" connection string
4. Replace `[YOUR-PASSWORD]` with your database password

## ⚙️ Step 4: Configure Environment Variables

### **4.1 Create Environment File**
```bash
# In your MileHiiv project directory
cp env.template.local .env.local
```

### **4.2 Update .env.local with Supabase Credentials**
```bash
# Database Configuration (Supabase)
DATABASE_URL=postgresql://postgres:YOUR_DB_PASSWORD@db.YOUR_PROJECT.supabase.co:5432/postgres

# Authentication
JWT_SECRET=milehiiv-super-secret-jwt-key-change-this-in-production-2025
JWT_EXPIRES_IN=7d

# File Upload
MAX_FILE_SIZE=10485760

# App URLs
NEXT_PUBLIC_APP_URL=http://localhost:3001
NEXT_PUBLIC_API_URL=http://localhost:3001

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key-here
```

**Replace these values:**
- `YOUR_DB_PASSWORD` - Your Supabase database password
- `YOUR_PROJECT` - Your Supabase project ID
- `your-supabase-anon-key-here` - Your Supabase anon key

## 🧪 Step 5: Test Database Connection

### **5.1 Restart Development Server**
```bash
# Stop the current server (Ctrl+C)
# Then restart
npm run dev
```

### **5.2 Test API Endpoints**
```bash
# Test registration endpoint
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test123!",
    "name": "Test User"
  }'

# Expected response: {"success": true, "data": {...}, "message": "User registered successfully"}
```

### **5.3 Test Login Endpoint**
```bash
# Test login endpoint
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test123!"
  }'

# Expected response: {"success": true, "data": {"user": {...}, "token": "..."}}
```

## 🔒 Step 6: Security Configuration

### **6.1 Enable Row Level Security**
The schema already includes RLS policies, but verify they're active:
1. Go to "Authentication" → "Policies" in Supabase
2. Verify policies exist for all tables
3. Policies ensure users can only access their own data

### **6.2 Configure CORS (if needed)**
1. Go to "Settings" → "API"
2. Add your domain to "Additional URLs" if deploying
3. For development, `http://localhost:3001` should work by default

## 📊 Step 7: Test Full Application Flow

### **7.1 Test User Registration**
1. Go to http://localhost:3001/register
2. Create a test account
3. Verify user appears in Supabase "Table Editor" → "users"

### **7.2 Test PDF Upload**
1. Go to http://localhost:3001/upload
2. Upload a sample PDF (any PDF will work for testing)
3. Verify upload appears in "uploads" table
4. Check if trips are created in "trips" table

### **7.3 Test Dashboard**
1. Go to http://localhost:3001/dashboard
2. Verify trips are displayed
3. Test gap detection functionality

## 🚨 Troubleshooting

### **Common Issues:**

#### **Database Connection Error**
```
Error: connect ECONNREFUSED
```
**Solution**: Check DATABASE_URL format and password

#### **Authentication Error**
```
Error: Invalid JWT secret
```
**Solution**: Ensure JWT_SECRET is set in .env.local

#### **RLS Policy Error**
```
Error: new row violates row-level security policy
```
**Solution**: Verify RLS policies are correctly applied

#### **CORS Error**
```
Error: Access to fetch at '...' from origin '...' has been blocked by CORS policy
```
**Solution**: Add your domain to Supabase CORS settings

### **Debug Steps:**
1. Check Supabase logs in "Logs" → "Database"
2. Verify environment variables are loaded
3. Test API endpoints individually
4. Check browser console for errors

## 🎯 Production Deployment

### **For Vercel Deployment:**
1. Set environment variables in Vercel dashboard
2. Use production DATABASE_URL
3. Set strong JWT_SECRET
4. Configure CORS for your domain

### **Environment Variables for Production:**
```
DATABASE_URL=postgresql://postgres:PASSWORD@db.PROJECT.supabase.co:5432/postgres
JWT_SECRET=your-super-secure-jwt-secret-for-production
NEXT_PUBLIC_SUPABASE_URL=https://PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## ✅ Verification Checklist

- [ ] Supabase project created
- [ ] Database schema executed successfully
- [ ] Environment variables configured
- [ ] API endpoints responding correctly
- [ ] User registration working
- [ ] PDF upload processing
- [ ] Dashboard displaying data
- [ ] RLS policies protecting data

## 🎉 You're Ready!

Once all steps are completed, MileHiiv will be fully functional with:
- ✅ Secure user authentication
- ✅ PDF processing and mileage extraction
- ✅ Trip management and tracking
- ✅ Gap detection algorithms
- ✅ Real-time dashboard updates

**Your MileHiiv application is now ready for production use!**

---

**Need Help?** Check the Supabase documentation at [https://supabase.com/docs](https://supabase.com/docs) or the MileHiiv `API-DOCUMENTATION.md` file.
