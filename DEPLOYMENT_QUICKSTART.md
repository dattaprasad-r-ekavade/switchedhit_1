# 🚀 Quick Start: Deploy to Render.com

This is a **5-minute quick start** guide. For complete details, see [RENDER_DEPLOYMENT_GUIDE.md](RENDER_DEPLOYMENT_GUIDE.md).

---

## Prerequisites

- ✓ GitHub/GitLab account
- ✓ Your code pushed to Git
- ✓ Render.com account

---

## Step 1: Push to Git

```bash
git add .
git commit -m "Prepare for Render deployment"
git push origin main
```

---

## Step 2: Create Web Service

1. Go to https://dashboard.render.com
2. Click **"New +"** → **"Web Service"**
3. Connect your Git repository
4. Configure:

### Basic Settings

| Setting | Value |
|---------|-------|
| Name | `switchedhit` |
| Region | Your choice |
| Branch | `main` |
| Build Command | `bash render-build.sh` |
| Start Command | `php artisan migrate --force && php -S 0.0.0.0:$PORT -t public public/index.php` |

---

## Step 3: Add Environment Variables

Click **"Add Environment Variable"** for each:

```env
APP_NAME=SwitchedHit
APP_ENV=production
APP_KEY=base64:AyfjTJwooZUO9s4GN7B0aK4GqK6DGuK3lVwO9IPKsDs=
APP_DEBUG=false
APP_URL=https://your-app.onrender.com

DB_CONNECTION=sqlite
DB_DATABASE=/var/data/database.sqlite

SESSION_DRIVER=database
CACHE_STORE=database
QUEUE_CONNECTION=database
```

**See `.env.render` file for complete list.**

---

## Step 4: Add Persistent Disk

1. Scroll to **"Disks"** section
2. Click **"Add Disk"**
3. Configure:
   - **Name:** `database-storage`
   - **Mount Path:** `/var/data`
   - **Size:** 1 GB

---

## Step 5: Deploy!

1. Click **"Create Web Service"**
2. Wait 3-5 minutes for deployment
3. Your app will be live at `https://your-app.onrender.com`

---

## Step 6: Update APP_URL

1. Copy your app URL from Render
2. Update `APP_URL` environment variable
3. Save (auto-redeploys)

---

## ✅ Done!

Your app is now live! 🎉

**Next steps:**
- Test all features
- Add custom domain (optional)
- Set up monitoring

---

## 🐛 Troubleshooting

### Build Fails
- Check Logs tab for errors
- Verify `render-build.sh` exists
- Ensure dependencies are in `package.json` and `composer.json`

### 500 Error
- Check Logs tab
- Verify `APP_KEY` is set
- Ensure database disk is mounted at `/var/data`
- Run migrations via Shell tab: `php artisan migrate --force`

### Assets Not Loading
- Verify `npm run build` completed (check logs)
- Check `APP_URL` matches your domain

---

## 📚 Full Documentation

See [RENDER_DEPLOYMENT_GUIDE.md](RENDER_DEPLOYMENT_GUIDE.md) for:
- Detailed configuration
- Custom domains
- Performance optimization
- Database backups
- Scaling options
- And much more!

---

## 💰 Pricing

- **Free Tier:** Perfect for testing (sleeps after 15 min)
- **Starter ($7/mo):** Always on, recommended for production
- **Persistent Disk:** Included (1 GB free)
- **SSL:** Free
- **Custom Domain:** Free

---

## 🆘 Need Help?

- **Full Guide:** [RENDER_DEPLOYMENT_GUIDE.md](RENDER_DEPLOYMENT_GUIDE.md)
- **Render Docs:** https://render.com/docs
- **Support:** support@render.com

---

**Happy deploying! 🚀**
