import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from 'firebase/app';

@Injectable()

export class AuthService{
    constructor(
        public afDB: AngularFireDatabase,
        public fbAuth: AngularFireAuth
    ){

    }
    loginWithFacebook(){
        return null;
    }
    loginWithGoogle(){
        return this.fbAuth.auth.signInWithPopup( new firebase.auth.GoogleAuthProvider() );
    }
    logout(){
        return this.fbAuth.auth.signOut();
    }
}