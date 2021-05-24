import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';

//service
import { CustomerReminderService } from 'src/app/pages/customer/services/customer-reminder.service';
import { AlertService } from 'src/app/shared/services/alert.service';
//model
import { CustomerRemindersModel } from '../.././../../models/customer-reminder.model';

@Component({
  selector: 'app-customer-history-detail',
  templateUrl: './customer-history-detail.component.html',
  styleUrls: ['./customer-history-detail.component.scss']
})
export class CustomerHistoryDetailComponent implements OnInit, OnDestroy {
  @Output() messageEvent = new EventEmitter<any>();

  constructor(
    private customerReminderService: CustomerReminderService,
    private alerService: AlertService
  ) { }

  type: any;
  isShow: boolean = true;
  customerHistoryData: any;
  employeeList: any;
  status: number;
  dayDate: string;
  hourDate: string;
  description: string;
  contactType: any;
  employeeId: number;
  customerId: number;
  sale: any;

  ngOnInit(): void {
    this.getCurrentData();
  }

  getCurrentData() {
    this.customerHistoryData = JSON.parse(localStorage.getItem('customer-history'));
    // this.sale = this.customerId = JSON.parse(localStorage.getItem('access_user')).FullName;
    this.sale = this.customerHistoryData.EmployeeFullName;
    this.type = "" + this.customerHistoryData.Type;
    this.status = this.customerHistoryData.Status;
    this.dayDate = this.customerHistoryData.EventDate.split('T')[0];
    this.hourDate = this.customerHistoryData.EventDate.split('T')[1];
    this.description = this.customerHistoryData.Description;
    this.contactType = "" + this.customerHistoryData.ContactType;
    this.employeeId = this.customerHistoryData.EmployeeID;
  }

  chooseStatus(status: number) {
    if (status == 1) this.status = 2;
    else this.status = 1;
  }

  updateCustomerHistory() {
    let model = new CustomerRemindersModel();
    model.Type = +this.type;
    model.Status = this.status;
    model.EventDate = this.dayDate + "T" + this.hourDate;
    model.Description = this.description;
    model.ContactType = +this.contactType;
    this.customerReminderService.update(model, this.customerHistoryData.CustomerRemindersID).subscribe(res => {
      this.alerService.changeMessage({
        text: 'Cập nhật lịch hẹn thành công',
        color: 'green'
      });
      this.sendMessage(); //gọi hàm send message truyền data khi thực hiện sửa xóa
    });
  }

  deleteCustomerHistory() {
    this.customerReminderService.delete(this.customerHistoryData.CustomerRemindersID).subscribe(res => {
      this.alerService.changeMessage({
        text: 'Xóa lịch hẹn thành công',
        color: 'green'
      });
      this.sendMessage();
    });
  }

  sendMessage() {
    this.messageEvent.emit(false); //truyền data (false) ra component cha (customer-history)
  }

  ngOnDestroy() {
    this.messageEvent.unsubscribe(); //unsubscribe
  }
  autoGrowTextZone(e) {
    e.target.style.height = "0px";
    e.target.style.height = (e.target.scrollHeight) + "px";
  }
}
