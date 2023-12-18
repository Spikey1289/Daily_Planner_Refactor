// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

var date = new Date();
console.log(date);

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

$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?

  $(".saveBtn").click(function () {
    var input = $(this).siblings("textarea").val();
    var hour = $(this).parent().attr("id");

    storedTasks[hour] = input.trim();
    localStorage.setItem("storedTasks", JSON.stringify(storedTasks));
    console.log(JSON.parse(localStorage.getItem("storedTasks"))[hour])
  });
  
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?

  $(".time-block").each(function (index){
    var dTime = date.getHours();
    var hour = parseInt($(this).attr("id").substring(4));

    if (dTime > hour){
      console.log("48");
      $(this).addClass("past");
      $(this).removeClass("present");
      $(this).removeClass("future");
    } else if (dTime == hour) {
      console.log("53");
      $(this).addClass("present");
      $(this).removeClass("past");
      $(this).removeClass("future");
    } else {
      console.log("57");
      $(this).addClass("future");
      $(this).removeClass("past");
      $(this).removeClass("present");
    }
  });

  
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?

  $(".time-block").each(function (index) {
    var hour = $(this).attr("id");

    $(this).children("textarea").val(JSON.parse(localStorage.getItem("storedTasks"))[hour]);
    storedTasks[hour] = JSON.parse(localStorage.getItem("storedTasks"))[hour]
  });

  //
  // TODO: Add code to display the current date in the header of the page.
});
