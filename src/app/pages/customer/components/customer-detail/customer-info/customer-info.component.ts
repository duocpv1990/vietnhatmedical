import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { BaseComponent } from "../../../../../shared/components/base.component";
import { AlertService } from "../../../../../shared/services/alert.service";
import { CustomerModel } from "../../../models/customer.model";
import { CustomerService } from "../../../services/customer.service";
import { PotentialLevelService } from "../../../services/potential-level.service";
import { DeleteCustomerComponent } from "../dialog/delete-customer/delete-customer.component";
import { SocialNetworkSerivce } from '../../../services/social-network.service';
import { SocialNetworkModel } from '../../../models/social-network.model';
import { SurgeryService } from '../../../services/surgery-service.service';

export interface Province {
    CountryId: number;
    CreatedBy: string;
    CreatedOn: number;
    Name: string;
    PhoneCode: string;
    ProvinceId: number;
    Status: number
    Type: number;
    UpdatedBy: string;
    UpdatedOn: number;
    ZipCode: string;
}
@Component({
    selector: 'app-customer-info',
    templateUrl: './customer-info.component.html',
    styleUrls: ['./customer-info.component.scss']
})
export class CustomerInfoComponent extends BaseComponent implements OnInit, OnDestroy {
    customer = new CustomerModel();
    provinceSelected: Province;
    editCustomer: any;
    customerAvatarString: any;
    customerId: number;
    profileImageURL: string;
    countryList = [];
    provinceList = [];
    provinceListSub = [];
    districtList = [];
    provinceName: string;
    socialNetwork = new SocialNetworkModel();
    allowUpdate = true;
    parentServices = [];
    childServices = [];
    selectedParentService: number;
    selectedChildService: number; //list dich vu con
    test: 'test';
    @Output() messageEvent = new EventEmitter<any>();

    constructor(
        private customerService: CustomerService,
        private activatedRoute: ActivatedRoute,
        private alerService: AlertService,
        public dialog: MatDialog,
        public router: Router,
        private socialNetworkService: SocialNetworkSerivce,
        private surgeryService: SurgeryService,
    ) {
        super(router);
        this.editCustomer = this.checkAccess('api/customer,PUT');
    }


    ngOnInit(): void {
        this.customer.CountryId = 238;
        this.getAllCountry();
        this.getAllProvinceByCountryId(238);
        this.getCurrentCustomer();
        this.getParentService();
    }

    ngOnDestroy(): void {
        this.messageEvent.unsubscribe();
    }

    processFileCustomerAvatar(files: File) {
        var reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = _event => {
            this.customerAvatarString = reader.result;
        };
    }

    sendMessage(data: object) {
        this.messageEvent.emit(data);
    }

    getCurrentCustomer() {
        this.activatedRoute.paramMap.subscribe(param => this.customerId = +param.get('customerId'));

        this.customerService.getCustomerById(this.customerId).subscribe(data => {
            this.customer = data;

            this.chooseParentService(this.customer.InitInterestedServiceId);
            if (this.customer.CountryId === null) this.customer.CountryId = 238;
            if (this.customer.ProvinceId === null) {
                this.selectedProvince(1);
                this.getDistrictBySelectedProvince(1);
            } else {
                this.selectedProvince(this.customer.ProvinceId);
                this.getDistrictBySelectedProvince(this.customer.ProvinceId);
            }
            if (this.customer.GeographicregionName === null) this.customer.GeographicregionName = "Đồng bằng sông Hồng";

            this.sendMessage(this.customer);

            if (this.customer.BirthDay !== null) {
                this.customer.BirthDay = this.customer.BirthDay.split('T')[0];
            }
            else this.customer.BirthDay = '';

            this.customerAvatarString = this.customer.ProfileImageURL;

        });
    }

    chooseGenderType(genderType: number) {
        this.customer.GenderType = genderType;
    }

    updateCustomer() {
        this.customer.ProfileImageString = this.customerAvatarString.split(',')[1];
        if (this.customer.IdCardNumber === null) {
            this.customer.IdCardNumber = '';
        }

        this.customerService.update(this.customer, this.customerId).subscribe(res => {
            this.alerService.changeMessage({
                color: 'green',
                text: `Sửa thông tin khách hàng thành công`
            });
            this.getCurrentCustomer();
        });

    }

    addSocialNetwork() {

        this.socialNetwork.CustomerId = this.customerId;
        this.socialNetwork.NetworkId = 1;
        this.socialNetworkService.create(this.socialNetwork).subscribe(res => {


        })
    }

    updateSocialNetwork() {

        this.socialNetworkService.update(this.socialNetwork, this.socialNetwork.CustomerNetworkId).subscribe(res => {


        });
    }

    openDeleteForm() {
        this.dialog.open(DeleteCustomerComponent, {
            data: {
                customerId: this.customerId
            }
        });
    }

    getAllCountry() {
        this.customerService.getAllCountry().subscribe(data => {
            this.countryList = data;
        });
    }

    getAllProvinceByCountryId(countryId: number) {
        this.customerService.getAllProvinceByCountryId(countryId).subscribe(data => {
            data.forEach(item => {
                item.Name = item.Name.replace("Tỉnh", "").replace("Thành phố", "").trim();
            });
            this.provinceList = data;
            this.provinceListSub = this.provinceList;
        });
    }

    getAllDistrictByProvinceId(event: any) {
        this.customer.ProvinceId = event.option.value.ProvinceId;
        this.provinceName = event.option.value.Name;
        this.customerService.getAllDistrictByProvinceId(this.customer.ProvinceId).subscribe(data => {
            this.districtList = data;
        });
    }

    getDistrictBySelectedProvince(provinceId) {
        this.customerService.getAllDistrictByProvinceId(provinceId).subscribe(data => {
            this.districtList = data;
        });
    }

    selectedProvince(provinceId) {
        this.provinceSelected = this.provinceList.find(item => item.ProvinceId === provinceId);
        if (this.provinceSelected && this.provinceSelected.Name) {
            this.provinceName = this.provinceSelected.Name;
        } else this.provinceName = '';


    }


    searchProvince(key) {
        if (!key) this.provinceListSub = [];
        this.provinceListSub = this.provinceList.filter(
            (x) => x.Name.toLowerCase().indexOf(key.toLowerCase()) > -1
        );
    }

    getParentService() {
        this.surgeryService.list().subscribe(res => {
            this.parentServices = res;
            // console.log('DS dich vu cha: ', this.parentServiceList);
        });
    }

    chooseParentService(value: any) {
        this.customer.InitInterestedServiceId = value;
        this.surgeryService.getChildService(this.customer.InitInterestedServiceId).subscribe(data => {
            this.childServices = data;
        });
    }

    chooseSubService(value: any) {
        this.customer.InitInterestedSubServiceId = value;
        console.log('sub service', this.customer.InitInterestedSubServiceId);

    }

}
