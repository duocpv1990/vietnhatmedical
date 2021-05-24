export class CustomerModel {
    // public SaledManagerID: number;
    // public SaleID: number;
    public CustomerProfileID: number;
    public FullNameAndID: string;
    public Phone: string;
    public Email: string;
    public FirstName: string;
    public LastName: string;
    public CustomerCode: string;
    public CustomerID: number;
    public ProfileImageURL: string;
    public ProfileImageString: string;
    public IdCardNumber: string;
    public BirthDay: string;
    public GenderType: number;
    // public ProvinceID: number;
    // public DistrictID: number;
    // public CommuneID: number;
    public Address: string;
    public Type: number;
    public OriginType: number;
    public Status: number;
    public CreatedOn: string;
    public CreatedBy: number;
    public UpdatedOn: string;
    public UpdatedBy: number;
    public NoteContent: string;
    public PotentialLevelId: number;
    public StorageId: number; // id kho
    public DistrictId: number;//quận huyện
    public ProvinceId: number;//tỉnh thành phố
    public CountryId: number;//quốc gia
    public NetworkList: {};
    public InitInterestedService: string;
    public InitInterestedSubService: string;
    public InitInterestedServiceId: number;
    public InitInterestedSubServiceId: number;
    public CustomerNetworkURL: string;
    public GeographicregionName: string;
}