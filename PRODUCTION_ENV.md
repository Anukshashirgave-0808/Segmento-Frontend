# Frontend Production Environment Variables

## Required Environment Variables for Production

Add these to your Vercel/Netlify deployment:

```bash
# SegmentoPulse Backend API (CRITICAL - MUST UPDATE!)
NEXT_PUBLIC_PULSE_API_URL=https://workwithshafisk-segmentopulse-backend.hf.space

# Segmento Sense Backend API  
NEXT_PUBLIC_API_URL=https://workwithshafisk-segmento-sense-backend.hf.space

# Firebase Configuration (Main)
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_DATABASE_URL=https://your-project.firebaseio.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Firebase Configuration (Pulse - from seg-pulse)
NEXT_PUBLIC_PULSE_FIREBASE_API_KEY=AIzaSyCXUeYo73ehhmheLvzwBq1UZqworWPnrrM
NEXT_PUBLIC_PULSE_FIREBASE_AUTH_DOMAIN=dbsegpulse-fbc35.firebaseapp.com
NEXT_PUBLIC_PULSE_FIREBASE_DATABASE_URL=https://dbsegpulse-fbc35-default-rtdb.asia-southeast1.firebasedatabase.app
NEXT_PUBLIC_PULSE_FIREBASE_PROJECT_ID=dbsegpulse-fbc35
NEXT_PUBLIC_PULSE_FIREBASE_STORAGE_BUCKET=dbsegpulse-fbc35.appspot.com
NEXT_PUBLIC_PULSE_FIREBASE_MESSAGING_SENDER_ID=579339248550
NEXT_PUBLIC_PULSE_FIREBASE_APP_ID=1:579339248550:web:43e9525566e7bd18ac2567

# Backend URL (Email service)
NEXT_PUBLIC_BACKEND_URL=https://workwithshafisk-segmento-sense-backend.hf.space
```

## Critical Updates for Production

### ✅ Already Configured (from seg-pulse)
- Pulse Firebase credentials are ready
- Backend will use these for view counting and analytics

### ⚠️ MUST Configure Before Deployment
- `NEXT_PUBLIC_PULSE_API_URL` - **Points to your SegmentoPulse backend on HF Spaces**

## Deployment Instructions

### For Vercel:
1. Go to your Vercel project settings
2. Navigate to "Environment Variables"
3. Add all variables above
4. Redeploy

### For Netlify:
1. Go to Site settings → Environment variables
2. Add all variables above
3. Trigger a new deploy

## Verification

After deployment, test these endpoints:
- Pulse page: `https://segmento.in/pulse`
- API health: `https://workwithshafisk-segmentopulse-backend.hf.space/health`
- News endpoint: `https://workwithshafisk-segmentopulse-backend.hf.space/api/news/ai`
