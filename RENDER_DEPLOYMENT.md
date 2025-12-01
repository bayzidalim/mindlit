# MindLit Backend Deployment Guide for Render

## Problem
The error "invalid ELF header" occurs because `sqlite3` has native bindings that were compiled on macOS but need to run on Linux (Render's servers).

## Solution Applied

### 1. Added Build Script
Updated `backend/package.json` to include a `build` script that rebuilds native dependencies:
```json
"build": "npm rebuild"
```

### 2. Created .npmrc
Added `backend/.npmrc` to force building from source:
```
build-from-source=true
```

### 3. Created render.yaml
Added a Render configuration file at the project root with proper build commands.

## Deployment Steps

### Option 1: Using render.yaml (Recommended)
1. Commit all changes:
   ```bash
   git add .
   git commit -m "Fix: Configure Render deployment for native dependencies"
   git push
   ```

2. In Render Dashboard:
   - Go to your service
   - Render should automatically detect the `render.yaml` file
   - Or manually trigger a new deployment

### Option 2: Manual Configuration in Render Dashboard
If you're not using the render.yaml file, configure these settings in Render:

1. **Build Command:**
   ```
   cd backend && npm install && npm run build
   ```

2. **Start Command:**
   ```
   cd backend && npm start
   ```

3. **Environment Variables:**
   - `NODE_ENV`: `production`
   - `PORT`: `10000` (or leave default)
   - `JWT_SECRET`: (generate a secure random string)
   - `GEMINI_API_KEY`: (your API key)
   - `FRONTEND_URL`: (your frontend URL)

4. **Health Check Path:**
   ```
   /api/health
   ```

## Alternative Solution: Switch to better-sqlite3

If the above solution doesn't work, you can switch to `better-sqlite3`, which has better deployment support:

1. Install better-sqlite3:
   ```bash
   cd backend
   npm uninstall sqlite3
   npm install better-sqlite3
   ```

2. Update your database code to use better-sqlite3 (synchronous API)

## Verify Deployment

After deployment, test the health endpoint:
```bash
curl https://your-app.onrender.com/api/health
```

Expected response:
```json
{"status":"ok","message":"MindLit API is running"}
```

## Troubleshooting

### If you still get the ELF error:
1. Check Render logs to ensure `npm rebuild` is running
2. Try clearing Render's build cache (in dashboard settings)
3. Consider switching to better-sqlite3 (see alternative solution above)

### If deployment fails:
1. Check that all environment variables are set
2. Verify the build command is correct
3. Check Render logs for specific error messages
