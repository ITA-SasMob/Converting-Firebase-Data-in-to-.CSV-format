webpackJsonp([0],{

/***/ 144:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 144;

/***/ }),

/***/ 186:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 186;

/***/ }),

/***/ 233:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(230);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__ = __webpack_require__(234);
/*
version :1
Done By: Marwah Almaqbli
*/
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, http, ofData) {
        this.navCtrl = navCtrl;
        this.http = http;
        this.ofData = ofData;
        this.cardsTitle = [];
        // tableName;
        this.dataArray = [];
        this.allData = [];
        this.dataObject = { "title": "", "tableName": "", "dataArray": [] };
        this.firebaseData = []; //contain all the data required 
    }
    HomePage.prototype.ionViewDidLoad = function () {
        /*
function to take the card name from json file "categoryName" and save it array "cardsTitle" and
          push all the data in json file in one array as object for each table
Marwah Al Maqbali
since: 201804022
modified: 20180509
Precondition:   none
Postcondition:    array with all the cards name "categoryName" and
                  array with all the data in json file
:param alist: none
:return: none
:complicity best and worst case : O(n^2)
*/
        var _this = this;
        // access the json file 
        this.http.get('assets/data/firebaseData.json').subscribe(function (data) {
            //for loop throw tables in json file
            for (var table in data) {
                // loop throw the data in each table 
                for (var key in data[table]) {
                    // push cards name in array 
                    if (key == "categoryName") {
                        _this.cardsTitle.push(data[table][key]);
                        // push the card name in "title" in "dataObject" 
                        _this.dataObject.title = data[table][key];
                    }
                    else if (key == "firebaseTable") {
                        _this.dataObject.tableName = data[table][key];
                    }
                    else {
                        //push all the other elements [fields] in array
                        if (key != "firebasedb") {
                            _this.dataArray.push(data[table][key]);
                        }
                    }
                }
                // push the complete array of the fields in "dataArray" in dataObject
                _this.dataObject.dataArray = _this.dataArray;
                // push the complete object [table in json] in final array "allData"
                _this.allData.push(_this.dataObject);
                //clear the object
                _this.dataObject = { "title": "", "tableName": "", "dataArray": [] };
                //clear the array
                _this.dataArray = [];
            }
        });
    };
    HomePage.prototype.D_ViewList = function (page) {
        /*
function to get the data of pariclar card from the array by using its name
Marwah Al Maqbali
since: 201804024
modified: 20180509
Precondition:   thaken the card name when "view" button clicked
Postcondition:   send the data with its header and file title to view excel function
:param alist: page
:return: none
:complicity best and worst case : O(n^2)
*/
        var _this = this;
        var firebaseArray = [];
        var header = [];
        var _loop_1 = function (i) {
            // find the information of that car by checking if the card name "page" same as the title in the array
            if ((this_1.allData[i].title) == page) {
                // access the firebase with the table name related to that card 
                this_1.ofData.list(this_1.allData[i].tableName).valueChanges().subscribe(function (costinfo) {
                    //loop throw all the objects in the table 
                    costinfo.forEach(function (snapshot) {
                        //clear the header
                        header = [];
                        // loop throw all the fields for the card [get the key for the firebase]
                        for (var key in (_this.allData[i].dataArray)) {
                            // push only the data required in json file
                            firebaseArray.push(snapshot[_this.allData[i].dataArray[key]]);
                            // push the keys name in header 
                            header.push(_this.allData[i].dataArray[key]);
                        }
                        // push it to final array to clear it
                        _this.firebaseData.push(firebaseArray);
                        firebaseArray = []; // clear the array
                    });
                    // pass the firebase data and its header to viewExcel function
                    _this.viewExcel(_this.firebaseData, header);
                    //clear the array
                    _this.firebaseData = [];
                    //clear the header
                    header = [];
                });
            }
        };
        var this_1 = this;
        //loop throw the json tables which saved in allData array
        for (var i = 0; i < this.allData.length; i++) {
            _loop_1(i);
        }
    };
    HomePage.prototype.viewExcel = function (rows, header) {
        /*
function to view the data of particlar card in html page as a table
Marwah Al Maqbali
since: 20180502
modified: 20180509
Precondition:   thaken the data and its header
Postcondition:   view the data with its header as table in html page
:param alist: rows (data) and header
:return: table in html page
:complicity best and worst case : O(n^2)
*/
        //print the headers in html page 
        var html = "<table border='1|1'>";
        for (var i_1 = 0; i_1 < header.length; i_1++) {
            html += "<th>" + header[i_1] + "</th>";
        }
        //print the data in html page 
        for (var i = 0; i < rows.length - 1; i++) {
            html += "<tr>";
            for (var j = 0; j < rows[i].length; j++) {
                html += "<td>" + rows[i][j] + "</td>";
            }
        }
        html += "</table>";
        document.getElementById("box").innerHTML = html;
    };
    HomePage.prototype.D_DownnoadExcel = function (page) {
        /*
    function to get the data of the related card from the array
    Marwah Al Maqbali
    since: 20180508
    modified: 20180509
    Precondition:   thaken the card name when "download" button clicked
    Postcondition:   send the data with its header and file title to download excel function
    :param alist: page
    :return: none
    :complicity best and worst case : O(n^2)
    */
        var _this = this;
        var firebaseArray = [];
        var header = [];
        var _loop_2 = function (i) {
            // find the information of that car by checking if the card name "page" same as the title in the array
            if ((this_2.allData[i].title) == page) {
                // access the firebase with the table name related to that card 
                this_2.ofData.list(this_2.allData[i].tableName).valueChanges().subscribe(function (costinfo) {
                    //loop throw all the objects in the table 
                    costinfo.forEach(function (snapshot) {
                        //clear the header
                        header = [];
                        // loop throw all the fields for the card [get the key for the firebase]
                        for (var key in (_this.allData[i].dataArray)) {
                            // push only the data required in json file
                            firebaseArray.push(snapshot[_this.allData[i].dataArray[key]]);
                            // push the keys name in header 
                            header.push(_this.allData[i].dataArray[key]);
                        }
                        // push it to final array to clear it
                        _this.firebaseData.push(firebaseArray);
                        firebaseArray = []; // clear the array
                    });
                    // pass the data to be viewed in html page
                    _this.fileTitle = page; // or 'my-unique-title'
                    _this.exportCSVFile(header, _this.firebaseData, _this.fileTitle); // call the exportCSVFile() function to process the 
                    //clear the array
                    _this.firebaseData = [];
                    //clear the header
                    header = [];
                });
            }
        };
        var this_2 = this;
        //loop throw the json tables which saved in allData array
        for (var i = 0; i < this.allData.length; i++) {
            _loop_2(i);
        }
    };
    HomePage.prototype.convertToCSV = function (objArray) {
        /*
    function to convert the object to array
    done by :  Danny Pule
    source code : https://codepen.io/danny_pule/pen/WRgqNx
    */
        var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
        var str = '';
        for (var i = 0; i < array.length; i++) {
            var line = '';
            for (var index in array[i]) {
                if (line != '')
                    line += ',';
                line += array[i][index];
            }
            str += line + '\r\n';
        }
        return str;
    };
    HomePage.prototype.exportCSVFile = function (headers, items, fileTitle) {
        /*
function to download excel file
done by :  Danny Pule
source code : https://codepen.io/danny_pule/pen/WRgqNx
*/
        if (headers) {
            items.unshift(headers);
        }
        // Convert Object to JSON
        var jsonObject = JSON.stringify(items);
        this.csv = this.convertToCSV(jsonObject);
        var exportedFilenmae = fileTitle + '.csv' || 'export.csv';
        var blob = new Blob([this.csv], { type: 'text/csv;charset=utf-8;' });
        if (navigator.msSaveBlob) {
            navigator.msSaveBlob(blob, exportedFilenmae);
        }
        else {
            var link = document.createElement("a");
            if (link.download !== undefined) {
                // Browsers that support HTML5 download attribute
                var url = URL.createObjectURL(blob);
                link.setAttribute("href", url);
                link.setAttribute("download", exportedFilenmae);
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"C:\Users\User\Desktop\SQU Resuable\download Excel\src\pages\home\home.html"*/'\n<ion-content padding>\n  <ion-grid class="headerSection">\n    <ion-row>\n      <ion-col>\n          <img   align="center" src="../../assets/imgs/e-Oman.png" class="logoPic">\n      </ion-col>\n      <ion-col col-11>\n          <h1 class="headerTitle">Firebase Excel Download</h1>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n  \n\n  <div class="gridGrow" align="center">\n    <ion-card *ngFor="let data of cardsTitle" class="gridCol">\n      <ion-card-content class="cardContent">\n        <p class="cardContent" style="color:black">\n          <b>{{data}}</b>\n        </p>\n        <button ion-button (click)="D_ViewList(data)">View</button>\n        <br/>\n        <button ion-button (click)="D_DownnoadExcel(data)">Download</button>\n      </ion-card-content>\n    </ion-card>\n\n  </div>\n  <div class="gridGrow">\n  <div align="center" class="viewTable" id="box"></div>\n</div>\n</ion-content>\n'/*ion-inline-end:"C:\Users\User\Desktop\SQU Resuable\download Excel\src\pages\home\home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__["a" /* AngularFireDatabase */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 284:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(285);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(303);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 303:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export firebaseConfig */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(226);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(229);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_http__ = __webpack_require__(352);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_common_http__ = __webpack_require__(230);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_component__ = __webpack_require__(356);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_home_home__ = __webpack_require__(233);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_register_register__ = __webpack_require__(437);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_angularfire2__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_angularfire2_auth__ = __webpack_require__(282);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_angularfire2_database__ = __webpack_require__(234);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__providers_auth_auth__ = __webpack_require__(442);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};














var firebaseConfig = {
    apiKey: "AIzaSyBYQ379YPaNNDZMbLtxaSvhN5OyitblaHk",
    authDomain: "task2-fd8ad.firebaseapp.com",
    databaseURL: "https://task2-fd8ad.firebaseio.com",
    projectId: "task2-fd8ad",
    storageBucket: "task2-fd8ad.appspot.com",
    messagingSenderId: "420003144879"
};
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_8__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_register_register__["a" /* RegisterPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* MyApp */], {}, {
                    links: []
                }),
                __WEBPACK_IMPORTED_MODULE_10_angularfire2__["a" /* AngularFireModule */].initializeApp(firebaseConfig),
                __WEBPACK_IMPORTED_MODULE_11_angularfire2_auth__["b" /* AngularFireAuthModule */],
                __WEBPACK_IMPORTED_MODULE_12_angularfire2_database__["b" /* AngularFireDatabaseModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_http__["a" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_6__angular_common_http__["b" /* HttpClientModule */],
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_8__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_register_register__["a" /* RegisterPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_13__providers_auth_auth__["a" /* AuthProvider */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 356:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(229);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(226);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(233);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





// import { LoginPage } from '../pages/login/login';
var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\Users\User\Desktop\SQU Resuable\download Excel\src\app\app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"C:\Users\User\Desktop\SQU Resuable\download Excel\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 437:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(58);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var RegisterPage = /** @class */ (function () {
    function RegisterPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.data = { username: "", password: "", phoneNumber: "", gender: "" };
    }
    RegisterPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad RegisterPage');
    };
    RegisterPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-register',template:/*ion-inline-start:"C:\Users\User\Desktop\SQU Resuable\download Excel\src\pages\register\register.html"*/'<!--\n  Generated template for the RegisterPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Register</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <div class="content2">\n  \n    <div class="content3">\n      <ion-grid>\n\n        <ion-row align="center">\n          <ion-col>\n            <p class="appName" align="center">Register</p>\n            <br/>\n          </ion-col>\n        </ion-row>\n        <ion-row>\n          <ion-col col-1>\n            <ion-icon name="ios-mail" class="icon1"></ion-icon>\n          </ion-col>\n          <ion-col>\n            <input type="email" placeholder="Email" [(ngModel)]="email" class="inp1">\n          </ion-col>\n        </ion-row>\n        <ion-row>\n          <ion-col col-1>\n            <ion-icon name="md-key" class="icon1"></ion-icon>\n          </ion-col>\n          <ion-col>\n            <input type="password" placeholder="Password" [(ngModel)]="password" class="inp1">\n\n          </ion-col>\n        </ion-row> \n \n      </ion-grid>\n      <p align="center">\n        <button  ion-button round style="background-color: rgb(233, 189, 199)" (click)="register(data)" class="registerButton">Register</button>\n      </p>\n      <p align="center">\n        <button ion-button clear (click)="gotologin()" class="button2">You have An account?</button></p>\n    </div>\n  </div>\n</ion-content>\n'/*ion-inline-end:"C:\Users\User\Desktop\SQU Resuable\download Excel\src\pages\register\register.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavParams */]])
    ], RegisterPage);
    return RegisterPage;
}());

//# sourceMappingURL=register.js.map

/***/ }),

/***/ 442:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_auth__ = __webpack_require__(282);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var AuthProvider = /** @class */ (function () {
    function AuthProvider(ofAuth) {
        this.ofAuth = ofAuth;
        console.log('Hello AuthProvider Provider');
    }
    AuthProvider.prototype.register = function (email, pass) {
        return this.ofAuth.auth.createUserWithEmailAndPassword(email, pass);
    };
    AuthProvider.prototype.login = function (user, pass) {
        return this.ofAuth.auth.signInWithEmailAndPassword(user, pass);
    };
    AuthProvider.prototype.restPassowrd = function (user) {
        return this.ofAuth.auth.sendPasswordResetEmail(user);
    };
    AuthProvider.prototype.verify = function () {
        return this.ofAuth.auth.currentUser.sendEmailVerification();
    };
    AuthProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_angularfire2_auth__["a" /* AngularFireAuth */]])
    ], AuthProvider);
    return AuthProvider;
}());

//# sourceMappingURL=auth.js.map

/***/ })

},[284]);
//# sourceMappingURL=main.js.map