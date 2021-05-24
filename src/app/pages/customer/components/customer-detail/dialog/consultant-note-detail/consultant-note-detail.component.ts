import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { BehaviorSubject } from 'rxjs';

//service
import { CustomerConsultantNoteService } from "../../../../services/customer-consultant-note.service";
import { AlertService } from "../../../../../../shared/services/alert.service";

//model
import { CustomerConsultantNoteModel } from "../../../../models/customer-consultant-note.model";

@Component({
  selector: 'app-consultant-note-detail',
  templateUrl: './consultant-note-detail.component.html',
  styleUrls: ['./consultant-note-detail.component.scss']
})
export class ConsultantNoteDetailComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ConsultantNoteDetailComponent>,
    private consultantNoteService: CustomerConsultantNoteService,
    private alerService: AlertService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  consultationDate: string;
  consultantNoteImageString: any;
  imageDescription: string;
  imageString: any;
  description: string;
  imagesName: any[] = [];
  imagesPick: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  ngOnInit(): void {
    console.log('current consultantNote: ', this.data.consultantNote);
    if (this.data.consultantNote.ConsultationDate !== null) {
      this.consultationDate = this.data.consultantNote.ConsultationDate.split('T')[0];
    } else {
      this.consultationDate = '';
    }
    this.imageDescription = this.data.consultantNote.ImageDescription;
    this.consultantNoteImageString = this.data.consultantNote.ConsultationNoteImageURL;
  }

  processFileConsultantNoteImage(files: File) {
    var reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = _event => {
      this.consultantNoteImageString = reader.result;
    };
  }

  processFileImage(files) {
    const fileArr = Object.values(files);
    fileArr.forEach((val: any) => {
      const type = val.type.split('/');
      if (type[0] == 'image') {
        this.imagesName.push(val.name);
        const reader = new FileReader();
        reader.readAsDataURL(val);
        reader.onload = () => {
          this.imageString = reader.result;
          console.log(this.imagesPick.getValue());
          this.imagesPick.next(this.imagesPick.getValue().concat(this.imageString.split(',')[1].toString()));
        };
      }
    });
  }

  updateConsultantNote() {
    let consultantNote = new CustomerConsultantNoteModel();
    consultantNote.ConsultationDate = this.consultationDate;
    consultantNote.ImageDescription = this.imageDescription;
    consultantNote.ConsultationNoteImageURLList = this.imagesPick.getValue();
    // console.log('consultantNote', consultantNote);
    this.consultantNoteService.update(consultantNote, this.data.consultantNote.CustomerConsultationId).subscribe(() => {
      this.alerService.changeMessage({
        text: 'Cập nhật phiếu tư vấn thành công',
        color: 'green'
      });
      this.closeDialog();
    });
  }

  deleteConsultantNote() {
    this.consultantNoteService.delete(this.data.consultantNote.CustomerConsultationId).subscribe(() => {
      this.alerService.changeMessage({
        text: 'Xóa phiếu tư vấn thành công',
        color: 'green'
      });
      this.closeDialog();
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  autoGrowTextZone(e) {
    e.target.style.height = "0px";
    e.target.style.height = (e.target.scrollHeight) + "px";
  }
}
