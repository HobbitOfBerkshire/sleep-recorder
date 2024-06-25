import db from './index';
import { Record } from '../types';
import { createUser, getUserByNameAndGender } from './userService';
import { parseISO, startOfDay } from 'date-fns';

export const getAllRecords = (): Record[] => {
  const records = db
    .prepare(
      `
      SELECT records.id, records.duration, records.timestamp, users.name, users.gender
      FROM records
      JOIN users ON records.user_id = users.id
    `,
    )
    .all();

  return records as Record[];
};

export const addRecord = (
  name: string,
  gender: string,
  duration: number,
  date: string,
): void => {
  const dateTimestamp = Math.floor(startOfDay(parseISO(date)).getTime() / 1000);

  let user = getUserByNameAndGender(name, gender);
  if (!user) {
    user = createUser(name, gender);
  }

  db.prepare(
    'INSERT INTO records (user_id, duration, timestamp) VALUES (?, ?, ?)',
  ).run(user.id, duration, dateTimestamp);
};
