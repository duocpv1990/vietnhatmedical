import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-logout-dialog',
  templateUrl: './logout-dialog.component.html',
  styleUrls: ['./logout-dialog.component.scss']
})
export class LogoutDialogComponent implements OnInit {

  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<LogoutDialogComponent>,

  ) { }

  user: any;

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('access_user'));
  }

  logout() {
    // localStorage.removeItem('access_token');
    // localStorage.removeItem('access_user');
    localStorage.clear();
    setTimeout(() => {
      this.router.navigateByUrl('/login');
      this.closeDialog();
    }, 200);
  }

  closeDialog(){
    this.dialogRef.close();
  }
}
