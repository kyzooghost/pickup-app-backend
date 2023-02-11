import { APIGatewayEvent } from 'aws-lambda';
import { genericHandlerWrapper } from './utils';
import { VehicleTableEntry, StudentTableEntry } from './types';
import {
  setStudentData,
  setVehicleData,
  getVehicleList,
  getStudentList,
  resetStudentTable,
  deleteVehicle,
} from './functions';

export const resetStudentTableHandler = genericHandlerWrapper(resetStudentTable, 'resetStudentTable');
export const getVehicleListHandler = genericHandlerWrapper(getVehicleList, 'getVehicleList');
export const getStudentListHandler = genericHandlerWrapper(getStudentList, 'getStudentList');

export const setStudentDataHandler = async function setStudentDataHandler(event: APIGatewayEvent) {
  try {
    console.time('setStudentData');
    const student_entry: StudentTableEntry = {
      student_id: parseInt(event?.queryStringParameters?.student_id || ''),
      class_id: parseInt(event?.queryStringParameters?.class_id || ''),
      name: event?.queryStringParameters?.name || '',
      pick_up_vehicle: event?.queryStringParameters?.pick_up_vehicle || '',
      has_left_class: event?.queryStringParameters?.has_left_class || '',
    };

    const data = await setStudentData(student_entry);
    console.timeEnd('setStudentData');
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(data),
    };
  } catch (e) {
    console.error(e);
    return {
      statusCode: 400,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: 'setStudentDataHandler error',
    };
  }
};

export const setVehicleDataHandler = async function setVehicleDataHandler(event: APIGatewayEvent) {
  try {
    console.time('setVehicleData');
    const vehicle_entry: VehicleTableEntry = {
      registration: event?.queryStringParameters?.registration || '',
      capacity: parseInt(event?.queryStringParameters?.capacity || ''),
      associated_students: JSON.parse(event?.queryStringParameters?.associated_students || '[]') as number[],
    };
    const data = await setVehicleData(vehicle_entry);
    console.timeEnd('setVehicleData');
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(data),
    };
  } catch (e) {
    console.error(e);
    return {
      statusCode: 400,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: 'setVehicleDataHandler error',
    };
  }
};

export const deleteVehicleHandler = async function deleteVehicleHandler(event: APIGatewayEvent) {
  try {
    console.time('deleteVehicle');
    const data = await deleteVehicle(event?.queryStringParameters?.registration || '');
    console.timeEnd('deleteVehicle');
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(data),
    };
  } catch (e) {
    console.error(e);
    return {
      statusCode: 400,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: 'deleteVehicleHandler error',
    };
  }
};
