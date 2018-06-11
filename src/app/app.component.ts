import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { NoteService } from '../services/notes.service';
import { MatSnackBar } from '@angular/material';

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
  
  constructor(
    private swUpdate:SwUpdate,
    private noteService: NoteService,
    public snackBar: MatSnackBar
  ){
    
  }
  ngOnInit(): void{
  	if(this.swUpdate.isEnabled){
  		this.swUpdate.available.subscribe(()=>{
  			window.location.reload();
  		});
  	}
  }

  guardarNota() {
    console.log( this.nota );
    const id = Date.now();
    this.nota.id = id;
    this.noteService.createNote( this.nota )
        .then( ()=> {
          this.openSnackBar('¡Nota creada!');
          this.nota = {};
        });
  }

  openSnackBar(msj) {
    this.snackBar.open(msj, null, {
      duration: 2000
    });
  }
}
