#!/bin/bash
# Check if npm is in path, if not try to find it or exit with error
if ! command -v npm &> /dev/null; then
    echo "npm could not be found. Please ensure Node.js is installed in your environment."
    exit 1
fi

cd FutureWeb
npm install
npm run build
npm start
