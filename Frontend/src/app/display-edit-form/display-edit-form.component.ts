import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-display-edit-form',
  templateUrl: './display-edit-form.component.html',
  styleUrls: ['./display-edit-form.component.css']
})
export class DisplayEditFormComponent {
  @Input() data: any;
  @Output() submitData = new EventEmitter<any>();

  constructor(private snackBar: MatSnackBar) { }

  fields = [
    { label: 'Product Description', name: 'productdescription' },
  ];

  // Split fields into two columns
  leftFields = this.fields.slice(0, Math.ceil(this.fields.length / 2));
  rightFields = this.fields.slice(Math.ceil(this.fields.length / 2));

  onSubmit() {
    this.submitData.emit(this.data);
    //this.openSnackBar('Invoice-Form submitted successfully!', 'Close');
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000, // Duration of the snackbar display
    });
  }

  isEmpty(field: string): boolean {
    return !this.data[field];
  }
}
