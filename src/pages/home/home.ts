/*
version :1
Done By: Marwah Almaqbli 
*/


import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  cardsTitle = [];
  // tableName;
  dataArray = [];
  allData = [];
  dataObject = { "title": "", "tableName": "", "dataArray": [] }
  firebaseData = []; //contain all the data required 

  fileTitle;
  jsonObject;
  csv;
  constructor(public navCtrl: NavController, public http: HttpClient, public ofData: AngularFireDatabase) {

  }
  ionViewDidLoad() {
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


    // access the json file 
    this.http.get('assets/data/firebaseData.json').subscribe((data: any) => {
      //for loop throw tables in json file
      for (var table in data) {
        // loop throw the data in each table 
        for (var key in data[table]) {
          // push cards name in array 
          if (key == "categoryName") {
            this.cardsTitle.push(data[table][key])
            // push the card name in "title" in "dataObject" 
            this.dataObject.title = data[table][key]
          }
          // push the firebase table name in "tableName" in "dataObject" 
          else if (key == "firebaseTable") {
            this.dataObject.tableName = data[table][key]
          }
          else {
            //push all the other elements [fields] in array
            if (key != "firebasedb") { // don't need "firebasedb"
              this.dataArray.push(data[table][key])
            }
          }
        }
        // push the complete array of the fields in "dataArray" in dataObject
        this.dataObject.dataArray = this.dataArray
        // push the complete object [table in json] in final array "allData"
        this.allData.push(this.dataObject)
        //clear the object
        this.dataObject = { "title": "", "tableName": "", "dataArray": [] }
        //clear the array
        this.dataArray = []
      }
    }
    );
  }


  D_ViewList(page) {
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


    let firebaseArray = [];
    let header = [];
    //loop throw the json tables which saved in allData array
    for (let i = 0; i < this.allData.length; i++) {
      // find the information of that car by checking if the card name "page" same as the title in the array
      if ((this.allData[i].title) == page) {
        // access the firebase with the table name related to that card 
        this.ofData.list(this.allData[i].tableName).valueChanges().subscribe((costinfo: any) => {
          //loop throw all the objects in the table 
          costinfo.forEach((snapshot: any) => {
            //clear the header
            header = []
            // loop throw all the fields for the card [get the key for the firebase]
            for (let key in (this.allData[i].dataArray)) {
              // push only the data required in json file
              firebaseArray.push(snapshot[this.allData[i].dataArray[key]])
              // push the keys name in header 
              header.push(this.allData[i].dataArray[key])
            }
            // push it to final array to clear it
            this.firebaseData.push(firebaseArray);
            firebaseArray = []; // clear the array
          });
          // pass the firebase data and its header to viewExcel function
          this.viewExcel(this.firebaseData, header)
          //clear the array
          this.firebaseData = []
          //clear the header
          header = []
        });
      }
    }
  }

  viewExcel(rows, header) {
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
    for (let i = 0; i < header.length; i++) {
      html += "<th>" + header[i] + "</th>";
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
  }

  D_DownnoadExcel(page) {
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


    let firebaseArray = [];
    let header = [];
    //loop throw the json tables which saved in allData array
    for (let i = 0; i < this.allData.length; i++) {
      // find the information of that car by checking if the card name "page" same as the title in the array
      if ((this.allData[i].title) == page) {
        // access the firebase with the table name related to that card 
        this.ofData.list(this.allData[i].tableName).valueChanges().subscribe((costinfo: any) => {
          //loop throw all the objects in the table 
          costinfo.forEach((snapshot: any) => {
            //clear the header
            header = []
            // loop throw all the fields for the card [get the key for the firebase]
            for (let key in (this.allData[i].dataArray)) {
              // push only the data required in json file
              firebaseArray.push(snapshot[this.allData[i].dataArray[key]])
              // push the keys name in header 
              header.push(this.allData[i].dataArray[key])
            }
            // push it to final array to clear it
            this.firebaseData.push(firebaseArray);
            firebaseArray = []; // clear the array
          });

          // pass the data to be viewed in html page
          this.fileTitle = page; // or 'my-unique-title'
          this.exportCSVFile(header, this.firebaseData, this.fileTitle); // call the exportCSVFile() function to process the 

          //clear the array
          this.firebaseData = []
          //clear the header
          header = []
        });
      }
    }
  }

  convertToCSV(objArray) {
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
        if (line != '') line += ','

        line += array[i][index];
      }

      str += line + '\r\n';
    }

    return str;
  }



  exportCSVFile(headers, items, fileTitle) {
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
    if (navigator.msSaveBlob) { // IE 10+
      navigator.msSaveBlob(blob, exportedFilenmae);
    } else {
      var link = document.createElement("a");
      if (link.download !== undefined) { // feature detection
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
  }


}
