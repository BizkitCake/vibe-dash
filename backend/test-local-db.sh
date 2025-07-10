#!/bin/bash

echo "🔍 Testing database connection with different hosts..."

# Test with localhost
echo "Testing with localhost..."
DB_HOST=localhost pnpm exec ts-node src/test-connection.ts

# If localhost fails, try 127.0.0.1
if [ $? -ne 0 ]; then
    echo "Testing with 127.0.0.1..."
    DB_HOST=127.0.0.1 pnpm exec ts-node src/test-connection.ts
fi

# If that fails, try with the user's current host
if [ $? -ne 0 ]; then
    echo "Testing with current hostname..."
    DB_HOST=$(hostname) pnpm exec ts-node src/test-connection.ts
fi