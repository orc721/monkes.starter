////////////////////
// wrapper for jquery plugin

function register_jquery_fn_football( $ ) {
   // 'use strict';

    function setup_football_widget( el, opts ) {
      var football_widget = football_widget_new( el, opts );
      
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
