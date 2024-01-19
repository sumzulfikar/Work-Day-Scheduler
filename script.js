//Show current day at the top in the following format Thursday, Sept 5th

var day=dayjs().format("dddd[,] MMM D")
console.log(day);
$("#currentDay").text(day);

setInterval(function () {
    $("#currentDay").text(day);
  }, 60000);
//create a table for the day planner in container
var plannerArea=document.getElementById("plannerArea");
var table=document.createElement("table");
table.setAttribute("class","table-primary");
plannerArea.appendChild(table);


console.log(table.textContent)

  //Show only weekdays
  $( "#datepicker" ).datepicker({
    showWeek: true,
    firstDay: 1
  });