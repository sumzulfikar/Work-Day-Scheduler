//Show current day at the top in the following format Thursday, Sept 5th

var day=dayjs().format("dddd[,] MMM D")
console.log(day);
$("#currentDay").text(day);

//create a table for the day planner in container
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

//Selecting business hour between 9 am to 5pm for the current day

var businessStart=dayjs().hour("9");
var businessEnd=dayjs().hour("17")
var currentHour=dayjs().get("hour");

//Creating rows based on hours within today's business hour

for (var hour=businessStart.get("hour"); hour<=businessEnd.get("hour"); hour++) {
  var row=document.createElement("tr");
  var cell1=document.createElement("td");
  var cell2=document.createElement("td");
  var cell3=document.createElement("td");
  
  var hourText = dayjs().set("hour",hour).format("h A");

  cell1.textContent=hourText;
  var formarea=document.createElement("form");
  var textbox=document.createElement("input");
  var saveBtn=document.createElement("i");
  textbox.setAttribute("type","text");
  formarea.appendChild(textbox);
  cell2.appendChild(formarea);
  saveBtn.setAttribute("class","fa-solid fa-floppy-disk")
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

