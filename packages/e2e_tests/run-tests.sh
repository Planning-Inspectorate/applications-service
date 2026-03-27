#!/bin/bash

npx cypress verify

if [ $# -eq 0 ]; then
    echo "No parameters provided"
    exit 1
fi

# Last argument is environment
environment="${@: -1}"

# All arguments except last are test files (if more than one arg)
if [ $# -eq 1 ]; then
    # Only environment provided, run all tests
    echo "Running the e2e-test in $environment environment"
    if [ "$environment" = "dev" ]; then
        npm run cy:dev
    else
        npm run cy:run
    fi
else
    # Test files provided
    test_files="${@:1:$#-1}"
    echo "Running e2e tests in $environment environment"
    echo "Test files: $test_files"
    
    # Build spec pattern
    spec_pattern="cypress/e2e/$(echo $test_files | sed 's/ /,cypress\/e2e\//g')"
    
    if [ "$environment" = "dev" ]; then
        npx cypress run --config baseUrl=https://applications-service-dev.planninginspectorate.gov.uk --spec "$spec_pattern"
    else
        npx cypress run --config baseUrl=https://applications-service-test.planninginspectorate.gov.uk --spec "$spec_pattern" --env allure=true
    fi
fi
