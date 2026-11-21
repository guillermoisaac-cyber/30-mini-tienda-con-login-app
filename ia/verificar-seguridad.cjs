const fs = require('node:fs');
const { execFileSync } = require('node:child_process');
const files = execFileSync('git', ['ls-files', '--cached', '-z'], { cwd: process.cwd() }).toString().split('\0').filter(Boolean);
const bad = files.filter(f => /(^|\/)\.env($|\.)|\.(pem|p12|p8|jks|keystore)$|google-services\.json|GoogleService-Info\.plist/i.test(f) && !f.endsWith('.env.example'));
for (const f of files.filter(f => /\.(tsx?|jsx?)$/.test(f) && fs.existsSync(f) && !f.startsWith('ia/'))) {
  if (/FIREBASE_PRIVATE_KEY|FIREBASE_WEB_API_KEY|BLOB_READ_WRITE_TOKEN|firebaseConfig/.test(fs.readFileSync(f,'utf8'))) bad.push(f);
}
if (bad.length) { console.error('Contenido prohibido:', bad); process.exit(1); }
console.log('PASS: sin credenciales ni firebaseConfig en la app');
