export class CustomerContractModel {
   public CustomerId : number;
   public ContractId  : number;
   public ContractCode: string;
   public ContractContent: string;
   // public CustomerFullName : string;
   // public CustomerFullNameAndId : string;
   public EmployeeId : number;
   // public EmployeeFullName : string;
   // public EmployeeFullNameAndId : string;
   public SurgeryServiceId : number;
   // public SurgeryServiceName : string;
   public SurgerySubServiceId : number;
   // public SurgerySubServiceName : string;
   public Amount : number;
   public ContractImageURL : string;
   public SignedDate : string;
   public Type : number;   
   public Status : number;
   public PotentialLevelId: number; // id tiềm năng
   public SubServiceIdLst: Array<any>; // dịch vụ con
}