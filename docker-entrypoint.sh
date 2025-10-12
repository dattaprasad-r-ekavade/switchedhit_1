#!/bin/bash
set -e

# Ensure database directory exists with correct permissions
mkdir -p /var/data
chmod 777 /var/data
chown -R www-data:www-data /var/data

# Create database if it doesn't exist
if [ ! -f /var/data/database.sqlite ]; then
    touch /var/data/database.sqlite
    chmod 666 /var/data/database.sqlite
    chown www-data:www-data /var/data/database.sqlite
    echo "✓ Database file created"
else
    # Ensure existing database has correct permissions
    chmod 666 /var/data/database.sqlite
    chown www-data:www-data /var/data/database.sqlite
    echo "✓ Database file permissions updated"
fi

# Update database path in .env if DATABASE_URL is set (Render.com)
if [ -n "$DATABASE_URL" ]; then
    sed -i '/^DB_CONNECTION=/d' .env
    sed -i '/^DB_DATABASE=/d' .env
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
