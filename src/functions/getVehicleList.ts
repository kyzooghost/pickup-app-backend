import AWS from 'aws-sdk';
const dynamodb = new AWS.DynamoDB({ region: 'ap-southeast-2' });
import { VEHICLE_TABLE_NAME } from '../constants';

// Get all vehicle data
export const getVehicleList = async function getVehicleList() {
  const scan_request = {
    TableName: VEHICLE_TABLE_NAME,
  };

  try {
    const resp = await dynamodb.scan(scan_request).promise();
    return resp?.Items;
  } catch (e) {
    console.error(e);
  }
};
