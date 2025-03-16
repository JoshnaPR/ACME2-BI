#!/bin/bash

# Navigate to the frontend directory
cd "/root/ACME2-BI/Inventory Management System/frontend"

# Rebuild the frontend
npm run build

# Copy the new build to the nginx served folder
sudo cp -r build/* /var/www/frontend/

# Restart the frontend process using pm2
pm2 restart frontend

# Restart the backend process using pm2 (if needed)
pm2 restart backend

# Restart nginx to make sure it's serving the latest build
sudo systemctl restart nginx
