import { StudentTableEntry } from '../types';
import { NUMBER_OF_STUDENTS } from '../constants';
import { isVehicleRegistration } from './';

export const validateStudentData = function validateStudentData(student: StudentTableEntry) {
  if (student.student_id >= NUMBER_OF_STUDENTS)
    throw new Error(`student_id field for ${student.name} >= ${NUMBER_OF_STUDENTS}`);

  if (isVehicleRegistration(student.pick_up_vehicle) == false && student.pick_up_vehicle !== '')
    throw new Error(`pick_up_vehicle field for ${student.name} is invalid`);

  if (student.class_id !== 1 && student.class_id !== 2)
    throw new Error(`class_id field for ${student.name} is not 1 or 2`);

  if (student.has_left_class !== 'true' && student.has_left_class !== 'false')
    throw new Error(`has_left_class field for ${student.name} is not 'true' or 'false'`);
};
