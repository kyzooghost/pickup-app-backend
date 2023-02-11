import AWS from 'aws-sdk';
const dynamodb = new AWS.DynamoDB({ region: 'ap-southeast-2' });
import { STUDENT_TABLE_NAME } from '../constants';
import { StudentTableEntry } from '../types';
import { validateStudentData } from '../utils';

// Set or update single entry in student database
export const setStudentData = async function setStudentData(entry: StudentTableEntry) {
  validateStudentData(entry);

  const request = {
    TableName: STUDENT_TABLE_NAME,
    Item: {
      student_id: { N: entry.student_id.toString() },
      class_id: { N: entry.class_id.toString() },
      name: { S: entry.name },
      pick_up_vehicle: { S: entry.pick_up_vehicle },
      has_left_class: { BOOL: entry.has_left_class === 'true' },
    },
  };

  try {
    return await dynamodb.putItem(request).promise();
  } catch (e) {
    console.error(e);
  }
};
