# MindLit Backend Deployment Guide for Render

## Problem (Resolved)
The error "invalid ELF header" occurred because `sqlite3` has native bindings that were compiled on macOS but needed to run on Linux (Render's servers).

## Solution Implemented

### Migrated to better-sqlite3
We've switched from `sqlite3` to `better-sqlite3`, which:
- Has better cross-platform build support
- Is faster and more modern
- Uses a synchronous API (simpler code)
- Doesn't have the same native binding deployment issues

### Changes Made

1. **Updated package.json**
   - Replaced `sqlite3` with `better-sqlite3`
   - Removed unnecessary build script

2. **Migrated database layer**
   - Updated `src/config/database.js` to use better-sqlite3's synchronous API
   - Updated `src/models/schema.js` to use `db.exec()` instead of callbacks

3. **Updated render.yaml**
   - Simplified build command (no need for rebuild step)

## Deployment Steps

### Option 1: Using render.yaml (Recommended)
1. Commit and push all changes:
   ```bash
   git add .
   git commit -m "Migrate to better-sqlite3 for improved deployment"
   git push
   ```

2. In Render Dashboard:
   - Go to your service
   - Render will automatically detect the `render.yaml` file
   - Trigger a new deployment if it doesn't start automatically

### Option 2: Manual Configuration in Render Dashboard
If you're not using the render.yaml file, configure these settings in Render:

1. **Build Command:**
   ```
   cd backend && npm install
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

## Verify Deployment

After deployment, test the health endpoint:
```bash
curl https://your-app.onrender.com/api/health
```

Expected response:
```json
{"status":"ok","message":"MindLit API is running"}
```

## Benefits of better-sqlite3

- ✅ No native binding issues across platforms
- ✅ Faster performance (synchronous operations)
- ✅ Simpler code (no callbacks or promises for DB operations)
- ✅ Better memory management
- ✅ Supports modern SQLite features

## Testing Locally

Run the backend locally to verify:
```bash
cd backend
npm install
npm start
```

You should see:
```
Connected to SQLite database
Users table created or already exists
Books table created or already exists
...
Server is running on port 3000
```

## Troubleshooting

### If deployment fails:
1. Check that all environment variables are set in Render dashboard
2. Verify the build command is correct
3. Check Render logs for specific error messages
4. Clear Render's build cache if needed (in dashboard settings)

### If you see database errors:
1. Ensure the database file path is correct
2. Check file permissions
3. Verify SQLite is enabled on Render (it is by default)

