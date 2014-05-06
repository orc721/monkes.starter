define( function(require) {
 'use strict';

            require( 'utils' );
  var Api = require( 'football.api' );
  // todo: check - use Football.Api or Football.Service  why? why not??

  var roundsTpl  = require( 'text!templates/rounds-today.html');

  var renderRoundsDef = _.template( roundsTpl );

  var Widget = {};

Widget.create = function( id, opts ) {

  var $el,
      $rounds;   // used for rounds

  var renderRounds;

  var api;

  var defaults = { };
  var settings;


  function init( id, opts )
  {
     settings = _.extend( {}, defaults, opts );

     debug( 'api: '   + (settings.api !== undefined) );

     if( settings.api === undefined || settings.api === null )
        api = Api.create();
     else
        api = settings.api;

     renderRounds = renderRoundsDef;

     $el  = $( id );
     $el.addClass( 'football-widget' );  // for styling add always .football-widget class

     $rounds = $( '<div />' ).addClass( 'rounds' );
    
     $el.append( $rounds );

     update();
  }


  function update()
  {
    debug( 'update rounds for today' );
    api.fetchRoundsToday( function( data ) {
         var snippet;

         if( data.rounds.length === 0 )
            snippet = "<p>No rounds scheduled today!</p>";
         else 
            snippet = renderRounds( { rounds: data.rounds } );

         $rounds.html( snippet );
    });
  }

  // call "c'tor/constructor"
  init( id, opts );

  // return/export public api
  return {
     update: update
  }
} // end fn Widget.create

  return Widget;

}); // end define