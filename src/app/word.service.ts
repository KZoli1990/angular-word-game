import { Injectable } from '@angular/core';
import { Word } from './word';

@Injectable({
  providedIn: 'root'
})
export class WordService {

  public actualWord: Word = new Word();
  public words: Array<Word> = new Array<Word>();

  constructor() {
    this.load();
   }

  public save(){
    localStorage.setItem('word', JSON.stringify(this.words));
  }

  public load(){
    if(localStorage.getItem('word') != null){
      let data = JSON.parse(localStorage.getItem('word') || '');
      for(let item of data){
        let wCopy:Word = new Word();
        wCopy.hungarian = item['hungarian'];
        wCopy.english = item['english'];
        wCopy.goods = item['goods'];
        wCopy.bads = item['bads'];
        this.words.push(wCopy);
      }
    }
  }
}
