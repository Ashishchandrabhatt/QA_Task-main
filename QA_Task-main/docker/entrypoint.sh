#!/bin/bash
set -e

touch /app/database/database.sqlite

php artisan migrate --seed --force 2>/dev/null || true

exec /usr/bin/supervisord -c /etc/supervisor/conf.d/supervisord.conf
