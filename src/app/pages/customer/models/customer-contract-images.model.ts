export class ContractImagesModel {
    public ContractImageId: number;
    public ContractId: number;
    public ImageId: number;
    public NoteId: number;
    public Type: number;
    public Status: number;
    public CreatedOn: string;
    public CreatedBy: number;
    public UpdatedOn: string;
    public UpdatedBy: number;
    public NoteContent: string; // ghi chú
    public ImageUrl: string; // URL ảnh
    public Name: string;
    public BeforeImageStringLst: Array<any>; // List base64 ảnh trước
    public AfterImageStringLst: Array<any>; // List base64 ảnh sau"
    public BandageImageStringLst : Array<any>; // List base64 ảnh trước
    public VisitImageStringLst : Array<any>; // List base64 ảnh sau"
    public MainImageObjectList : any;
    public MainImageStringLst: any;

}