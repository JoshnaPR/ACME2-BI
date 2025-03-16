#!/bin/bash

# Start PM2 and restore processes if not already running
pm2 resurrect

# Restart the backend process
pm2 restart backend

# Restart Nginx to apply changes
sudo systemctl restart nginx

echo "Backend and Nginx restarted successfully."
