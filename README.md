# Converting-Firebase-Data-in-to-.CSV-format
Create and Download Firebase Realtime Database Data in .CSV file 

# Current Process:

Google Firebase cloud Realtime Database stores the information in JSON (Java Script Object Notation) format – Which may not be usable format for the end users.<br /> 
There is no direct tools/ technology available to extract and download the Firebase JSON Data to a more readable CSV Format.

# ITA SAS Mobile Solution: “Dynamic Download of Firebase JSON data to CSV”

 ITA SAS Mobile Built a Dynamic configurable solution to enable the following

•Allow the users to configure on a simple configuration file the information user want to download from firebase.
•Application automatically generate the UI Screens in table format for visualizing the data from firebase on the web screen.
•Application automatically generated download option on Web UI Screen to download the firebase data in CSV format.
•User can control at Individual Table level and Field level information they wanted to download using the dynamic configuration option.

# Technology Stack:
This open source project was developed using AngularJS with HTML, CSS and JS. 

# Steps for the App setup:
Below steps explains option to configure the application on “Firebase Hosting”.
	Step-1: Download the source code.<br />
	Step-2: Configure the JSON Configuration file <br />
	Step-3: Deploy the application on Firebase Hosting.<br />
Find the detailed information on each step below

## Step-1: Download
You can download the source code from the current Git Repository 
## Step-2: Configuring JSON file
a.Setting up your firebase information <br />
	In scr/app/app.module.ts
	replace below red coloured constants with your firebase keys<br />
	export const firebaseConfig = {<br />
	  apiKey: "- ![#f03c15](AIzaSyBYQ379YPaNXXXXXXXXXXXXXXXXXXX")`#f03c15`,<br />
	  authDomain: "- ![#f03c15](task2-fd8ad.firebaseapp.com)`#f03c15`",<br />
	  databaseURL: "- ![#f03c15](https://task2-fd8ad.firebaseio.com)`#f03c15`",<br />
	  projectId: "- ![#f03c15](task2-fd8ad)`#f03c15`",<br />
	  storageBucket: "- ![#f03c15](task2-fd8ad.appspot.com)`#f03c15`",<br />
	  messagingSenderId: "- ![#f03c15](420003144879)`#f03c15`"<br />
	}<br />
	( Above code will help you to  link with firebase )<br />


b.Setup Table name(s) and field Names<br />
	In scr/assets/data/firebaseData.json <br />
	{<br />
	    "firebasetable1":<br />
	    {<br />
	    "firebasedb": "the firebase db to which you need to connect",<br />
	    "categoryName": "This will be displayed on the web site",<br />
	    "firebaseTable":"firebase database table name",      <br />
	    "field1": "field name which you want download from Firebase",<br />
	    "field2": "field name which you want download from Firebase",<br />
	    "field3": field name which you want download from Firebase",<br />
	    }<br />
	  }<br />
	** The sequence should in same format <br />
## Sample 
	{
	    "firebasetable1":
	    {
	    "firebasedb": "http://firebase",
	    "categoryName": "list of all schools",
	    "firebaseTable":"schools",      
	    "field1": "schoolname",
	    }
	  }


## Step-3: Firebase deploy and hosting 
	Please refer the firebase documentation for firebase hosting
	•https://firebase.google.com/docs/hosting/deploying
	•https://firebase.google.com/docs/hosting/quickstart

Open source License:
	- Open Source License Agreement - The MIT License

	- Copyright (c) 2018 ITA(Information Technology Authority), Govt of Oman, Sultanate of Oman.
	- Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated 	documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to 		permit persons to whom the Software is furnished to do so, subject to the following conditions:
	- The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
	- THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


