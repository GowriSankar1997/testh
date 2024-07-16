import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as XLSX from 'xlsx';
import { HttpClient } from '@angular/common/http';
import { trigger, transition, style, animate } from '@angular/animations';

export const fadeInOutAnimation = trigger('fadeInOut', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('300ms', style({ opacity: 1 })),
  ]),
  transition(':leave', [
    animate('300ms', style({ opacity: 0 }))
  ])
]);


@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css'],
  animations: [fadeInOutAnimation]
})
export class ImageUploadComponent {
  selectedFile: any;
  imageSrc: string | ArrayBuffer | null = null;
  responseData: any;
  responseArray: any[] = []; // Array to store multiple responses
  componentEnabled = false;
  loading: boolean = false;
  
 

  constructor(private apiService: ApiService, private snackBar: MatSnackBar, private http: HttpClient) { }

  testResponseData = {
    productdescription: ''
  };

  onFileSelected(event: any): void {   
    
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      this.componentEnabled = this.componentEnabled ? !this.componentEnabled : this.componentEnabled;
      const reader = new FileReader();
      reader.onload = () => {
        this.imageSrc = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
      this.responseData = null;
    }
  }
  onUploadUrl(){
    this.componentEnabled = !this.componentEnabled;
    // this.responseData = null;
  }
  // Test response
  onUpload(): void {
    
    if (this.selectedFile) {
      // Simulating an API response
      this.responseData = { ...this.testResponseData };
      //this.openSnackBar('Invoice image uploaded successfully!', 'Close');
    }
  }

  onSubmitData(data: any): void {
    console.log('Edited Data:', data);
    // Simulating API response for edited data
    this.makeAPICall();
    this.responseData = { ...data };
    this.responseArray.push(this.responseData); // Push the edited response to the array
  }
    // onUpload(): void {
  //   if (this.selectedFile) {
  //     this.apiService.uploadImage(this.selectedFile).subscribe(
  //       (response) => {
  //         this.responseData = response;
  //         this.responseData.accuracy = this.calculateAccuracy(this.responseData);
  //         this.openSnackBar('Invoice image uploaded successfully!', 'Close');
  //       },
  //       (error) => {
  //         console.error('Error uploading image:', error);
  //       }
  //     );
  //   }
  // }

  // onSubmitData(data: any): void {
  //   this.apiService.submitEditedData(data).subscribe(
  //     (response) => {
  //       this.responseData = response;
  //       this.responseArray.push(this.responseData); // Push the edited response to the array
  //     },
  //     (error) => {
  //       console.error('Error submitting data:', error);
  //     }
  //   );
  // }

  // openSnackBar(message: string, action: string) {
  //   this.snackBar.open(message, action, {
  //     duration: 3000, // Duration of the snackbar display
  //   });
  // }

  makeAPICall() {
    // Construct the API URL with inputText interpolated
    const apiUrl = `https://hts-backend.azurewebsites.net/extract-description-fromImage/`;
    console.log(apiUrl);
    //console.log(this.inputText);
    const formData = new FormData();
    formData.append('file', this.selectedFile);
    this.loading = true;
    
    // Make the HTTP GET request
    this.http.post<any>(apiUrl, formData).subscribe(
      (response) => {
        this.responseData = { productdescription: JSON.stringify(response, null, 2)};
        this.loading = false;
        console.log(this.responseData);
        //localStorage.setItem(this.inputText, this.apiResponse); //response;  // Update apiResponse with the server's response
      },
      (error) => {
        
        console.error('Error fetching data:', error);
        this.responseData = { productdescription: 'Error fetching data. Please try again later.'};
        this.loading = false;
         // Display error message in apiResponse
      }
    );
  }

  

}
