export type StudentTableEntry = {
  student_id: number;
  class_id: number;
  name: string;
  pick_up_vehicle: string;
  has_left_class: string;
};

export type StudentTablePutRequest = {
  PutRequest: {
    Item: {
      student_id: { [keyType: string]: string };
      class_id: { [keyType: string]: string };
      name: { [keyType: string]: string };
      pick_up_vehicle: { [keyType: string]: string };
      has_left_class: { [keyType: string]: boolean };
    };
  };
};

export type VehicleTableEntry = {
  registration: string;
  capacity: number;
  associated_students: number[];
};

export type VehicleTablePutRequest = {
  PutRequest: {
    Item: {
      registration: { [keyType: string]: string };
      capacity: { [keyType: string]: number };
      associated_students: { [keyType: string]: number[] };
    };
  };
};
