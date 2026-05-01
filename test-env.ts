import * as fs from 'fs';
console.log(".env content:", fs.existsSync('.env') ? fs.readFileSync('.env', 'utf-8') : "MISSING");
console.log(".env.example content:", fs.existsSync('.env.example') ? fs.readFileSync('.env.example', 'utf-8') : "MISSING");
