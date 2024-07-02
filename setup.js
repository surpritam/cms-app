const pool = require('./db');
const fs = require('fs');
const path = require('path');

async function runSQLFile(filePath) {
    const sql = fs.readFileSync(path.join(__dirname, filePath), 'utf8');
    await pool.query(sql);
}

async function setupDatabase() {
    try {
        await runSQLFile('schema.sql');
        await runSQLFile('seeds.sql');
        console.log('Database setup complete');
    } catch (error) {
        console.error('Error setting up database:', error);
    } finally {
        pool.end();
    }
}

setupDatabase();