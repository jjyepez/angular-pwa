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
  notas: {}[];
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
    this.noteService.getNotes().valueChanges()
      .subscribe( (fbNotas)=>{
        this.limpiarNota();
        this.notas = fbNotas.reverse();
        console.log( fbNotas );
      })
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
    if(this.nota.id){
      this.noteService.updateNote( this.nota )
      .then( ()=> {
        this.openSnackBar('¡Nota actualizada!');
      });
    } else {
      const id = Date.now();
      this.nota.id = id;
      this.noteService.createNote( this.nota )
          .then( ()=> {
            this.openSnackBar('¡Nota creada!');
            this.limpiarNota();
          });
    }
  }
  limpiarNota() {
    this.nota = {};
  }
  openSnackBar(msj) {
    this.snackBar.open(msj, null, {
      duration: 2000
    });
  }
  seleccionarNota(nota){
    this.nota = nota;
  }
  eliminarNota(nota){
    const rsp = confirm('Confirme la eliminación de '+nota.titulo);
    if( rsp ){
      this.noteService.deleteNote(nota)
        .then( ()=> {
          this.limpiarNota();
          this.snackBar.open('Nota eliminada.', null, {
            duration: 2000
          })
        });
    }
  }
}
