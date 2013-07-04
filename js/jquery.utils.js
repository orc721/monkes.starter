
///////////////////////////
// debug utils

function debug( msg ) {
  if( window.console && window.console.log ) {
      window.console.log( '[debug] '+msg );
  }
}

////////////////////////////
// date utils

function cmp_date( date1, date2 ) {
   if( date1.getDate()     === date2.getDate()  &&
       date1.getMonth()    === date2.getMonth()  &&
       date1.getFullYear() === date2.getFullYear() )
     return 0;
   else
     return 1;  // todo: return -1 or 1 if greater or smaller
}


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

