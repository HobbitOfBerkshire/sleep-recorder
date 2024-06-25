import db from './index';
import { Record } from '../types';
import { createUser, getUserByNameAndGender } from './userService';
import { format, parseISO, startOfDay } from 'date-fns';

export const getAllRecords = (): Record[] => {
  const records = db
    .prepare(
      `
      SELECT records.id, records.duration, records.date, users.name, users.gender
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
  const formattedDate = format(startOfDay(parseISO(date)), 'yyyy-MM-dd');

  let user = getUserByNameAndGender(name, gender);
  if (!user) {
    user = createUser(name, gender);
  }

  db.prepare(
    'INSERT INTO records (user_id, duration, date) VALUES (?, ?, ?)',
  ).run(user.id, duration, formattedDate);
};
