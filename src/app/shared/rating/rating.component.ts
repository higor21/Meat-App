import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'mt-rating',
  templateUrl: './rating.component.html'
})
export class RatingComponent{

  rates: number[] = [1,2,3,4,5]
  rate: number = 0
  previousRate: number = undefined

  @Output() rated = new EventEmitter

  constructor() {}

  setRate(r: number){
    this.rate = r
    this.previousRate = undefined
    this.rated.emit()
  }

  setTemporaryRate(r: number){
    if(this.previousRate == undefined){
      this.previousRate = this.rate
      this.rate = r
    }
  }

  clearTemporaryRate(){
    if(this.previousRate != undefined){
      this.rate = this.previousRate
      this.previousRate = undefined
    }
  }

}
