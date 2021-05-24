export class MedicalScheduleModel {
    public OperationScheduleId : number;
    public ScheduleId : number;
    public OperationId : number;
    public Notes: string;
    public Description : string;
    public ScheduleDate : string;
    public ScheduleDateTime : string;
    public OperationDatetime : string;
    public EntryDatetime : string;
    public LeaveDatetime : string;
    public IsSOS : boolean;
    public Type: number;
    public Status: number;
    public CreatedOn : string;
    public CreatedBy : number;
    public UpdatedOn : string;
    public UpdatedBy : number;
    public MainProviderIdList :Array<any>;
    public MainProviderString : string;
    public AssistantProviderIdList : Array<any>;
    public AssistantProviderString : string;
    public ExaminateDoctorIdList : Array<any>;
    public MainNurseIdList: Array<any>;
    public ResultRating: number;
}