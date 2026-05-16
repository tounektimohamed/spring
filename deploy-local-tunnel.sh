#!/bin/bash
# Self-host backend + Cloudflare Tunnel (100% free, no credit card)
# Prerequisites: cloudflared installed

set -e

# Install cloudflared if missing
if ! which cloudflared &>/dev/null; then
  echo "Installing cloudflared..."
  curl -fsSL https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64 -o /tmp/cloudflared
  chmod +x /tmp/cloudflared
  sudo mv /tmp/cloudflared /usr/local/bin/cloudflared
fi

# Generate JWT secret
JWT_SECRET="$(openssl rand -base64 32)"

# Start backend
echo "Starting SpringPath backend on port 8080..."
JWT_SECRET="$JWT_SECRET" \
DB_URL="jdbc:postgresql://localhost:5432/springpath" \
DB_USER="springpath" \
DB_PASSWORD="springpath" \
SPRING_PROFILES_ACTIVE="prod" \
JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64 \
mvn spring-boot:run -f /home/tounekti/springlearn/backend/pom.xml &

echo ""
echo "========================================="
echo " SpringPath Backend started on :8080"
echo ""
echo " To expose publicly (free):"
echo "   cloudflared tunnel --url http://localhost:8080"
echo ""
echo " It will give you a URL like:"
echo "   https://springpath-xxx.trycloudflare.com"
echo "========================================="
