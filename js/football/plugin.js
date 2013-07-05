////////////////////
// wrapper for jquery plugin

define( function(require) {

               require( 'utils' );
  var Widget = require( 'football/widget' );
  // todo: check - use Football.Api or Football.Service  why? why not??


  function register_jquery_fn_football( $ ) {
   // 'use strict';

    debug( 'register jquery fn football' );

    function setup_football_widget( el, opts ) {
      var football_widget = Widget.create( el, opts );

      $(el).data( 'widget', football_widget );

      return el;
    }

    $.fn.football = function( opts ) {
        return this.each( function( index, el ) {
          debug( 'before setup_football_widget['+ index +']' );
          setup_football_widget( el, opts );
          debug( 'after setup_football_widget['+ index +']' );
        });
    };
  }

  register_jquery_fn_football( jQuery );

}); // end define
