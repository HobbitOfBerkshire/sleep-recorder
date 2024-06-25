import db from './index';

export const addUser = (name: string, gender: string): void => {
  const statement = db.prepare(
    'INSERT INTO users (name, gender) VALUES (?, ?)',
  );
  statement.run(name, gender);
};

export const getUserByNameAndGender = (
  name: string,
  gender: string,
): { id: number } | undefined => {
  return db
    .prepare('SELECT id FROM users WHERE LOWER(name) = LOWER(?) AND gender = ?')
    .get(name, gender) as { id: number } | undefined;
};

export const createUser = (name: string, gender: string): { id: number } => {
  const result = db
    .prepare('INSERT INTO users (name, gender) VALUES (?, ?)')
    .run(name, gender);
  return { id: result.lastInsertRowid } as { id: number };
};
