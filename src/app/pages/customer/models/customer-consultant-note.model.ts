export class CustomerConsultantNoteModel {
    public CustomerConsultationId: number;
    public NoteId: number;
    public ConsultationNoteImageURL: string;
    public ProviderId: number;
    public CustomerId: number;
    public ConsultationDate: string;
    public Rating: number;
    public Type: number;
    public Status: number;
    public CreatedOn: string;
    public CreatedBy: number;
    public UpdatedOn: string;
    public UpdatedBy: number;
    public Description: string;
    public ImageDescription: string;
    public ConsultationNoteImageURLList: string[];
}