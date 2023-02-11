import AWS from 'aws-sdk';
const dynamodb = new AWS.DynamoDB({ region: 'ap-southeast-2' });
import { VEHICLE_TABLE_NAME } from '../constants';
import { VehicleTableEntry } from '../types';
import { validateVehicleData } from '../utils';

// Set or update single entry in vehicle database
export const setVehicleData = async function setVehicleData(entry: VehicleTableEntry) {
  validateVehicleData(entry);

  const request = {
    TableName: VEHICLE_TABLE_NAME,
    Item: {
      registration: { S: entry.registration },
      capacity: { N: entry.capacity.toString() },
      // DynamoDB does not allow us to enter an empty array with the 'Number Set' attribute type.
      associated_students: {
        NS:
          entry.associated_students.length === 0
            ? ['-1']
            : entry.associated_students.map((student_id) => student_id.toString()),
      },
    },
  };

  try {
    return await dynamodb.putItem(request).promise();
  } catch (e) {
    console.error(e);
  }
};
