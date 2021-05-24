import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ScheduleReminderService } from 'src/app/pages/schedule/services/schedule-reminder.service';

@Injectable({
    providedIn: 'root'
})
export class ShowRemiderService {

    myReminder: any[];
    // có thể subcribe theo dõi thay đổi value của biến này thay cho messageSource

    constructor(private _snackBar: MatSnackBar, private scheduleReminderService: ScheduleReminderService) { }
    showRemider() {
        const newRemider = [];
        const employeeId = +JSON.parse(localStorage.getItem('access_user')).EmployeeId;
        this.scheduleReminderService.getCustomerReminderByEmployeeId(employeeId).subscribe(res => {
            this.myReminder = res;
            this.myReminder.forEach(item => {
                if (item.Status == 1) {
                    newRemider.push(item);
                }
            });
            let countFailTask = 0;
            let countTask = 0;

            newRemider.forEach(val => {
                if ((Date.parse(val.EventDate) - Date.now()) < 0) {
                    countFailTask = countFailTask + 1;
                } else if ((Date.parse(val.EventDate) - Date.now()) >= 0) {
                    countTask = countTask + 1;
                }
            });

            const snackBarRef = this._snackBar.open(`Bạn hiện có ${countTask} Lịch hẹn!`, 'OK', {
                duration: 2000,
                verticalPosition: 'top',
                horizontalPosition: 'end',
            });

            snackBarRef.afterDismissed().subscribe(info => {
                if (info.dismissedByAction === true) {
                    this._snackBar.open(`Bạn đã muộn ${countFailTask} Lịch hẹn!`, 'OK', {
                        verticalPosition: 'top',
                        horizontalPosition: 'end',
                    });
                }
            });
        });
    }
}