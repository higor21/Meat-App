import { Component, OnInit, Input, ContentChild, AfterContentInit } from '@angular/core';
import { NgModel, FormControlName } from '@angular/forms'

@Component({
  selector: 'mt-input-container',
  templateUrl: './input.component.html'
})
export class InputComponent implements OnInit, AfterContentInit {

  @Input() label: string 
  @Input() errorMessage: string
  @Input() showTipCorrect: boolean = true

  input: any
  @ContentChild(NgModel) model: NgModel
  @ContentChild(FormControlName) control: FormControlName

  constructor() { }

  hasSuccess(){
    return this.input.valid && (this.input.dirty || this.input.touched)
  }

  hasError(){
    return this.input.invalid && (this.input.dirty || this.input.touched)
  }

  ngOnInit() {}

  ngAfterContentInit(){
    this.input = this.model || this.control
    if(this.input === undefined){
      console.log(this.control)
      throw new Error('Esse componente precisar ser com uma diretiva NgModel ou FormGroupName')
    }
  }
}
