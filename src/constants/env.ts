import * as dotenv from 'dotenv';
dotenv.config();

if (typeof process.env.STUDENT_TABLE_NAME === 'undefined') {
  throw new Error('Invalid STUDENT_TABLE_NAME in .env');
}
if (typeof process.env.VEHICLE_TABLE_NAME === 'undefined') {
  throw new Error('Invalid VEHICLE_TABLE_NAME in .env');
}

export const STUDENT_TABLE_NAME = process.env.STUDENT_TABLE_NAME;
export const VEHICLE_TABLE_NAME = process.env.VEHICLE_TABLE_NAME;
