// 1) Разработать консольное приложение "Поиск последнего созданного файла с заданным расширением":
//Входные данные: путь к папке и расширение файла
//Выходные данные: самый последний по дате создания файл заданного расширения. Если в директории несколько файлов с заданным расширением, то результатом должен быть самый "свежий" файл +  список файлов дата создания которых отличается от этого файла не более чем на 10 секунд.

const fs = require('fs');
const path = require('path');

let pathDir = 'D:/task1/';
let extensionFile = ".txt";

function FileDataObj(name,data)
{
   this.name = name;
   this.data = data;
}

const arrObjects = []; 
fs.readdir(pathDir, (err, data) => 
{ 
   data.forEach( file => 
   {
      if (path.extname(file) == extensionFile)
      {
         arrObjects.push(new FileDataObj(file,fs.statSync(pathDir+ file).birthtime))
      }
            
   })

   ///////////////////////////////////////////////////////////////////////////////// question for sasha (why I cant move it out this funcional)
   //1. самый последний по дате создания файл заданного расширения
   let latestDateOfFile = findDateOfLatestFile(arrObjects);
   let indexOfLatestFile = getIndexByData(latestDateOfFile);
   let nameOfLatestFile = getNameOfFileByIndex(arrObjects, indexOfLatestFile);
   console.log("Lastest file in dir: "+ nameOfLatestFile)

  /////////////////////////////////////////////////////////////////////////////////
  //2. список файлов дата создания которых отличается от этого файла не более чем на 10 секунд.
  ShowLatestFileInDiapazon(arrObjects, 10)
});



function findDateOfLatestFile(array)
{
   let dateOfLatestFile = array[0].data;
   for(i = 1; i < array.length; i++)
   {
      if(dateOfLatestFile < array[i].data)
      {
         dateOfLatestFile = array[i].data;
      }
   }
   return dateOfLatestFile;
}

function getIndexByData(data)
{
   return arrObjects.findIndex(el => el.data === data);
}

function getNameOfFileByIndex(array,index)
{
   return array[index].name;
}
  
function ShowLatestFileInDiapazon(array, sec)
{
   let lastestFileDate = findDateOfLatestFile(array);
   var newDate = new Date(lastestFileDate);
   newDate.setSeconds(lastestFileDate.getSeconds() - sec);

   for(let file of array)
   {
      if(file.data >= newDate && file.data < lastestFileDate)
      {
         console.log(file.name);
      }
   }
}
      















// console.log("111122221");
// alert("Hello!1")

// const constNumber = 25; //camelCase
// let age = 21


// var path="D:\JS\index.html";
// var fs=require('fs');
// fs.stat(path, function(err,stat){
//     console.log(err,stat);
// });

//for(let car of cars){block code}


//ctrl+b
//ctrl+tab  
//ctrl+