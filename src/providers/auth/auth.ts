import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  constructor(public ofAuth: AngularFireAuth) {
    console.log('Hello AuthProvider Provider');
  }

  register(email, pass){
    return this.ofAuth.auth.createUserWithEmailAndPassword(email, pass);
  }

  login(user, pass){
    return this.ofAuth.auth.signInWithEmailAndPassword(user, pass);
  }
  
  restPassowrd(user){
    return this.ofAuth.auth.sendPasswordResetEmail(user);
  }

  verify(){
    
    return this.ofAuth.auth.currentUser.sendEmailVerification();
    
  }
}
