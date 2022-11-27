import { Component, OnInit } from '@angular/core';
import { Word } from '../word';
import { WordService } from '../word.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  public actualWord: Word = new Word();
  public randomWords: Array<Word> = new Array<Word>();
  public userChoice: string = '';
  public response: string = '';
  public count: number = 0;
  public wordNumber: number = 1;
  public choiceWordArray: Array<Word> = new Array<Word>();
  public playGame: boolean = false;
  public service: WordService;
  constructor(service: WordService) {
    this.service = service;
   }

  ngOnInit(): void {
  }

  public getRnd(min:number, max:number){
    return Math.floor(Math.random() * (max - min +1) +min)
  }

  public play(){

    this.randomWords = new Array<Word>();
    this.playGame = true;
    

    for(let w of this.service.words){
      this.randomWords.push(w);
    }

    for(let i = 0; i < 1000; i++){
      let a = this.getRnd(0, this.randomWords.length -1);
      let b = this.getRnd(0, this.randomWords.length -1);
      let tmp = this.randomWords[a];
      this.randomWords[a] = this.randomWords[b];
      this.randomWords[b] = tmp;
    }

    for(let i = 0; i < this.wordNumber; i++){
      this.choiceWordArray.push(this.randomWords[i])
    }

    this.actualWord = this.choiceWordArray[this.count];
    this.count++;

  }

  public verify(){
    if(this.actualWord.english == this.userChoice){
      this.actualWord.goods ++ ;
      this.response = 'Good Answer !';
      this.service.save();
    }else{
      this.actualWord.bads ++ ;
      this.response = 'Bad Answer, correct: ' + this.actualWord.english;
      this.service.save();
    }

    this.userChoice = '';
  }

  public nextWord(){
    this.response = '';
    if(this.count < this.choiceWordArray.length){
      this.actualWord = this.choiceWordArray[this.count];
      this.count++;
    }
  }

}
