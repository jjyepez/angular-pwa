import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';

  // --- jjy
  nota: any = {};
  categorias: any = ['Trabajo', 'Personal'];
  panelOpenState: boolean = false;
  
  constructor(private swUpdate:SwUpdate){

  }
  ngOnInit(): void{
  	if(this.swUpdate.isEnabled){
  		this.swUpdate.available.subscribe(()=>{
  			window.location.reload();
  		});
  	}
  }

  guardarNota() {
    console.log( this.nota )
  }
}
