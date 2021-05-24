export class SurgerySchedule {
    public CustomerId: number;
    public ScheduleDateTime: string;
    public Notes: string; // ghi chú
    public IsSos: boolean;
    public MainProviderIdList: number[];; // id bác sĩ chính
    public AssistantProviderIdList: number[];; // id bsi phụ
    public ExaminateDoctorIdList: number[];; // id bác sĩ khám
    public MainNurseIdList: number[];; // id  điều dưỡng chính
    public AssistantNurseIdList: number[];; // id điều dưỡng phụ
    public Type: number; // loại lịch
    public OperationId: number; // id hồ sơ phẫu thuật"
}