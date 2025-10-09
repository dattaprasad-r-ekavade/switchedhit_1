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
