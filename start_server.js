#!/usr/bin/env node

console.log('Starting DystopAI Story Server...\n');
console.log('Checking for http-server...\n');

const { exec } = require('child_process');

// Try to run http-server
exec('npx http-server -p 8000', (error, stdout, stderr) => {
    if (error) {
        console.error('Error starting server:', error);
        return;
    }
    console.log(stdout);
});

console.log('Server starting on http://localhost:8000');
console.log('Press Ctrl+C to stop the server.\n');