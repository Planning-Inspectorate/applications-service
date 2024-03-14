#!/bin/bash

npx cypress verify

if [ $# -eq 0 ]; then
    echo "No parameters provided"
    exit 1
fi

echo "Running the e2e-test in $1 environment"

if [ "$1" = "dev" ]; then
    npm run cy:dev
else
    npm run cy:run
fi
