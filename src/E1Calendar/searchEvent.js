import { fetchEvents } from "./fetchEvents.js";

var startDate = view.activeStart;
var endDate = view.activeEnd;
var events;

document.addEventListener("click", function () {
  events = fetchEvents(startDate, endDate);
})

function test() {
  console.log(events);
}

function searchEvents() {
  // Declare variables
  var input, filter, li, a, i, txtValue;
  input = document.getElementById('search');
  filter = input.value.toUpperCase();

  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < li.length; i++) {
    a = events[i].getElementsByTagName("a")[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      events[i].style.display = "";
    } else {
      events[i].style.display = "none";
    }
  }
}






















// function myFunction() {
//   // Declare variables
//   var input, filter, li, a, i, txtValue;
//   input = document.getElementById('search');
//   filter = input.value.toUpperCase();

//   // Loop through all list items, and hide those who don't match the search query
//   for (i = 0; i < li.length; i++) {
//     a = events[i].getElementsByTagName("a")[0];
//     txtValue = a.textContent || a.innerText;
//     if (txtValue.toUpperCase().indexOf(filter) > -1) {
//       events[i].style.display = "";
//     } else {
//       events[i].style.display = "none";
//     }
//   }
// }
