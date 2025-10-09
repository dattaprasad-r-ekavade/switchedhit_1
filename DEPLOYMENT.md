# 📦 Deployment Documentation

Complete deployment guide for your Laravel + Inertia.js + React application.

---

## 🎯 Deployment Platform: Render.com

This application is configured for deployment on **Render.com** - a modern cloud platform that makes deploying web applications simple and affordable.

---

## 📚 Documentation Files

### 1. **DEPLOYMENT_QUICKSTART.md** ⚡
**Start here!** 5-minute quick start guide.
- Fast deployment steps
- Minimal configuration
- Perfect for getting your app online quickly

### 2. **RENDER_DEPLOYMENT_GUIDE.md** 📖
**Complete reference** with detailed explanations.
- Step-by-step instructions
- Configuration options
- Troubleshooting guide
- Performance optimization
- Custom domain setup
- Scaling advice

### 3. **render-build.sh** 🔧
Build script that runs on Render during deployment.
- Installs dependencies
- Builds frontend assets
- Sets up database
- Caches Laravel configuration

### 4. **.env.render** ⚙️
Template for environment variables.
- Copy these to Render dashboard
- Update APP_URL after deployment
- Configure mail settings if needed

---

## 🚀 Quick Start (5 Minutes)

### 1. Push to Git
```bash
git add .
git commit -m "Deploy to Render"
git push origin main
```

### 2. Create Service on Render
- Go to https://dashboard.render.com
- New Web Service
- Connect your Git repo
- Use settings from DEPLOYMENT_QUICKSTART.md

### 3. You're Live! 🎉
Your app will be at `https://your-app.onrender.com`

---

## 💡 Why Render.com?

✅ **Free tier available** - Perfect for testing
✅ **Automatic deployments** - Push to Git, auto-deploy
✅ **Built-in SSL** - Free HTTPS certificates
✅ **SQLite support** - Works with persistent disks
✅ **Simple configuration** - No complex setup
✅ **Zero downtime** - Seamless updates
✅ **Great for Laravel** - Native PHP support

---

## 🏗️ Application Stack

- **Backend:** Laravel 12
- **Frontend:** React 19 with Inertia.js 2
- **Database:** SQLite (single file)
- **Build Tool:** Vite 6
- **Styling:** Tailwind CSS 4
- **Authentication:** Laravel Fortify
- **Components:** Radix UI + shadcn/ui

---

## 📋 Pre-Deployment Checklist

Before deploying, ensure:

- [ ] All changes committed to Git
- [ ] `render-build.sh` is executable (Git should handle this)
- [ ] `.env.render` reviewed and ready to copy
- [ ] Database migrations are up to date
- [ ] Frontend assets build successfully locally (`npm run build`)
- [ ] Render.com account created

---

## 🔑 Key Files for Deployment

### Don't Modify:
- `render-build.sh` - Render uses this to build your app
- `public/index.php` - Entry point (works as-is)
- `vite.config.ts` - Asset building configuration

### Review Before Deploy:
- `.env.render` - Environment variable template
- `composer.json` - PHP dependencies
- `package.json` - Node dependencies

### Never Commit:
- `.env` - Local development settings
- `database/database.sqlite` - Your local database
- `node_modules/` - Generated
- `vendor/` - Generated
- `public/build/` - Generated

---

## 🗄️ Database Setup

This app uses **SQLite** for simplicity:

### On Render:
1. Create persistent disk at `/var/data`
2. Database file: `/var/data/database.sqlite`
3. Migrations run automatically on deploy

### Benefits:
- ✓ No external database service needed
- ✓ Easy backups (single file)
- ✓ Perfect for small to medium apps
- ✓ Can migrate to PostgreSQL later if needed

---

## 🔄 Deployment Workflow

```
Local Changes → Git Push → Render Detects → Build → Deploy → Live!
     ↓              ↓           ↓            ↓        ↓        ↓
  Code edit    Commits    Auto-trigger   Assets   Health   Traffic
                                          built    checks   switched
```

**Automatic Deployments:**
Every push to `main` branch automatically deploys to Render!

---

## ⚙️ Environment Variables

Copy from `.env.render` to Render dashboard:

**Critical:**
- `APP_KEY` - Your Laravel encryption key
- `APP_URL` - Your Render URL (update after first deploy)
- `APP_DEBUG` - Must be `false` in production
- `DB_DATABASE` - Must be `/var/data/database.sqlite`

**Optional:**
- Mail settings (for notifications)
- Any API keys your app uses

---

## 🐛 Troubleshooting

### Build Fails
1. Check Render logs for specific error
2. Verify `composer.json` and `package.json` are valid
3. Ensure `render-build.sh` has no syntax errors

### App Won't Start
1. Check logs for PHP errors
2. Verify `APP_KEY` is set
3. Ensure persistent disk is mounted
4. Run migrations via Shell tab

### Assets Not Loading
1. Confirm `npm run build` completed (check logs)
2. Verify `APP_URL` is correct
3. Clear browser cache

**See RENDER_DEPLOYMENT_GUIDE.md for detailed troubleshooting.**

---

## 💰 Cost

### Free Tier
- **Cost:** $0/month
- **Perfect for:** Testing, demos, low-traffic apps
- **Limitation:** Sleeps after 15 minutes of inactivity

### Starter Plan
- **Cost:** $7/month
- **Perfect for:** Production apps
- **Benefits:** Always on, faster, no sleeping

**Recommendation:** Start with free tier, upgrade when you have consistent traffic.

---

## 🔒 Security Checklist

Before going live:

- [ ] `APP_DEBUG=false`
- [ ] `APP_ENV=production`
- [ ] Strong `APP_KEY` set
- [ ] HTTPS enabled (automatic on Render)
- [ ] Database backed up
- [ ] Test authentication thoroughly

---

## 📈 After Deployment

### Immediate Tasks:
1. ✓ Test all features
2. ✓ Register test account
3. ✓ Verify email works (if configured)
4. ✓ Check logs for errors
5. ✓ Update `APP_URL` environment variable

### Ongoing:
1. Monitor logs regularly
2. Set up automated backups
3. Update dependencies monthly
4. Scale as traffic grows

---

## 🆙 Updating Your Live App

### Simple Updates (Code Only):
```bash
git add .
git commit -m "Update feature"
git push origin main
```
Render auto-deploys! ✨

### With Database Changes:
Migrations run automatically - just push your code.

### With New Dependencies:
Add to `composer.json` or `package.json`, then push.

---

## 📊 Monitoring

### View Logs:
- Go to Render dashboard
- Select your service
- Click "Logs" tab

### Set Up Alerts:
- Settings → Notifications
- Add email or Slack
- Get notified of issues

---

## 🌐 Custom Domain

Want to use your own domain?

1. Go to Render Settings → Custom Domains
2. Add your domain
3. Update DNS at your registrar
4. Update `APP_URL` environment variable
5. Free SSL included! 🔒

**See RENDER_DEPLOYMENT_GUIDE.md for details.**

---

## 🎓 Learning Resources

### Render:
- Docs: https://render.com/docs
- Community: https://community.render.com
- Status: https://status.render.com

### Laravel:
- Docs: https://laravel.com/docs
- Laracasts: https://laracasts.com

### Deployment Best Practices:
- Laravel Deployment: https://laravel.com/docs/deployment
- Twelve-Factor App: https://12factor.net

---

## 🆘 Need Help?

1. **Check docs:**
   - [DEPLOYMENT_QUICKSTART.md](DEPLOYMENT_QUICKSTART.md)
   - [RENDER_DEPLOYMENT_GUIDE.md](RENDER_DEPLOYMENT_GUIDE.md)

2. **Check logs:**
   - Render dashboard → Logs tab
   - Look for error messages

3. **Try Shell:**
   - Render dashboard → Shell tab
   - Run Laravel commands directly

4. **Get support:**
   - Render: support@render.com
   - Laravel: laravel.com/support

---

## 🎯 Next Steps

After successful deployment:

1. [ ] Add custom domain (optional)
2. [ ] Set up monitoring
3. [ ] Configure backups
4. [ ] Optimize performance
5. [ ] Plan for scaling
6. [ ] Share with users! 🎉

---

## ✨ Success!

Congratulations on deploying your Laravel application! 🚀

You've built something awesome - now the world can use it.

**Remember:**
- Monitor your logs
- Backup regularly
- Update dependencies
- Scale when needed
- Keep building! 💪

---

**Questions?** Check the detailed guide: [RENDER_DEPLOYMENT_GUIDE.md](RENDER_DEPLOYMENT_GUIDE.md)

**Ready to deploy?** Start here: [DEPLOYMENT_QUICKSTART.md](DEPLOYMENT_QUICKSTART.md)

---

*Last updated: January 2025*
*Built with ❤️ using Laravel + Inertia.js + React*
