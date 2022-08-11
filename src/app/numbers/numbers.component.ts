import { Component, OnInit } from '@angular/core';
import { NumbersService } from './numbers.service';
import { mergeMap } from 'rxjs/operators';


@Component({
  selector: 'app-numbers',
  templateUrl: './numbers.component.html',
  styleUrls: ['./numbers.component.css']
})
export class NumbersComponent implements OnInit {

  oprations: any[] = [];

  constructor(private NumbersService:NumbersService ) { }

  ngOnInit(){
    this.NumbersService.getNumbers().pipe(
      mergeMap((numbers: any[]) => numbers.map((number: any) => {
          this.NumbersService.getOperate(number.action).subscribe({
              next: (res: any) => {
                  let opration = number.action == 'add' ?
                  number.value + ' + ' + res.value + ' = ' + (number.value + res.value) :
                  number.value + ' * ' + res.value + ' = ' + (number.value * res.value);
                  this.oprations.push(opration)
              },
              error: (e) =>  {
                  this.oprations.push('<MISSING DATA>')
              }
          });
      }))
  ).subscribe({
      error: (e) =>  {
          this.oprations.push( this.NumbersService.showSnackBar('sereve error','ok'));
      }
  })




  }
}
