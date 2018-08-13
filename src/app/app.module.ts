import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { RegisterPage } from '../pages/register/register';


import * as Collections from 'typescript-collections';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule} from 'angularfire2/database';
import { AuthProvider } from '../providers/auth/auth';

export const firebaseConfig = {
  apiKey: "AIzaSyCHaHCoZ3onXXXXXXXXXXXXXXXXXXX",
    authDomain: "abcmanagment.firebaseapp.com",
    databaseURL: "https://abcmanagment.firebaseio.com",
    projectId: "sasdevicemanagement",
    storageBucket: "",
    messagingSenderId: "123456789101"
}




@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RegisterPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    HttpModule,
    HttpClientModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RegisterPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
