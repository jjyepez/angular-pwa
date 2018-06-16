import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { MatSnackBar } from '@angular/material';
import { NoteService } from '../services/notes.service';
import { AuthService } from '../services/auth.service';

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
  loggedIn: boolean = false;
  usuarioActual: any = {};
  
  constructor(
    private swUpdate:SwUpdate,
    private noteService: NoteService,
    public snackBar: MatSnackBar,
    public authService: AuthService
  ){
    
  }
  ngOnInit(): void{
    if(!this.loggedIn){
      console.log('sin login')
    } else {
      console.log('ok')
      if(this.swUpdate.isEnabled){
        this.swUpdate.available.subscribe(()=>{
          window.location.reload();
        });
      }
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
      this.nota.author = this.usuarioActual.uid;
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
  login(){
    this.authService.loginWithGoogle()
    .then( rsp => {
      console.log(rsp);
      this.usuarioActual = rsp.user;
      this.loggedIn = true;
      this.openSnackBar('¡Ha iniciado sesión!');
      this.cargarNotas();
    });
  }
  logout(){
    this.authService.logout();
    this.loggedIn = false;
    this.openSnackBar('¡Ha finalizado sesión!');
  }
  cargarNotas(){
    this.noteService.getNotes().valueChanges()
      .subscribe( (fbNotas)=>{
        this.limpiarNota();
        this.notas = fbNotas.reverse();
        console.log( fbNotas );
      })
  }
}
