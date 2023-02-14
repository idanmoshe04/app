

// //לאחר טעינת העמוד
document.addEventListener("DOMContentLoaded", function (event) {
});

//  function uploadFiles() {
//   var files = document.getElementById('file_upload').files;
//   if(files.length==0){
//       alert("Please first choose or drop any file(s)...");
//       return;
//   }
//   var filenames="";
//   for(var i=0;i<files.length;i++){
//       filenames+=files[i].name+"\n";
//   }
//   alert(" הקבצים נשלחו למייל המיועד"+ " " +filenames);
// }

// פונקציה לשליפת השאלות מבסיס הנתונים
async function Post() {



    var file = document.getElementById("uploadFile").files[0];
    var fileInfo = {
        name: file.name,
        size: file.size,
        type: file.type
    };

    var formData = new FormData();
    formData.append("file", file);
    formData.append("fileInfo", JSON.stringify(fileInfo));

    //  שמירת הנתיב לבסיס הנתונים עם פרמטר של הנושא שנבחר
    //  צריך לעדכן בהתאם לנתיב של ה-API שלכם
    const url = `https://localhost:7299/WeatherForecast`;
    //  שמירת הפרמטרים לשליפה: סוג השליפה ומבנה הנתונים שיוחזר
    const params = {
        method: "POST",
        body: formData
    }// ביצוע הקריאה לשרת, נשלח את הנתיב והפרמטרים שהגדרנו
    const response = await fetch(url, params);
    //  במידה והערך שהוחזר תקין
    if (response.ok) {
        //  נמיר את התוכן שחזר לפורמט json
        const data = await response.json();
        console.log(data);
        document.getElementById("preview").innerHTML = "הקבצים נשלחו בהצלחה!!";

    } else {
        // נציג את השגיאות במידה והערך לא תקין
        const errors = response.text();
        console.log(errors);
    }
}

function uploadFiles() {
    Post();
}




"use strict";
function dragNdrop(event) {
    var x = document.getElementById("uploadFile");

    var txt = "";
    if ('files' in x) {
        if (x.files.length == 0) {
            txt = "Select one or more files.";
        } else {
            for (var i = 0; i < x.files.length; i++) {
                txt += "<strong> files" + (i + 1) + "</strong>";
                var file = x.files[i];
                if ('name' in file) {
                    txt += file.name + "<br>";
                }
            }
        }
    }
    else {
        if (x.value == "") {
            txt += "Select one or more files.";
        } else {
            txt += "The files property is not supported by your browser!";
            txt += "<br>The path of the selected file: " + x.value; // If the browser does not support the files property, it will return the path of the selected file instead. 
        }
    }
    document.getElementById("preview").innerHTML = txt;



}



function drag() {
    document.getElementById('uploadFile').parentNode.className = 'draging dragBox';
}
function drop() {
    document.getElementById('uploadFile').parentNode.className = 'dragBox';
}



