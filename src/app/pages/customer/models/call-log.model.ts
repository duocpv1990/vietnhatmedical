export class CustomerCallLogModel {
    public EmployeeId: number; // id nhân viên
    public CustomerId: number;// id khách hàng
    public Phone: string; // thời lượng
    public URL: string; // link file ghi âm
    public NoteContent: string; //ghi chú
    public ContractId: number; // id hợp đồng
    public PotentialLevelId: number; // mức L
    public Type: number;
    public Status: number;
    public CreatedOn: string; //ngày tạo
    public StartDate: string;//bắt đầu
    public EndDate: string;// kết thúc
}