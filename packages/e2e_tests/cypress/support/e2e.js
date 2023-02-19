/// <reference types="@shelex/cypress-allure-plugin" />
// Import commands.js using ES2015 syntax:

import './commands';
import '@shelex/cypress-allure-plugin';
import { slowCypressDown } from 'cypress-slow-down';
slowCypressDown(); // slows down each command by 500ms

// Alternatively you can use CommonJS syntax:
// require('./commands')
require('@shelex/cypress-allure-plugin');
