#!/bin/bash
set -e

# Create database if it doesn't exist
if [ ! -f /var/data/database.sqlite ]; then
    touch /var/data/database.sqlite
    chmod 664 /var/data/database.sqlite
    echo "✓ Database file created"
fi

# Update database path in .env if DATABASE_URL is set (Render.com)
if [ -n "$DATABASE_URL" ]; then
    echo "DB_CONNECTION=sqlite" >> .env
    echo "DB_DATABASE=/var/data/database.sqlite" >> .env
fi

# Run migrations
php artisan migrate --force

# Cache configuration
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Start Apache
apache2-foreground
