import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  form: FormGroup;
  name: string;
  phone: string;
  email: string;
  startDate: Date;
  endDate: Date;
  error: boolean;

  constructor(
      public fb: FormBuilder,
      public dialogRef: MatDialogRef<DialogComponent>,
      @Inject(MAT_DIALOG_DATA) data) {

      this.name = data.name;
      this.phone = data.phone;
      this.email = data.email;
      this.startDate = data.startDate;
      this.endDate = data.endDate;
  }

  ngOnInit() {
      this.error = false;
      this.form = this.fb.group({
          name: [this.name, Validators.required],
          phone: [this.phone, Validators.required],
          email: [this.email, Validators.required],
          startDate: [this.startDate, Validators.required],
          endDate: [this.endDate, Validators.required]
      });
  }

  save() {
      if (this.form.invalid) {
          this.error = true;
          return;
      }
      this.dialogRef.close(this.form.value);
  }

  close() {
      this.dialogRef.close();
  }

  public hasError = (controlName: string, errorName: string) => {
    return !this.form.controls[controlName].pristine && this.form.controls[controlName].hasError(errorName);
  }

}
