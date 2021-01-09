$(document).ready(function () {
  let dailySchedule = ["", "", "", "", "", "", "", "", ""];
  let currentHour = dayjs().hour();
  $("#currentDay").text(dayjs().format("dddd, MMMM D, YYYY h:mm:ss A"));

  // Check local storage for values, and assign to array if needed
  if (localStorage.getItem("Daily Schedule")) {
    dailySchedule = JSON.parse(localStorage.getItem("Daily Schedule"));
  }

  // Iterate through daily schedule
  for (let i = 0; i < dailySchedule.length; i++) {
    // Offset i to align with hours of operation
    let hour = i + 9;

    // Construct each individual row
    let hourRow = $("<div>").addClass("row");
    let hourTime = $("<div>").addClass("col-2 hour");
    // Corrects times from military standard and adds AM/PM
    $(hourTime).html(
      (hour <= 12 ? hour : hour % 12) + (hour < 12 ? " am" : " pm")
    );
    // Determine correct color for textarea
    let hourText = $("<textarea>")
      .addClass(
        `col-8 ${
          hour < currentHour
            ? "past"
            : hour > currentHour
            ? "future"
            : "present"
        } note${hour}`
      )
      .val(dailySchedule[i]);
    let hourButton = $("<div>").addClass("col-2 saveBtn").attr("save", hour);
    let hourIcon = $("<i>").addClass("fas fa-save");
    $(hourButton).append(hourIcon, "<span> Save</span>");
    $(hourRow).append(hourTime, hourText, hourButton);
    // Connect all elements with the html document
    $(".container").append(hourRow);
  }

  //Timer updates clock and row colors as ime moves on.
  setInterval(() => {
    if (currentHour === dayjs().hour() - 1) {
      $(`.note${currentHour}`).removeClass("present").addClass("past");
      $(`.note${currentHour + 1}`)
        .removeClass("future")
        .addClass("present");
      currentHour = dayjs().hour();
    }
    $("#currentDay").text(dayjs().format("dddd, MMMM D, YYYY h:mm:ss A"));
  }, 1000);

  // Save content of text area
  $(".saveBtn").on("click", function () {
    let indexOfClick = $(this).attr("save");
    // Uses indexOfClick - 9 to undo offset
    dailySchedule[indexOfClick - 9] = $(`.note${indexOfClick}`).val();
    localStorage.setItem("Daily Schedule", JSON.stringify(dailySchedule));
  });
});
