export class ChangeBandageModel {
    public OperationScheduleId : number;
    public ScheduleId : number;
    public OperationId : number;
    public Notes: string;
    public Description : string;
    public BandageChangingTemplateID: number;
    public Date: string;
    public Time: string;
    public ConditionDescription: string;
    public ConditionID: number;
    public MainProviderIdList: number[];
    public AssistantProviderIdList: number[];
    public Type: number;
    public ScheduleDate: string;
    public ScheduleDateTime : string;
    public Status: number;
    public ExaminateDoctorIdList : Array<any>;
    public MainNurseIdList :  Array<any>;
    public AssistantNurseIdList : Array<any>;
    public ResultRating : number;
  }