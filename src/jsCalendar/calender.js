const email = window.email;

console.log(email);

//var email = "sebeleg51@gmail.com";
var timezone = "Europe/Berlin";
var iframeSrc = "https://calendar.google.com/calendar/embed?src=" + email + "&ctz=" + timezone;

var iframe = document.createElement("iframe");
iframe.src = iframeSrc;
iframe.style.border = "0";
iframe.width = "800";
iframe.height = "600";
iframe.frameborder = "0";
iframe.scrolling = "no";

var calendarEl = document.getElementById("calendar");
calendarEl.appendChild(iframe);