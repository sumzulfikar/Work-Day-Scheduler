//Show current day at the top in the following format Thursday, Sept 5th

var day=dayjs().format("dddd[,] MMM D")
console.log(day);
$("#currentDay").text(day);

//create a table for the day planner in container in HTML
var plannerArea=document.getElementById("plannerArea");
var table=document.createElement("table");
table.setAttribute("class"," table table-active");
table.setAttribute("id","plannerTable");
plannerArea.appendChild(table);

//Below creates a table for the planner 3 columns with rows for each work hour

var tableHeader=document.createElement("thead");
var tableBody=document.createElement("tbody");
table.appendChild(tableHeader);
table.appendChild(tableBody);

//Selecting business hour between 9 am to 5pm for the current day. This is a flexibility 
//in this code so that adusting the hour will adjust the day planner.

var businessStart=dayjs().hour("9");
var businessEnd=dayjs().hour("17")
var currentHour=dayjs().get("hour");

//Creating rows based on hours within today's business hour
var taskArray=[];
var saveArray=[];
  
for (var hour=businessStart.get("hour"); hour<=businessEnd.get("hour"); hour++) {
  var row=document.createElement("tr");
  var cell1=document.createElement("td");
  var cell2=document.createElement("td");
  var cell3=document.createElement("td");
  
  var hourText = dayjs().set("hour",hour).format("h A");

  cell1.textContent=hourText;
  
  //Creating unique ids for each hour for input type text and button

  var uniqueTask="textInput_"+hour;
  var uniqueSave="saveBtn_"+hour;
      taskArray.push(uniqueTask);
      saveArray.push(uniqueSave);

  //Enabling user to input task entries on the hours each day with incremental id
  var formArea=document.createElement("form");
  var textbox=document.createElement("input");
  var saveBtn=document.createElement("i");
  textbox.setAttribute("type","text");
  textbox.setAttribute("class","task");
  textbox.setAttribute("id", uniqueTask);
  
  formArea.appendChild(textbox);
  cell2.appendChild(formArea);
  
  //Using icon and turning it into clickable button to save entries with increamental ids
  saveBtn.setAttribute("class","fa-solid fa-floppy-disk btn btn-primary");
  saveBtn.setAttribute("id",uniqueSave);
  saveBtn.setAttribute("type","button");
  cell3.appendChild(saveBtn);
  
  //Applying bootstrap style table row to colorcode based on present, past and future
      if(hour===currentHour){
        $(row).addClass("table-warning");
      }
       else if(hour<currentHour){
        $(row).addClass("table-secondary");
        textbox.setAttribute("disabled",true);//making sure task cannot be added for past hours
      }
      else if(hour>currentHour){
        $(row).addClass("table-success");
      }
      row.appendChild(cell1);
      row.appendChild(cell2);
      row.appendChild(cell3);
      tableBody.appendChild(row);
}    

// Persisting user's tasked saved during business hour after application refresh

taskArray.forEach(function(uniqueTask, index){
  //Looping through each unique save button and returning saved user input
  var uniqueSave = saveArray[index];
  var saveClick = document.getElementById(uniqueSave);
  var savedUserInput=localStorage.getItem(uniqueTask);
  if (savedUserInput!=null){
    document.getElementById(uniqueTask).value=savedUserInput;
  }


  (function(uniqueTask) {
    saveClick.addEventListener("click", function(event) {
      event.preventDefault();

      // Saving User Input 
      var userInput = document.getElementById(uniqueTask).value;
      localStorage.setItem(uniqueTask, userInput);
    });
  })(uniqueTask);
});

