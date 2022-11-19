#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function resolveBinaryName() {
    switch (process.platform) {
        case 'win32':
            return 'x86_64-pc-windows-msvc/infisearch.exe';
        case 'darwin':
            return 'x86_64-apple-darwin/infisearch';
        case 'linux':
            return 'x86_64-unknown-linux-gnu/infisearch';
    }
}

const binaryPath = path.join(__dirname, 'binaries', resolveBinaryName());
if (!fs.existsSync(binaryPath)) {
    // Maybe antivirus removed it or similar
    console.error('ERROR: Could not find binary ' + binaryPath);
    process.exit(1);
}

try {
    if (['darwin', 'linux'].includes(process.platform)) {
        execSync(`chmod +x ${binaryPath}`, { stdio: 'inherit' });
    }

    const command = binaryPath + ' ' + process.argv.slice(2).join(' ');
    execSync(command, {
        env: { ...process.env },
        stdio: 'inherit',
    });
} catch (ex) {
    console.error('ERROR: Failed to run infisearch npm wrapper!\n' + ex);
    throw ex;
}
