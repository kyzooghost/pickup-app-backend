import { VehicleTableEntry } from '../types';
import { NUMBER_OF_STUDENTS, MAXIMUM_VEHICLE_CAPACITY } from '../constants';
import { isVehicleRegistration } from '.';

export const validateVehicleData = function validateVehicleData(vehicle: VehicleTableEntry) {
  if (isVehicleRegistration(vehicle.registration) == false)
    throw new Error(`registration field for vehicle is invalid`);

  if (vehicle.capacity > MAXIMUM_VEHICLE_CAPACITY) throw new Error('vehicle capacity exceeds maximum allowed');

  const student_set = new Set();

  for (const student_id of vehicle.associated_students) {
    if (student_id >= NUMBER_OF_STUDENTS) throw new Error(`associated_students field contains invalid student_id`);
    student_set.add(student_id);
  }

  if (Array.from(student_set).length !== vehicle.associated_students.length) {
    throw new Error('associated_students field contains a duplicate entry');
  }
};
