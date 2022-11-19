#!/usr/bin/env node

const path = require('path');
const { execFileSync } = require('child_process');

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
try {
    execFileSync(binaryPath, process.argv.slice(2), {
        stdio: 'inherit',
    });
} catch (_ex) {
    process.exit(1);
}
