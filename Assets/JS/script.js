var date = new Date();

var storedTasks = {
  hour9: "",
  hour10: "",
  hour11: "",
  hour12: "",
  hour13: "",
  hour14: "",
  hour15: "",
  hour16: "",
  hour17: ""
};

function dateString() {
  var DoW = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  var Month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  var DateString = DoW[date.getDay()] + ", " + Month[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();

  return DateString;
}

$(function () {
  // a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage.

  $(".saveBtn").click(function () {
    var input = $(this).siblings("textarea").val();
    var hour = $(this).parent().attr("id");

    storedTasks[hour] = input.trim();
    localStorage.setItem("storedTasks", JSON.stringify(storedTasks));
  });
  
  // code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour.

  $(".time-block").each(function (index){
    var dTime = date.getHours();
    var hour = parseInt($(this).attr("id").substring(4));

    if (dTime > hour){
      $(this).addClass("past");
      $(this).removeClass("present");
      $(this).removeClass("future");
    } else if (dTime == hour) {
      $(this).addClass("present");
      $(this).removeClass("past");
      $(this).removeClass("future");
    } else {
      $(this).addClass("future");
      $(this).removeClass("past");
      $(this).removeClass("present");
    }
  });

  
  // code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements.

  $(".time-block").each(function (index) {
    var hour = $(this).attr("id");

    $(this).children("textarea").val(JSON.parse(localStorage.getItem("storedTasks"))[hour]);
    storedTasks[hour] = JSON.parse(localStorage.getItem("storedTasks"))[hour]
  });

  
  // code to display the current date in the header of the page.

  $("#currentDay").text(dateString());

});
