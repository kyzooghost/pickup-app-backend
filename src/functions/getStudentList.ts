import AWS from 'aws-sdk';
const dynamodb = new AWS.DynamoDB({ region: 'ap-southeast-2' });
import { STUDENT_TABLE_NAME } from '../constants';

// Get all student data
export const getStudentList = async function getStudentList() {
  const scan_request = {
    TableName: STUDENT_TABLE_NAME,
  };

  try {
    const resp = await dynamodb.scan(scan_request).promise();
    return resp?.Items;
  } catch (e) {
    console.error(e);
  }
};
