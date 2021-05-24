import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormControl } from '@angular/forms';


import { CustomerModel } from '../../models/customer.model';


import { CustomerService } from '../../services/customer.service';
import { AlertService } from '../../../../shared/services/alert.service';
import { SurgeryService } from '../../services/surgery-service.service';

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
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.scss']
})
export class CreateCustomerComponent implements OnInit {
  myControl = new FormControl();
  options: Province[];
  filteredOptions: Observable<Province[]>;
  res: any;
  customer = new CustomerModel();
  profileImageString: any;
  countryList = [];
  provinceList = [];
  districtList = [];
  parentServices = [];
  childServices = [];
  selectedParentService: number;
  selectedChildService: number; //list dich vu con

  constructor(
    public customerService: CustomerService,
    public router: Router,
    public alertService: AlertService,
    private surgeryService: SurgeryService,
  ) { }


  ngOnInit(): void {
    this.customer.CountryId = 238;
    this.customer.GenderType = 2;
    this.getAllCountry();
    this.getAllProvinceByCountryId(238);
    this.getParentService();
  }

  displayFn(province: Province): string {
    return province && province.Name ? province.Name : '';
  }

  _filter(value: string): Province[] {
    const filterValue = value.toLowerCase();
    return this.provinceList.filter(option => option.Name.toLowerCase().indexOf(filterValue) === 0);
  }


  getAllProvinceByCountryId(countryId: number) {
    this.customerService.getAllProvinceByCountryId(countryId).subscribe(data => {
      data.forEach(item => {
        item.Name = item.Name.replace("Tỉnh", "").replace("Thành phố", "").trim();
      });
      this.provinceList = data;
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.provinceList.slice())
      );
      // console.log('DS tinh/thanh pho', this.provinceList);
    });
  }

  chooseGenderType(type) {
    this.customer.GenderType = type;
  }

  createCustomer() {
    this.customer.Status = 1;
    if (this.profileImageString) this.customer.ProfileImageString = this.profileImageString.split(",")[1];

    this.customerService.create(this.customer).subscribe(
      (res) => {
        this.res = res;
        if (this.res.Message == 'duplicate_phone') {
          this.alertService.changeMessage({
            color: 'red',
            text: 'Số điện thoại đã tồn tại'
          });
        } else {
          this.alertService.changeMessage({
            color: 'green',
            text: `Tạo hồ sơ khách hàng thành công!`
          });
          this.router.navigateByUrl('/pages/customer');

        }

      },
    );
  };

  isNumber(value: any) {
    return isNaN(value);
  }

  cancelCreate() {
    // this.sendMessage();
    this.router.navigate([`/pages/customer`]);
  }

  processFileProfileImage(files: File) {
    var reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = _event => {
      this.profileImageString = reader.result;
    };
  }

  getAllCountry() {
    this.customerService.getAllCountry().subscribe(data => {
      this.countryList = data;
      // console.log('DS quoc gia', data);
    });
  }


  getAllDistrictByProvinceId(event: any) {
    this.customer.ProvinceId = event.option.value.ProvinceId
    this.customerService.getAllDistrictByProvinceId(this.customer.ProvinceId).subscribe(data => {
      this.districtList = data;
      // console.log('List quận huyện của 1 tỉnh', data);
    });
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
  }


}
