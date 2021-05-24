export class CustomerContractPaymentModel {
    public ContractPaymentId: number;
    public ContractId: number;
    public PaymentMethodId: number;
    public Amount: number;
    public Type: number;
    public Status: number;
    public CreatedOn: string;
    public CreatedBy: number;
    public UpdatedOn: string;
    public UpdatedBy: number;
    public ImageURL: string;  // ảnh hóa đơn
    public PaymentDate: string;  // Ngày thanh toán"
    public Title: string;
}