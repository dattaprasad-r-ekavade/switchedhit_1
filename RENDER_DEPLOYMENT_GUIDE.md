# 🚀 Render.com Deployment Guide

Complete guide for deploying your Laravel + Inertia.js + React application to Render.com with SQLite.

---

## 📋 Table of Contents

- [Why Render.com?](#why-rendercom)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Step-by-Step Deployment](#step-by-step-deployment)
- [Environment Configuration](#environment-configuration)
- [Database Setup](#database-setup)
- [Build Configuration](#build-configuration)
- [Troubleshooting](#troubleshooting)
- [Updating Your App](#updating-your-app)

---

## Why Render.com?

Render.com is perfect for deploying Laravel applications because:

✅ **Free Tier Available** - Great for testing and small projects
✅ **Automatic Deployments** - Push to Git, auto-deploy
✅ **Built-in SSL** - Free HTTPS certificates
✅ **Easy Environment Variables** - Simple configuration
✅ **SQLite Support** - Works with persistent disks
✅ **Zero Downtime Deploys** - No interruption during updates
✅ **Simple CLI & Dashboard** - Easy to manage

---

## Prerequisites

Before you begin, ensure you have:

- [ ] GitHub/GitLab/Bitbucket account
- [ ] Your Laravel app in a Git repository
- [ ] Render.com account (sign up at https://render.com)
- [ ] Working local development environment

---

## Quick Start (5 Minutes)

### 1. Push Your Code to Git

```powershell
git add .
git commit -m "Prepare for Render deployment"
git push origin main
```

### 2. Create New Web Service on Render

1. Go to https://dashboard.render.com
2. Click "New +" → "Web Service"
3. Connect your Git repository
4. Configure (see details below)
5. Deploy!

That's it! Render handles the rest.

---

## Step-by-Step Deployment

### Step 1: Prepare Your Repository

First, ensure your code is ready for deployment.

#### 1.1 Create `.gitignore` (if not exists)

Make sure these are in your `.gitignore`:

```gitignore
/node_modules
/public/hot
/public/storage
/public/build
/storage/*.key
/vendor
.env
.env.backup
.env.production
.phpunit.result.cache
Homestead.json
Homestead.yaml
auth.json
npm-debug.log
yarn-error.log
/.fleet
/.idea
/.vscode
database/database.sqlite
```

**Important:** Don't commit `database.sqlite` - we'll create it on Render.

#### 1.2 Create Build Script

Create a file called `render-build.sh` in your project root:

```bash
#!/usr/bin/env bash
# exit on error
set -o errexit

# Install PHP dependencies
composer install --no-dev --no-interaction --prefer-dist --optimize-autoloader

# Install Node dependencies and build assets
npm ci
npm run build

# Clear and cache Laravel config
php artisan config:clear
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

Make it executable:

```powershell
git add render-build.sh
git commit -m "Add Render build script"
```

#### 1.3 Commit and Push

```powershell
git add .
git commit -m "Prepare for Render deployment"
git push origin main
```

---

### Step 2: Create Web Service on Render

#### 2.1 Sign Up/Login to Render

1. Go to https://render.com
2. Sign up or log in (can use GitHub account)
3. Go to Dashboard: https://dashboard.render.com

#### 2.2 Create New Web Service

1. Click **"New +"** button (top right)
2. Select **"Web Service"**
3. Click **"Connect account"** for your Git provider (GitHub/GitLab)
4. Authorize Render to access your repositories
5. Find and select your Laravel repository
6. Click **"Connect"**

#### 2.3 Configure Web Service

Fill in these settings:

**Basic Configuration:**

| Field | Value |
|-------|-------|
| **Name** | `switchedhit` (or your app name) |
| **Region** | Choose closest to your users |
| **Branch** | `main` (or your default branch) |
| **Runtime** | `Docker` or `Native` |

**Build & Deploy:**

| Field | Value |
|-------|-------|
| **Build Command** | `bash render-build.sh` |
| **Start Command** | See below |

**Start Command:**
```bash
php artisan migrate --force && php -S 0.0.0.0:$PORT -t public public/index.php
```

Or for better performance with Apache:
```bash
php artisan migrate --force && vendor/bin/heroku-php-apache2 public/
```

**Plan:**
- **Free** (good for testing)
- **Starter** ($7/month - recommended for production)

---

### Step 3: Configure Environment Variables

In the Render dashboard, scroll down to **"Environment Variables"** section.

Click **"Add Environment Variable"** for each of these:

```env
APP_NAME=SwitchedHit
APP_ENV=production
APP_KEY=base64:AyfjTJwooZUO9s4GN7B0aK4GqK6DGuK3lVwO9IPKsDs=
APP_DEBUG=false
APP_URL=https://your-app-name.onrender.com

LOG_CHANNEL=stack
LOG_LEVEL=error

DB_CONNECTION=sqlite
DB_DATABASE=/var/data/database.sqlite

SESSION_DRIVER=database
SESSION_LIFETIME=120

CACHE_STORE=database

QUEUE_CONNECTION=database

BROADCAST_CONNECTION=log
FILESYSTEM_DISK=local

MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=your-email@gmail.com
MAIL_FROM_NAME="${APP_NAME}"
```

**⚠️ Important Notes:**
- Replace `APP_KEY` with your actual key (from local `.env`)
- Update `APP_URL` after deployment (Render will give you the URL)
- Set `APP_DEBUG=false` for production
- `DB_DATABASE` path points to persistent disk (set up next)

---

### Step 4: Add Persistent Disk for SQLite

SQLite needs a persistent disk to survive deployments.

#### 4.1 Create Disk

In your web service settings:

1. Scroll to **"Disks"** section
2. Click **"Add Disk"**
3. Configure:
   - **Name:** `database-storage`
   - **Mount Path:** `/var/data`
   - **Size:** 1 GB (Free tier) or more
4. Click **"Save"**

This ensures your database persists across deployments.

#### 4.2 Update Database Path

Make sure your `DB_DATABASE` environment variable is:
```
DB_DATABASE=/var/data/database.sqlite
```

---

### Step 5: Deploy!

1. Click **"Create Web Service"** button at the bottom
2. Render will:
   - Clone your repository
   - Run `render-build.sh`
   - Install dependencies
   - Build frontend assets
   - Start your application
3. Watch the logs as it deploys (takes 3-5 minutes)

**First Deployment Checklist:**
- ✓ Build completes successfully
- ✓ Migrations run (check logs)
- ✓ Application starts
- ✓ Health checks pass

---

### Step 6: Initialize Database

On first deployment, you need to create the SQLite database file.

#### Option A: Auto-initialize (Recommended)

Update your `render-build.sh` to include database initialization:

```bash
#!/usr/bin/env bash
set -o errexit

composer install --no-dev --no-interaction --prefer-dist --optimize-autoloader

npm ci
npm run build

# Create SQLite database if it doesn't exist
mkdir -p /var/data
touch /var/data/database.sqlite
chmod 664 /var/data/database.sqlite

php artisan config:clear
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

Commit and push - Render will redeploy automatically.

#### Option B: Manual Shell Access

1. Go to your service on Render dashboard
2. Click **"Shell"** tab
3. Run these commands:

```bash
cd /opt/render/project/src
touch /var/data/database.sqlite
chmod 664 /var/data/database.sqlite
php artisan migrate --force
```

---

### Step 7: Update APP_URL

After first deployment:

1. Copy your app URL from Render dashboard (e.g., `https://switchedhit.onrender.com`)
2. Go to **"Environment"** tab
3. Update `APP_URL` to your actual URL
4. Click **"Save Changes"**
5. Render will automatically redeploy

---

### Step 8: Test Your Application

Visit your application URL:
- Homepage should load ✓
- CSS/JS should be styled ✓
- Try to register an account ✓
- Log in and test features ✓

Check the **"Logs"** tab on Render for any errors.

---

## Environment Configuration

### Required Environment Variables

```env
# Application
APP_NAME=SwitchedHit
APP_ENV=production
APP_KEY=base64:YOUR_KEY_HERE
APP_DEBUG=false
APP_URL=https://your-app.onrender.com

# Database (SQLite on persistent disk)
DB_CONNECTION=sqlite
DB_DATABASE=/var/data/database.sqlite

# Session & Cache
SESSION_DRIVER=database
CACHE_STORE=database
QUEUE_CONNECTION=database

# Logging
LOG_CHANNEL=stack
LOG_LEVEL=error
```

### Optional Environment Variables

```env
# Mail Configuration (if using email)
MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password
MAIL_ENCRYPTION=tls

# Session Configuration
SESSION_LIFETIME=120
SESSION_ENCRYPT=false
SESSION_PATH=/
SESSION_DOMAIN=null
SESSION_SECURE_COOKIE=true

# For production optimization
FILESYSTEM_DISK=local
BROADCAST_CONNECTION=log
```

### Generating APP_KEY

If you need a new APP_KEY:

```powershell
# Locally
php artisan key:generate --show

# Copy the output and add to Render environment variables
```

**⚠️ Warning:** Don't change APP_KEY after users have created accounts (will invalidate sessions and encrypted data)!

---

## Database Setup

### SQLite Configuration

Render supports SQLite with persistent disks. Here's the complete setup:

#### 1. Persistent Disk (Already created in Step 4)

```
Name: database-storage
Mount Path: /var/data
Size: 1 GB (or more)
```

#### 2. Database Environment Variables

```env
DB_CONNECTION=sqlite
DB_DATABASE=/var/data/database.sqlite
```

#### 3. Database Initialization Script

Add to `render-build.sh`:

```bash
# Create database directory and file
mkdir -p /var/data
if [ ! -f /var/data/database.sqlite ]; then
    touch /var/data/database.sqlite
    chmod 664 /var/data/database.sqlite
    echo "Database file created"
fi
```

#### 4. Run Migrations

Migrations run automatically with the start command:
```bash
php artisan migrate --force
```

### Seeding Data (Optional)

If you want to seed initial data:

Update start command:
```bash
php artisan migrate --force && php artisan db:seed --force && php -S 0.0.0.0:$PORT -t public public/index.php
```

Or run manually in Shell:
```bash
php artisan db:seed --force
```

---

## Build Configuration

### render-build.sh (Complete Version)

Here's a production-ready build script:

```bash
#!/usr/bin/env bash
# Render Build Script for Laravel + Inertia.js + React

# Exit on error
set -o errexit

echo "🚀 Starting build process..."

# Install PHP dependencies
echo "📦 Installing Composer dependencies..."
composer install --no-dev --no-interaction --prefer-dist --optimize-autoloader

# Install Node dependencies
echo "📦 Installing NPM dependencies..."
npm ci --include=dev

# Build frontend assets
echo "🏗️  Building frontend assets..."
npm run build

# Setup database
echo "🗄️  Setting up database..."
mkdir -p /var/data
if [ ! -f /var/data/database.sqlite ]; then
    touch /var/data/database.sqlite
    chmod 664 /var/data/database.sqlite
    echo "✓ Database file created"
else
    echo "✓ Database file exists"
fi

# Clear Laravel caches
echo "🧹 Clearing caches..."
php artisan config:clear
php artisan cache:clear
php artisan view:clear
php artisan route:clear

# Cache Laravel config and routes for performance
echo "⚡ Caching configuration..."
php artisan config:cache
php artisan route:cache
php artisan view:cache

echo "✅ Build complete!"
```

### Start Command Options

#### Option 1: Built-in PHP Server (Simple)

```bash
php artisan migrate --force && php -S 0.0.0.0:$PORT -t public public/index.php
```

Good for: Testing, low traffic

#### Option 2: Apache (Recommended for Production)

First, add to `composer.json`:

```json
{
    "require": {
        "php": "^8.2",
        "heroku/heroku-buildpack-php": "*"
    }
}
```

Then use:
```bash
php artisan migrate --force && vendor/bin/heroku-php-apache2 public/
```

Good for: Production, better performance

#### Option 3: With Queue Worker

```bash
php artisan migrate --force && (php artisan queue:work --daemon &) && php -S 0.0.0.0:$PORT -t public public/index.php
```

Good for: Apps with background jobs

---

## Custom Domain Setup

### Adding Your Own Domain

1. Go to your service **"Settings"** tab
2. Scroll to **"Custom Domains"**
3. Click **"Add Custom Domain"**
4. Enter your domain (e.g., `switchedhit.com`)
5. Render provides DNS instructions
6. Add the CNAME record at your domain registrar:
   ```
   CNAME record: www → your-app.onrender.com
   ANAME/ALIAS: @ → your-app.onrender.com
   ```
7. Wait for DNS propagation (up to 48 hours)

### Update APP_URL

After domain is active:

```env
APP_URL=https://yourdomain.com
```

SSL certificate is automatically provided by Render!

---

## Troubleshooting

### Build Fails

**Problem:** Build script errors

**Solutions:**
1. Check **Logs** tab for specific error
2. Verify `render-build.sh` has correct syntax
3. Ensure `composer.json` and `package.json` are valid
4. Check Node and PHP versions

**Common Issues:**
```bash
# If npm ci fails, try:
npm install --legacy-peer-deps

# If composer fails, check memory:
# Render free tier has limited memory
composer install --no-dev --optimize-autoloader --no-scripts
```

### Application Won't Start

**Problem:** "Service Unavailable" or crashes

**Check:**
1. **Logs** tab - look for PHP errors
2. Start command is correct
3. Port binding: must use `$PORT` environment variable
4. Database file exists and is writable

**Fix:**
```bash
# Via Shell tab:
ls -la /var/data/
chmod 664 /var/data/database.sqlite
php artisan migrate --force
```

### 500 Internal Server Error

**Problem:** White page or 500 error

**Check:**
1. Set `APP_DEBUG=true` temporarily (then false again!)
2. Check Render logs for errors
3. Verify `APP_KEY` is set
4. Check file permissions

**Common Causes:**
- Missing `APP_KEY`
- Database not initialized
- Storage permissions
- Wrong `APP_URL`

### Assets Not Loading (404)

**Problem:** CSS/JS files return 404

**Check:**
1. `npm run build` completed successfully (check logs)
2. `public/build/` directory exists
3. `APP_URL` matches your domain

**Fix:**
```bash
# Trigger rebuild:
git commit --allow-empty -m "Trigger rebuild"
git push origin main
```

### Database Connection Errors

**Problem:** "Database not found" or "unable to open database"

**Check:**
1. Persistent disk is attached (`/var/data`)
2. `DB_DATABASE=/var/data/database.sqlite`
3. File exists and has correct permissions

**Fix via Shell:**
```bash
mkdir -p /var/data
touch /var/data/database.sqlite
chmod 664 /var/data/database.sqlite
php artisan migrate --force
```

### Session/Login Issues

**Problem:** Can't stay logged in, "419 Page Expired"

**Check:**
1. `SESSION_DRIVER=database` in environment
2. Sessions table exists (run migrations)
3. `APP_URL` is correct (must match exactly)
4. Cookie domain settings

**Fix:**
```bash
php artisan migrate --force
php artisan config:cache
```

### Memory Issues (Free Tier)

**Problem:** Build fails with "out of memory"

**Solutions:**

1. **Reduce build memory usage:**
```bash
# In render-build.sh, replace:
npm ci
# With:
npm ci --prefer-offline --no-audit
```

2. **Disable source maps:**
```javascript
// In vite.config.ts
export default defineConfig({
  build: {
    sourcemap: false, // Disable source maps
    minify: 'esbuild',
  }
});
```

3. **Upgrade to Starter plan** ($7/month) for more resources

### Slow First Request

**Problem:** First request after sleep is slow (Free tier)

**Explanation:** Free tier services sleep after 15 minutes of inactivity.

**Solutions:**
1. **Upgrade to paid plan** (no sleeping)
2. **Use cron job** to keep alive:
   ```bash
   # External service pings your app every 10 minutes
   # Use cron-job.org or similar
   ```
3. **Accept the trade-off** for free hosting

---

## Updating Your App

### Automatic Deployments (Default)

Render automatically deploys when you push to your connected branch:

```powershell
# Make changes locally
git add .
git commit -m "Add new feature"
git push origin main

# Render automatically detects and deploys!
```

### Manual Deployment

1. Go to your service on Render dashboard
2. Click **"Manual Deploy"** → **"Deploy latest commit"**
3. Or select specific commit to deploy

### Deployment Process

When you deploy, Render:
1. ✓ Pulls latest code from Git
2. ✓ Runs `render-build.sh`
3. ✓ Builds new container
4. ✓ Runs health checks
5. ✓ Switches traffic to new version (zero downtime!)
6. ✓ Old version kept running until new one is healthy

### Database Migrations

Migrations run automatically with start command:
```bash
php artisan migrate --force
```

If you need to run migrations separately:
```bash
# Via Shell tab:
php artisan migrate --force
```

### Rollback

If deployment breaks:

1. Go to **"Events"** tab
2. Find previous successful deploy
3. Click **"Rollback to this version"**
4. Render instantly switches back

---

## Performance Optimization

### 1. Enable Caching

Already configured in `render-build.sh`:
```bash
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

### 2. Optimize Composer

```bash
composer install --optimize-autoloader --classmap-authoritative
```

### 3. Use CDN for Assets

Update `vite.config.ts`:
```typescript
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
      },
    },
  },
});
```

### 4. Enable OPcache

Add to environment variables:
```env
PHP_OPCACHE_ENABLED=1
```

### 5. Database Optimization

For SQLite:
```bash
# Via Shell tab:
sqlite3 /var/data/database.sqlite "VACUUM;"
sqlite3 /var/data/database.sqlite "ANALYZE;"
```

---

## Monitoring & Logs

### View Logs

1. Go to your service dashboard
2. Click **"Logs"** tab
3. See real-time logs from your application

**Useful log commands:**
```bash
# Via Shell tab:
tail -f storage/logs/laravel.log
php artisan log:clear
```

### Set Up Alerts

1. Go to **"Settings"** → **"Notifications"**
2. Add email or Slack webhook
3. Get notified of:
   - Deploy failures
   - Service crashes
   - Health check failures

### Health Checks

Render automatically health checks your app. To customize:

**Create health check endpoint** in `routes/web.php`:
```php
Route::get('/health', function () {
    try {
        DB::connection()->getPdo();
        return response()->json(['status' => 'healthy'], 200);
    } catch (\Exception $e) {
        return response()->json(['status' => 'unhealthy'], 500);
    }
});
```

**Configure in Render:**
1. Settings → Health Check
2. Path: `/health`
3. Expected response: 200

---

## Security Best Practices

### 1. Environment Variables

- ✓ Never commit `.env` to Git
- ✓ Use Render dashboard for secrets
- ✓ Rotate `APP_KEY` if compromised
- ✓ Use strong database passwords (if switching to PostgreSQL)

### 2. HTTPS

- ✓ Automatic SSL from Render
- ✓ Force HTTPS in `.env`:
  ```env
  APP_URL=https://your-app.onrender.com
  SESSION_SECURE_COOKIE=true
  ```

### 3. Debug Mode

- ✓ Always `APP_DEBUG=false` in production
- ✓ Set `LOG_LEVEL=error` to reduce log noise
- ✓ Never expose sensitive data in logs

### 4. Rate Limiting

Add to `routes/web.php`:
```php
Route::middleware(['throttle:60,1'])->group(function () {
    // Your routes here
});
```

### 5. Regular Updates

```powershell
# Update dependencies regularly
composer update
npm update

# Check for security vulnerabilities
composer audit
npm audit
```

---

## Backup & Recovery

### Database Backup

#### Manual Backup

1. Go to **Shell** tab on Render dashboard
2. Run:
```bash
cp /var/data/database.sqlite /tmp/backup-$(date +%Y%m%d).sqlite
```
3. Download via SFTP or create download endpoint

#### Automated Backups

Create a scheduled job (separate Render service):

1. New **"Cron Job"** service
2. Schedule: Daily at 2 AM
3. Command:
```bash
curl -X POST https://your-app.onrender.com/backup
```

**Create backup endpoint** (protected with secret):
```php
// In routes/web.php
Route::post('/backup', function (Request $request) {
    if ($request->header('X-Backup-Secret') !== env('BACKUP_SECRET')) {
        abort(403);
    }
    
    $source = database_path('database.sqlite');
    $dest = storage_path('backups/db-' . date('Y-m-d') . '.sqlite');
    copy($source, $dest);
    
    return response()->json(['status' => 'backed up']);
});
```

### Restore Database

1. Upload backup file to `/var/data/`
2. Via Shell:
```bash
cp /tmp/backup.sqlite /var/data/database.sqlite
chmod 664 /var/data/database.sqlite
```

---

## Scaling & Upgrading

### When to Upgrade from Free Tier

Consider upgrading when:
- You need 24/7 uptime (no sleeping)
- Traffic increases (> 1000 visitors/day)
- Need more CPU/memory
- Want faster build times
- Need multiple regions

### Upgrade Plans

| Plan | Price | Features |
|------|-------|----------|
| **Free** | $0 | 750 hrs/month, sleeps after 15 min |
| **Starter** | $7/month | Always on, faster |
| **Standard** | $25/month | More resources |
| **Pro** | Custom | High performance |

### Scaling Options

1. **Vertical Scaling:** Upgrade instance size
2. **Horizontal Scaling:** Multiple instances (paid plans)
3. **CDN:** Use Cloudflare or similar
4. **Database:** Switch to PostgreSQL for high traffic

---

## Migrating from SQLite to PostgreSQL

As your app grows, you might want PostgreSQL:

### 1. Create PostgreSQL Database

1. Render dashboard → **"New +"** → **"PostgreSQL"**
2. Name it, select plan
3. Note the **Internal Connection String**

### 2. Update Environment Variables

```env
DB_CONNECTION=pgsql
DB_HOST=your-db-host.render.com
DB_PORT=5432
DB_DATABASE=your_database
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

### 3. Export/Import Data

```bash
# Export from SQLite
sqlite3 /var/data/database.sqlite .dump > data.sql

# Convert and import to PostgreSQL
# (may need manual conversion of SQL syntax)
psql $DATABASE_URL < data.sql
```

### 4. Re-run Migrations

```bash
php artisan migrate:fresh --force
```

---

## Cost Estimation

### Free Tier

- **Cost:** $0/month
- **Includes:** 750 hours (enough for 1 service always-on)
- **Limitations:** Sleeps after 15 min inactivity
- **Good for:** Testing, hobby projects, low-traffic apps

### Paid Tier

- **Starter:** $7/month
  - No sleeping
  - 512 MB RAM
  - Good for: Small production apps
  
- **Standard:** $25/month
  - 2 GB RAM
  - Better performance
  - Good for: Medium traffic apps

**Additional Costs:**
- Persistent Disk: Included (up to 1GB free)
- PostgreSQL: $7/month for 256 MB
- Custom Domain: Free
- SSL: Free

---

## Comparison: Render vs Others

| Feature | Render | Heroku | Railway | Vercel |
|---------|--------|--------|---------|--------|
| Free Tier | ✓ (750h) | ✓ Limited | ✓ $5 credit | ✓ (Frontend only) |
| Laravel Support | ✓ Native | ✓ Native | ✓ Native | ✗ Limited |
| Auto Deploy | ✓ | ✓ | ✓ | ✓ |
| Free SSL | ✓ | ✓ | ✓ | ✓ |
| SQLite Support | ✓ (with disk) | ✗ | ✓ | ✗ |
| Price | $7/mo | $7/mo | $5/mo | $20/mo |
| Ease of Use | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |

**Winner for Laravel + SQLite:** Render.com! 🏆

---

## FAQ

### Q: Can I use the free tier for production?

**A:** Yes, but with limitations:
- Service sleeps after 15 minutes of inactivity
- First request after sleep takes ~30 seconds
- Best for low-traffic apps or demos

For production with consistent traffic, upgrade to Starter ($7/month).

### Q: How do I add a custom domain?

**A:** See [Custom Domain Setup](#custom-domain-setup) section above. It's free and includes SSL!

### Q: Can I SSH into my container?

**A:** Not traditional SSH, but Render provides a **Shell** tab in the dashboard with full terminal access.

### Q: How do I run Laravel commands?

**A:** Use the **Shell** tab:
```bash
php artisan migrate
php artisan cache:clear
php artisan queue:work
```

### Q: Is my SQLite database safe?

**A:** Yes! Persistent disks survive deployments. But always maintain backups.

### Q: Can I use Redis?

**A:** Yes! Render offers Redis as an add-on service ($7/month). Update `.env`:
```env
CACHE_STORE=redis
SESSION_DRIVER=redis
REDIS_HOST=your-redis.render.com
```

### Q: How do I handle file uploads?

**A:** Two options:
1. **Persistent disk:** Store in `/var/data/uploads/`
2. **S3/Cloudinary:** Better for production (recommended)

### Q: Can I run scheduled tasks (cron jobs)?

**A:** Yes! Create a separate **Cron Job** service on Render:
```bash
php artisan schedule:run
```

---

## Resources

### Official Documentation
- **Render Docs:** https://render.com/docs
- **Laravel Docs:** https://laravel.com/docs
- **Inertia.js:** https://inertiajs.com

### Helpful Links
- **Render Community:** https://community.render.com
- **Render Status:** https://status.render.com
- **Support:** support@render.com

### Example Repositories
- Laravel on Render: https://github.com/render-examples/laravel
- This app: [Your GitHub URL]

---

## Next Steps

After successful deployment:

1. ✓ Test all features thoroughly
2. ✓ Set up monitoring and alerts
3. ✓ Configure backups
4. ✓ Add custom domain
5. ✓ Optimize performance
6. ✓ Set up CI/CD (optional)
7. ✓ Monitor costs and usage

---

## Conclusion

Congratulations! 🎉 Your Laravel + Inertia.js + React app is now live on Render.com!

**What you've accomplished:**
- ✅ Automated deployments from Git
- ✅ Free SSL certificate
- ✅ Persistent SQLite database
- ✅ Production-ready configuration
- ✅ Zero-downtime deploys

**Remember:**
- Keep `APP_DEBUG=false` in production
- Monitor your logs regularly
- Backup your database
- Update dependencies regularly

**Need help?** Check the [Troubleshooting](#troubleshooting) section or Render's community forum.

---

**Happy deploying! 🚀**

*Last updated: January 2025*
*Compatible with: Laravel 12, PHP 8.2+, Node.js 20+*
