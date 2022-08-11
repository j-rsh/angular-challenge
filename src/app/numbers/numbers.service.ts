import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { Injectable } from "@angular/core";
import {MatSnackBar ,MatSnackBarConfig } from '@angular/material/snack-bar';

interface INumbers
{   value:number,
    action:string,
}

@Injectable({
    providedIn:"root"
})

export class NumbersService {

   constructor(private http: HttpClient ,private snackBar:MatSnackBar) {}

    getNumbers(): Observable<INumbers[]> {
    return this.http.get<INumbers[]>('/assets/data/Numbers.json');
  }
  
    getOperate(operate:any) {
    return operate == 'add' ? this.http.get('/assets/data/Add.json') : this.http.get('/assets/data/Multiply.json');
  }
   
  showSnackBar(displayMessage:string ,buttonText:string)
  {
    let config = new MatSnackBarConfig();
    this.snackBar.open(displayMessage ,buttonText, {
      duration: 5000
   
    });
  }
}
