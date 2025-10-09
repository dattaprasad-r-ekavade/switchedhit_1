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

# Ensure database directory is writable
chmod 775 /var/data
chown -R www-data:www-data /var/data 2>/dev/null || true

# Setup storage directories with proper permissions
echo "📁 Setting up storage directories..."
mkdir -p storage/framework/{sessions,views,cache}
mkdir -p storage/logs
chmod -R 775 storage bootstrap/cache
chown -R www-data:www-data storage bootstrap/cache 2>/dev/null || true

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
