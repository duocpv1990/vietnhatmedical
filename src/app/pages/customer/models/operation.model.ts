export class OperationModel {
  OperationId: number;
  OperationScheduleID: number;
  CustomerId: number;
  SurgeryServiceId: number;
  SurgeryServiceName: string;
  SurgerySubServiceId: number;
  SurgerySubServiceName: string;
  Type: number;
  Status: number;
  Priority: number;
  OperationDate: string;
  Reason: string;
  Notes: string;
  ContractId: number;
  AdmissionDate: string;
  DischargeDate: string;
  MainProviderIdList: Array<any>;
  AssistantProviderIdList: Array<any>;
  ExaminateDoctorIdList: Array<any>;
  MainNurseIdList: Array<any>;
  AssistantNurseIdList: Array<any>;
  CompletedTimeString: string;
  CompletedDate: string;
  Rating: number;
}
