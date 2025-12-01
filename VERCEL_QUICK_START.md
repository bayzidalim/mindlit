# Quick Start: Setting Backend URL in Vercel

## 🎯 **The Simple Answer:**

After deploying to Vercel, set this environment variable:

**Variable Name:** `VITE_API_URL`  
**Variable Value:** `https://your-backend-name.onrender.com/api`

---

## 📍 **Exactly Where to Set It**

### Visual Steps:

1. **Login to Vercel** → [vercel.com/dashboard](https://vercel.com/dashboard)

2. **Click on your project** (e.g., "mindlit")

3. **Click "Settings"** tab at the top

4. **Click "Environment Variables"** in the left sidebar

5. **Add new variable:**
   ```
   Name:  VITE_API_URL
   Value: https://your-backend.onrender.com/api
   ```

6. **Select environments:** ✓ Production ✓ Preview ✓ Development

7. **Click "Save"**

8. **IMPORTANT:** Redeploy
   - Go to "Deployments" tab
   - Click ••• (three dots) on latest deployment
   - Click "Redeploy"
   - **UNCHECK** "Use existing Build Cache"
   - Click "Redeploy"

---

## 🔗 **Get Your Backend URL**

Your Render backend URL format:
```
https://mindlit-backend-XXXX.onrender.com
```

Add `/api` to the end:
```
https://mindlit-backend-XXXX.onrender.com/api
```

**This is the value you use for `VITE_API_URL`**

---

## ✅ **Complete Environment Variables**

### Vercel (Frontend):
```bash
VITE_API_URL=https://mindlit-backend-XXXX.onrender.com/api
```

### Render (Backend):
```bash
FRONTEND_URL=https://mindlit-XXXX.vercel.app
NODE_ENV=production
JWT_SECRET=your-secret-key
GEMINI_API_KEY=your-gemini-key
```

---

## 🚨 **Common Mistakes**

❌ **Wrong:** `http://localhost:3000/api`  
✅ **Right:** `https://your-backend.onrender.com/api`

❌ **Wrong:** Forgetting `/api` at the end  
✅ **Right:** Always include `/api`

❌ **Wrong:** Setting in .env file only  
✅ **Right:** Set in Vercel dashboard

❌ **Wrong:** Redeploying with build cache  
✅ **Right:** Redeploy WITHOUT build cache

---

## 🧪 **How to Verify It Works**

1. Visit your Vercel app
2. Open DevTools (F12) → Console
3. Try to login or register
4. Check Network tab - API calls should go to your Render URL
5. No CORS errors should appear

---

## 📞 **Need Help?**

If you see:
- ❌ **"Network Error"** → Check `VITE_API_URL` is set correctly
- ❌ **"CORS Error"** → Update `FRONTEND_URL` in Render backend
- ❌ **"404 Not Found"** → Make sure you added `/api` to the URL

**See `VERCEL_DEPLOYMENT.md` for the complete guide!**
