import Database from 'better-sqlite3';

const db = new Database('database.sqlite');

console.log('Dropping tables');

db.exec(`
    DROP TABLE IF EXISTS records;
    DROP TABLE IF EXISTS users;
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    gender TEXT
  );
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS records (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    duration REAL,
    date TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );
`);

console.log('Database initialized.');

const formatDate = (date: Date) => date.toISOString().split('T')[0];

// DATES

const oneDayAgo = formatDate(new Date(Date.now() - 24 * 60 * 60 * 1000));
const twoDaysAgo = formatDate(new Date(Date.now() - 24 * 2 * 60 * 60 * 1000));
const threeDaysAgo = formatDate(new Date(Date.now() - 24 * 3 * 60 * 60 * 1000));
const fourDaysAgo = formatDate(new Date(Date.now() - 24 * 4 * 60 * 60 * 1000));
const fiveDaysAgo = formatDate(new Date(Date.now() - 24 * 5 * 60 * 60 * 1000));
const sixDaysAgo = formatDate(new Date(Date.now() - 24 * 6 * 60 * 60 * 1000));
const sevenDaysAgo = formatDate(new Date(Date.now() - 24 * 7 * 60 * 60 * 1000));
const eightDaysAgo = formatDate(new Date(Date.now() - 24 * 8 * 60 * 60 * 1000));
const today = formatDate(new Date());

// USERS

db.exec(`
  INSERT INTO users (name, gender) VALUES ('Kieran', 'Male');
`);
db.exec(`
  INSERT INTO users (name, gender) VALUES ('Barry', 'Male');
`);

const kieranIdRow = db
  .prepare('SELECT id FROM users WHERE name = ?')
  .get('Kieran');
const barryIdRow = db
  .prepare('SELECT id FROM users WHERE name = ?')
  .get('Barry');

const kieranId = (kieranIdRow as { id: number }).id;
const barryId = (barryIdRow as { id: number }).id;

// KIERAN RECORDS

db.exec(`
  INSERT INTO records (user_id, duration, date) VALUES (${kieranId}, 4, '${today}');
`);
db.exec(`
  INSERT INTO records (user_id, duration, date) VALUES (${kieranId}, 4, '${oneDayAgo}');
`);
db.exec(`
  INSERT INTO records (user_id, duration, date) VALUES (${kieranId}, 4, '${twoDaysAgo}');
`);
db.exec(`
  INSERT INTO records (user_id, duration, date) VALUES (${kieranId}, 4, '${threeDaysAgo}');
`);
db.exec(`
  INSERT INTO records (user_id, duration, date) VALUES (${kieranId}, 4, '${fourDaysAgo}');
`);
db.exec(`
  INSERT INTO records (user_id, duration, date) VALUES (${kieranId}, 4, '${fiveDaysAgo}');
`);
db.exec(`
  INSERT INTO records (user_id, duration, date) VALUES (${kieranId}, 4, '${sixDaysAgo}');
`);
db.exec(`
  INSERT INTO records (user_id, duration, date) VALUES (${kieranId}, 4, '${sevenDaysAgo}');
`);
db.exec(`
  INSERT INTO records (user_id, duration, date) VALUES (${kieranId}, 4, '${eightDaysAgo}');
`);

// BARRY RECORDS

db.exec(`
  INSERT INTO records (user_id, duration, date) VALUES (${barryId}, 1, '${today}');
`);
db.exec(`
  INSERT INTO records (user_id, duration, date) VALUES (${barryId}, 2, '${oneDayAgo}');
`);
db.exec(`
  INSERT INTO records (user_id, duration, date) VALUES (${barryId}, 3, '${twoDaysAgo}');
`);
db.exec(`
  INSERT INTO records (user_id, duration, date) VALUES (${barryId}, 4, '${threeDaysAgo}');
`);
db.exec(`
  INSERT INTO records (user_id, duration, date) VALUES (${barryId}, 5, '${fourDaysAgo}');
`);
db.exec(`
  INSERT INTO records (user_id, duration, date) VALUES (${barryId}, 6, '${fiveDaysAgo}');
`);
db.exec(`
  INSERT INTO records (user_id, duration, date) VALUES (${barryId}, 7, '${sixDaysAgo}');
`);
db.exec(`
  INSERT INTO records (user_id, duration, date) VALUES (${barryId}, 8, '${sevenDaysAgo}');
`);

console.log('Populated Data');
