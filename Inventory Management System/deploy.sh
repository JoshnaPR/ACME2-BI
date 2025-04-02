#!/bin/bash
cd "/root/ACME2-BI/Inventory Management System/frontend" || exit

# Build the frontend
npm run build

# Remove old frontend files
sudo rm -rf /var/www/frontend/

# Copy new build to the correct location
sudo cp -r "/root/ACME2-BI/Inventory Management System/frontend/build" /var/www/frontend/

# Set correct permissions
sudo chown -R www-data:www-data /var/www/frontend
sudo chmod -R 755 /var/www/frontend

# Restart backend and Nginx
pm2 restart backend
sudo systemctl restart nginx
