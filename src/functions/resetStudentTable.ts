import AWS from 'aws-sdk';
const dynamodb = new AWS.DynamoDB({ region: 'ap-southeast-2' });
import { StudentTableEntry, StudentTablePutRequest } from '../types';
import classList from '../constants/classList.json';
import { STUDENT_TABLE_NAME, DYNAMODB_RETRY_ATTEMPTS, DYNAMODB_RETRY_WAIT_TIME } from '../constants';
import { sleep, validateStudentData } from '../utils';

// Reset (can also initialise) student database
export const resetStudentTable = async function resetStudentTable() {
  const class_list: StudentTableEntry[] = classList;

  const all_put_requests: StudentTablePutRequest[] = class_list.map((student) => {
    validateStudentData(student);

    return {
      PutRequest: {
        Item: {
          student_id: { N: student.student_id.toString() },
          class_id: { N: student.class_id.toString() },
          name: { S: student.name },
          pick_up_vehicle: { S: student.pick_up_vehicle },
          has_left_class: { BOOL: student.has_left_class === 'true' },
        },
      },
    };
  });

  let current_put_requests = all_put_requests;

  let batch_write_request = {
    RequestItems: {
      [STUDENT_TABLE_NAME]: current_put_requests,
    },
  };

  // DynamoDB Batch Write has limit of 25 entries for a single operation
  // If it fails, it will return the failed entries in the 'UnprocessedItems' field
  // We implement logic to retry DYNAMODB_RETRY_ATTEMPTS in case of failure, with DYNAMODB_RETRY_WAIT_TIME between each retry attempt
  // For a larger scale service, we would use an exponential backoff algorithm for retry logic
  for (let i = 0; i < DYNAMODB_RETRY_ATTEMPTS; i++) {
    try {
      const resp = await dynamodb.batchWriteItem(batch_write_request).promise();
      current_put_requests =
        (resp?.UnprocessedItems?.STUDENT_TABLE_NAME as StudentTablePutRequest[]) || ([] as StudentTablePutRequest[]);
    } catch (e) {
      console.error(e);
      console.log(`error currentBatch: ${JSON.stringify(current_put_requests)}`);
      batch_write_request = {
        RequestItems: {
          [STUDENT_TABLE_NAME]: current_put_requests,
        },
      };
      await sleep(DYNAMODB_RETRY_WAIT_TIME);
    }
  }
};
