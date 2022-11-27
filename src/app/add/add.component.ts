import { Component, OnInit } from '@angular/core';
import { Word } from '../word';
import { WordService } from '../word.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  public service: WordService;
  constructor(service: WordService) { 
    this.service = service
  }

  ngOnInit(): void {
    let btn : HTMLElement | null = document.getElementById('downloadButton');
    btn?.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(localStorage.getItem('words') || ''));
    btn?.setAttribute('download' , 'export.json');
  }

  public addWord(){
    let tmp = this.service.words.filter(t => t.english == this.service.actualWord.english)

    if(tmp.length == 0){
      let wCopy: Word = new Word();
      wCopy.hungarian = this.service.actualWord.hungarian;
      wCopy.english = this.service.actualWord.english
      this.service.words.push(wCopy);
      this.service.actualWord.hungarian = '';
      this.service.actualWord.english = '';
      this.service.save();
    }else{
      alert('van már ilyen szavad !');
    }
  }

  public removeWord(english:string){
    this.service.words = this.service.words.filter(t => t.english != english);
    this.service.save();
  }
}
