export class ScheduleModel {
    public ScheduleId: number;
    public CustomerID: number;
    public ScheduleDateTime: string;
    public OperationId: number;
    public Notes: string;
    public IsSos: boolean;
    public MainProviderIdList: Array<any>;
    public AssistantProviderIdList:  Array<any>;
    public ExaminateDoctorIdList : Array<any>;
    public MainNurseIdList :  Array<any>;
    public AssistantNurseIdList : Array<any>;
    public TypeDescription: string;
    public CustomerFullnameAndId: string;
    public CreatedOn: string;
    public CreatedBy: string;
    public UpdatedOn: string;
    public UpdatedBy: string;
    public Status: number;
    public Type: number;
}