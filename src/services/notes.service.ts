import { AngularFireDatabase } from "angularfire2/database";
import { Injectable } from "@angular/core";

@Injectable()
export class NoteService {
   constructor(public afDB: AngularFireDatabase){

   }
   public getNotes(){
      return this.afDB.list('/notes/');
   }
   public getNote(id){
      return this.afDB.object('/notes/'+id);
   }
   public createNote(note){
      return this.afDB.database.ref('/notes/'+note.id).set(note);
   }
   public updateNote(note){
      // por organizacion y logica
      return this.afDB.database.ref('/notes/'+note.id).set(note);
   }
   public deleteNote(note){
      return this.afDB.database.ref('/notes/'+note.id).remove();
   }
}