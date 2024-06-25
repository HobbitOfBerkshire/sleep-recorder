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
    timestamp INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );
`);

console.log('Database initialized.');

// Day timestamps (ugly but test data)
const oneDayAgoTimestamp = Math.floor(
  (Date.now() - 24 * 60 * 60 * 1000) / 1000,
);
const twoDayAgoTimestamp = Math.floor(
  (Date.now() - 24 * 2 * 60 * 60 * 1000) / 1000,
);
const threeDayAgoTimestamp = Math.floor(
  (Date.now() - 24 * 3 * 60 * 60 * 1000) / 1000,
);
const fourDayAgoTimestamp = Math.floor(
  (Date.now() - 24 * 4 * 60 * 60 * 1000) / 1000,
);
const fiveDayAgoTimestamp = Math.floor(
  (Date.now() - 24 * 5 * 60 * 60 * 1000) / 1000,
);
const sixDayAgoTimestamp = Math.floor(
  (Date.now() - 24 * 6 * 60 * 60 * 1000) / 1000,
);
const sevenDayAgoTimestamp = Math.floor(
  (Date.now() - 24 * 7 * 60 * 60 * 1000) / 1000,
);
const eightDayAgoTimestamp = Math.floor(
  (Date.now() - 24 * 8 * 60 * 60 * 1000) / 1000,
);

const currentTimestamp = Math.floor(Date.now() / 1000);

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
  INSERT INTO records (user_id, duration, timestamp) VALUES (${kieranId}, 4, ${currentTimestamp});
`);
db.exec(`
  INSERT INTO records (user_id, duration, timestamp) VALUES (${kieranId}, 4, ${oneDayAgoTimestamp});
`);
db.exec(`
  INSERT INTO records (user_id, duration, timestamp) VALUES (${kieranId}, 4, ${twoDayAgoTimestamp});
`);
db.exec(`
  INSERT INTO records (user_id, duration, timestamp) VALUES (${kieranId}, 4, ${threeDayAgoTimestamp});
`);
db.exec(`
  INSERT INTO records (user_id, duration, timestamp) VALUES (${kieranId}, 4, ${fourDayAgoTimestamp});
`);
db.exec(`
  INSERT INTO records (user_id, duration, timestamp) VALUES (${kieranId}, 4, ${fiveDayAgoTimestamp});
`);
db.exec(`
  INSERT INTO records (user_id, duration, timestamp) VALUES (${kieranId}, 4, ${sixDayAgoTimestamp});
`);
db.exec(`
  INSERT INTO records (user_id, duration, timestamp) VALUES (${kieranId}, 4, ${sevenDayAgoTimestamp});
`);
db.exec(`
  INSERT INTO records (user_id, duration, timestamp) VALUES (${kieranId}, 4, ${eightDayAgoTimestamp});
`);

// BARRY RECORDS

db.exec(`
  INSERT INTO records (user_id, duration, timestamp) VALUES (${barryId}, 1, ${currentTimestamp});
`);
db.exec(`
  INSERT INTO records (user_id, duration, timestamp) VALUES (${barryId}, 2, ${oneDayAgoTimestamp});
`);
db.exec(`
  INSERT INTO records (user_id, duration, timestamp) VALUES (${barryId}, 3, ${twoDayAgoTimestamp});
`);
db.exec(`
  INSERT INTO records (user_id, duration, timestamp) VALUES (${barryId}, 4, ${threeDayAgoTimestamp});
`);
db.exec(`
  INSERT INTO records (user_id, duration, timestamp) VALUES (${barryId}, 5, ${fourDayAgoTimestamp});
`);
db.exec(`
  INSERT INTO records (user_id, duration, timestamp) VALUES (${barryId}, 6, ${fiveDayAgoTimestamp});
`);
db.exec(`
  INSERT INTO records (user_id, duration, timestamp) VALUES (${barryId}, 7, ${sixDayAgoTimestamp});
`);
db.exec(`
  INSERT INTO records (user_id, duration, timestamp) VALUES (${barryId}, 8, ${sevenDayAgoTimestamp});
`);

console.log('Populated Data');
