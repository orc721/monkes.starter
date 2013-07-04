
///////////////////////////
// debug utils

function debug( msg ) {
  if( window.console && window.console.log ) {
      window.console.log( '[debug] '+msg );
  }
}

////////////////////////////
// date utils


var month_names = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December' ];

var day_names = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday' ];

function fmt_date( date ) {

  return day_names[ date.getDay()] +
          ", " +
         month_names[ date.getMonth()] +
          " " +
         date.getDate() +
          " " +
         date.getFullYear();
}

