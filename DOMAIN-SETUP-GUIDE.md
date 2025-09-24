# 🌐 Domain Setup Guide for MileHiiv

## 📋 Overview

This guide will help you configure your custom domain `milehiiv.com` for the MileHiiv application, including DNS configuration, SSL certificates, and Vercel domain setup.

## 🎯 Domain Configuration Status

### ✅ **Already Configured**
Your domain `milehiiv.com` is already configured in the application:

- **Production Environment**: `env.template.production` includes `https://milehiiv.com`
- **Vercel Configuration**: `vercel.json` includes redirects to `https://milehiiv.com`
- **Security Headers**: Configured for production domain

## 🚀 Step 1: Vercel Domain Setup

### **1.1 Add Domain to Vercel Project**
1. Go to your Vercel dashboard
2. Select your MileHiiv project
3. Go to "Settings" → "Domains"
4. Click "Add Domain"
5. Enter: `milehiiv.com`
6. Click "Add"

### **1.2 Configure DNS Records**
Vercel will provide you with DNS records to configure:

**For Root Domain (milehiiv.com):**
```
Type: A
Name: @
Value: 76.76.19.19
```

**For WWW Subdomain (www.milehiiv.com):**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

## 🔧 Step 2: DNS Configuration

### **2.1 Access Your Domain Registrar**
Go to your domain registrar (where you purchased milehiiv.com) and access DNS management:

**Common Registrars:**
- **GoDaddy**: DNS Management
- **Namecheap**: Advanced DNS
- **Cloudflare**: DNS tab
- **Google Domains**: DNS settings

### **2.2 Configure DNS Records**

#### **For Root Domain (milehiiv.com):**
```
Type: A
Name: @ (or leave blank)
Value: 76.76.19.19
TTL: 300 (or default)
```

#### **For WWW Subdomain:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 300 (or default)
```

#### **Optional: Redirect www to root**
```
Type: CNAME
Name: www
Value: milehiiv.com
TTL: 300 (or default)
```

### **2.3 Verify DNS Configuration**
```bash
# Check DNS propagation
nslookup milehiiv.com
nslookup www.milehiiv.com

# Or use online tools:
# https://dnschecker.org
# https://whatsmydns.net
```

## 🔒 Step 3: SSL Certificate Setup

### **3.1 Automatic SSL (Recommended)**
Vercel automatically provides SSL certificates for custom domains:
- ✅ Free SSL certificates via Let's Encrypt
- ✅ Automatic renewal
- ✅ HTTPS redirect configured

### **3.2 Verify SSL Configuration**
After DNS propagation (5-60 minutes):
```bash
# Check SSL certificate
openssl s_client -connect milehiiv.com:443 -servername milehiiv.com

# Or visit: https://milehiiv.com
```

## ⚙️ Step 4: Environment Configuration

### **4.1 Production Environment Variables**
Update your production environment variables in Vercel:

```bash
# App URLs - Production
NEXT_PUBLIC_APP_URL=https://milehiiv.com
NEXT_PUBLIC_API_URL=https://milehiiv.com

# Other production variables
DATABASE_URL=your-production-database-url
JWT_SECRET=your-secure-jwt-secret
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### **4.2 Vercel Configuration**
The `vercel.json` file already includes:
- ✅ Redirect configuration for milehiiv.com
- ✅ Security headers
- ✅ Production environment settings

## 🧪 Step 5: Testing Domain Setup

### **5.1 Test Domain Access**
```bash
# Test root domain
curl -I https://milehiiv.com

# Test www subdomain
curl -I https://www.milehiiv.com

# Test API endpoints
curl -I https://milehiiv.com/api/auth/me
```

### **5.2 Test Application Features**
1. **Homepage**: https://milehiiv.com
2. **Registration**: https://milehiiv.com/register
3. **Login**: https://milehiiv.com/login
4. **Upload**: https://milehiiv.com/upload
5. **Dashboard**: https://milehiiv.com/dashboard

### **5.3 Test API Endpoints**
```bash
# Test registration endpoint
curl -X POST https://milehiiv.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@milehiiv.com","password":"Test123!","name":"Test User"}'

# Test login endpoint
curl -X POST https://milehiiv.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@milehiiv.com","password":"Test123!"}'
```

## 🔧 Step 6: Advanced Configuration

### **6.1 Custom Email Configuration**
For professional email addresses (optional):

**Email Provider Options:**
- **Google Workspace**: Custom email with Gmail
- **Microsoft 365**: Custom email with Outlook
- **Zoho Mail**: Free custom email
- **ProtonMail**: Privacy-focused custom email

**DNS Records for Email:**
```
Type: MX
Name: @
Value: mail.milehiiv.com (or your email provider)
Priority: 10
```

### **6.2 Analytics and Monitoring**
Configure analytics for your domain:

**Google Analytics:**
```html
<!-- Add to layout.tsx -->
<Script
  src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
  strategy="afterInteractive"
/>
```

**Vercel Analytics:**
```bash
npm install @vercel/analytics
```

### **6.3 SEO Configuration**
Update metadata for your domain:

```typescript
// In src/app/layout.tsx
export const metadata: Metadata = {
  title: 'MileHiiv - Gig Driver Mileage Tracking',
  description: 'Professional mileage tracking for gig drivers with PDF processing and gap detection',
  keywords: 'mileage tracking, gig economy, tax deduction, PDF processing',
  openGraph: {
    title: 'MileHiiv - Professional Mileage Tracking',
    description: 'Track your gig driver mileage with intelligent PDF processing',
    url: 'https://milehiiv.com',
    siteName: 'MileHiiv',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MileHiiv - Professional Mileage Tracking',
    description: 'Track your gig driver mileage with intelligent PDF processing',
    creator: '@milehiiv',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}
```

## 🚨 Troubleshooting

### **Common Issues:**

#### **Domain Not Resolving**
```
Error: This site can't be reached
```
**Solutions:**
- Check DNS propagation (can take up to 48 hours)
- Verify DNS records are correct
- Check domain registrar settings

#### **SSL Certificate Issues**
```
Error: Your connection is not private
```
**Solutions:**
- Wait for SSL certificate generation (up to 24 hours)
- Check Vercel domain status
- Verify DNS records are correct

#### **Redirects Not Working**
```
Error: Too many redirects
```
**Solutions:**
- Check Vercel redirect configuration
- Verify DNS CNAME records
- Clear browser cache

### **Debug Steps:**
1. Check Vercel domain status
2. Verify DNS propagation
3. Test with different browsers
4. Check browser developer tools
5. Monitor Vercel function logs

## ✅ Domain Setup Checklist

- [ ] Domain added to Vercel project
- [ ] DNS A record configured (76.76.19.19)
- [ ] DNS CNAME record configured for www
- [ ] SSL certificate generated
- [ ] Environment variables updated
- [ ] Domain accessible via HTTPS
- [ ] API endpoints responding
- [ ] Application features working
- [ ] Analytics configured (optional)
- [ ] SEO metadata updated

## 🎉 Your Domain is Ready!

Once configured, your MileHiiv application will be accessible at:
- **Main Site**: https://milehiiv.com
- **WWW**: https://www.milehiiv.com
- **API**: https://milehiiv.com/api/*

## 📞 Support Resources

### **DNS Propagation Checkers:**
- https://dnschecker.org
- https://whatsmydns.net
- https://dns.google

### **SSL Certificate Checkers:**
- https://www.ssllabs.com/ssltest/
- https://www.sslshopper.com/ssl-checker.html

### **Vercel Domain Documentation:**
- https://vercel.com/docs/concepts/projects/domains

---

**Your MileHiiv application will be live at milehiiv.com once DNS propagation is complete!** 🌐
