import AWS from 'aws-sdk';
const dynamodb = new AWS.DynamoDB({ region: 'ap-southeast-2' });
import { VEHICLE_TABLE_NAME } from '../constants';

// Delete vehicle from database
export const deleteVehicle = async function deleteVehicle(registration: string) {
  const delete_request = {
    TableName: VEHICLE_TABLE_NAME,
    Key: {
      registration: { S: registration },
    },
  };

  try {
    return await dynamodb.deleteItem(delete_request).promise();
  } catch (e) {
    console.error(e);
  }
};
