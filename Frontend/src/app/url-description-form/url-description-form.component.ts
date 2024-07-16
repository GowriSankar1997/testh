import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-url-description-form',
  templateUrl: './url-description-form.component.html',
  styleUrls: ['./url-description-form.component.css']
})
export class UrlDescriptionFormComponent {  
  @Input() isBack: any;
  
  inputText: string = '';
  apiResponse: string = '';
  loading:boolean = false;
  componentVisible: boolean = true;
   

  constructor(private http: HttpClient) {}

  closeComponent(){
    this.componentVisible = false;
  }
 //text=${encodeURIComponent(this.inputText)}`
  makeAPICall() {
    // Construct the API URL with inputText interpolated
    const apiUrl = `https://hts-backend.azurewebsites.net/process_text`;
    console.log(apiUrl);
    console.log(this.inputText);
    this.loading = true;
    
    // Make the HTTP GET request
    this.http.get<any>(apiUrl,{ params: {text: this.inputText } }).subscribe(
      (response) => {
        this.apiResponse =  JSON.stringify(response, null, 2);
        this.loading = false;
        console.log(this.apiResponse);
        //localStorage.setItem(this.inputText, this.apiResponse); //response;  // Update apiResponse with the server's response
      },
      (error) => {
        
        console.error('Error fetching data:', error);
        this.apiResponse = 'Error fetching data. Please try again later.'; 
        this.loading= false;// Display error message in apiResponse
      }
    );
  }


}
