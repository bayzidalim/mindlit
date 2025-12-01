# MindLit Frontend Deployment Guide for Vercel

## Prerequisites
- ✅ Backend deployed on Render (backend URL ready)
- ✅ Frontend code updated to use environment variables
- ✅ GitHub repository with latest code

---

## Step 1: Get Your Render Backend URL

After your backend is deployed on Render, you'll get a URL like:
```
https://mindlit-backend.onrender.com
```

Your API URL will be:
```
https://mindlit-backend.onrender.com/api
```

**Important:** Copy this URL - you'll need it in Step 3!

---

## Step 2: Deploy to Vercel

### Option A: Deploy from GitHub (Recommended)

1. **Go to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Sign in with your GitHub account

2. **Import Your Repository**
   - Click "Add New..." → "Project"
   - Select your GitHub repository (`bayzidalim/mindlit`)
   - Click "Import"

3. **Configure Project Settings**
   - **Framework Preset:** Vite
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build` (default, no change needed)
   - **Output Directory:** `dist` (default, no change needed)

### Option B: Deploy via Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Navigate to frontend directory
cd frontend

# Deploy to Vercel
vercel

# Follow the prompts, then deploy to production
vercel --prod
```

---

## Step 3: Set Environment Variables in Vercel

This is the **MOST IMPORTANT** step!

### Via Vercel Dashboard (Recommended):

1. **Go to Your Project Settings**
   - After importing, click on your project
   - Go to "Settings" tab
   - Click "Environment Variables" in the sidebar

2. **Add Your Backend URL**
   - **Name:** `VITE_API_URL`
   - **Value:** `https://your-backend-app.onrender.com/api` (replace with your actual Render URL)
   - **Environment:** Select all (Production, Preview, Development)
   - Click "Save"

3. **Redeploy**
   - Go to "Deployments" tab
   - Click the three dots (•••) on the latest deployment
   - Click "Redeploy"
   - Make sure "Use existing Build Cache" is **UNCHECKED**
   - Click "Redeploy"

### Via Vercel CLI:

```bash
cd frontend
vercel env add VITE_API_URL production
# Paste your backend URL when prompted: https://your-backend-app.onrender.com/api

vercel env add VITE_API_URL preview
# Paste the same URL

vercel env add VITE_API_URL development
# Paste the same URL

# Redeploy to apply changes
vercel --prod
```

---

## Step 4: Update Backend CORS Settings

Your backend needs to allow requests from your Vercel domain!

1. **Get Your Vercel URL**
   - After deployment, Vercel gives you a URL like: `https://mindlit.vercel.app`

2. **Update Backend Environment Variables on Render**
   - Go to your Render backend service
   - Go to "Environment" tab
   - Find or add `FRONTEND_URL`
   - Set value to: `https://mindlit.vercel.app` (your actual Vercel URL)
   - Click "Save Changes"
   - Render will automatically redeploy

---

## Step 5: Verify Deployment

### Test Your Application:

1. **Visit your Vercel URL**
   ```
   https://mindlit.vercel.app
   ```

2. **Check the Browser Console**
   - Open Developer Tools (F12)
   - Look for any CORS errors or API connection issues

3. **Test Authentication**
   - Try registering a new user
   - Try logging in
   - Verify that API calls are going to your Render backend

### Common Issues & Solutions:

#### ❌ **CORS Error**
**Solution:** Update `FRONTEND_URL` in Render backend environment variables

#### ❌ **API calls going to localhost**
**Solution:** Environment variable not set properly
- Verify `VITE_API_URL` is set in Vercel
- Redeploy without build cache

#### ❌ **404 on page refresh**
**Solution:** Vercel needs a redirect rule (usually automatic with Vite)
- Create `vercel.json` in frontend root if needed

---

## Environment Variables Checklist

### ✅ Vercel (Frontend):
- [x] `VITE_API_URL` = `https://your-backend.onrender.com/api`

### ✅ Render (Backend):
- [x] `FRONTEND_URL` = `https://your-app.vercel.app`
- [x] `JWT_SECRET` = (secure random string)
- [x] `GEMINI_API_KEY` = (your API key)
- [x] `NODE_ENV` = `production`

---

## Custom Domain (Optional)

If you want to use a custom domain:

1. **In Vercel:**
   - Go to Project Settings → Domains
   - Add your custom domain
   - Follow DNS setup instructions

2. **Update Render Backend:**
   - Update `FRONTEND_URL` to your custom domain
   - Redeploy backend

---

## Continuous Deployment

Vercel automatically deploys when you push to GitHub:
- **Production:** Pushes to `main` branch
- **Preview:** Pull requests and other branches

To trigger a new deployment:
```bash
git add .
git commit -m "Your changes"
git push
```

Vercel will automatically build and deploy!

---

## Quick Reference: Environment Variables

### Where to Set Backend URL:

| Platform | Where to Set | Variable Name | Example Value |
|----------|-------------|---------------|---------------|
| **Vercel** (Frontend) | Project Settings → Environment Variables | `VITE_API_URL` | `https://mindlit-backend.onrender.com/api` |
| **Render** (Backend) | Service → Environment | `FRONTEND_URL` | `https://mindlit.vercel.app` |

---

## Testing Locally with Production Backend

If you want to test locally but connect to the production backend:

```bash
cd frontend

# Create a .env.local file (not committed to git)
echo "VITE_API_URL=https://your-backend.onrender.com/api" > .env.local

# Run dev server
npm run dev
```

---

## Troubleshooting Commands

```bash
# Check Vercel deployment logs
vercel logs

# List your environment variables
vercel env ls

# Remove and re-add env variable
vercel env rm VITE_API_URL production
vercel env add VITE_API_URL production

# Force redeploy
vercel --prod --force
```

---

## Summary

1. ✅ Deploy backend to Render → Get backend URL
2. ✅ Deploy frontend to Vercel from GitHub
3. ✅ **Set `VITE_API_URL` in Vercel environment variables**
4. ✅ Update `FRONTEND_URL` in Render backend
5. ✅ Redeploy both services
6. ✅ Test your application!

**The key is setting `VITE_API_URL` in Vercel's environment variables!**
