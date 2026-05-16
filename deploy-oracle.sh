#!/bin/bash
# Deploy SpringPath backend on Oracle Cloud Always Free (4 cores, 24GB RAM)
# Usage: bash deploy-oracle.sh

set -e

echo "=== SpringPath Oracle Cloud Deployment ==="
echo ""
echo "1. Go to https://www.oracle.com/cloud/free/"
echo "2. Sign up for Always Free Tier (need credit card for verification only - NO charge)"
echo "3. Create an Ampere A1 instance (4 OCPU, 24GB RAM) with Ubuntu 22.04"
echo "4. SSH into your VM and run:"
echo ""
cat << 'SCRIPT'
# On your Oracle VM, run these commands:
sudo apt-get update && sudo apt-get install -y openjdk-21-jdk postgresql nginx git

# Clone the repo
git clone https://github.com/tounektimohamed/spring.git
cd spring/backend

# Set env vars
export DB_URL="jdbc:postgresql://localhost:5432/springpath"
export DB_USER="springpath"
export DB_PASSWORD="springpath"
export JWT_SECRET="$(openssl rand -base64 32)"
export SPRING_PROFILES_ACTIVE="prod"

# Setup PostgreSQL
sudo -u postgres psql -c "CREATE USER springpath WITH PASSWORD 'springpath';"
sudo -u postgres psql -c "CREATE DATABASE springpath OWNER springpath;"

# Build and run
./mvnw spring-boot:run -Dspring-boot.run.profiles=prod &

# Setup Nginx reverse proxy
sudo tee /etc/nginx/sites-available/springpath << NGINX
server {
    listen 80;
    server_name _;
    location / {
        proxy_pass http://localhost:8080;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
    }
}
NGINX
sudo ln -sf /etc/nginx/sites-available/springpath /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl restart nginx
SCRIPT
echo ""
echo "Your API will be available at: http://<VM_PUBLIC_IP>"
echo "Check your VM's public IP in Oracle Cloud dashboard"
