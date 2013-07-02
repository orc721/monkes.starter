
var sportdb_widget_new = function( widget_id, opts ) {
  
  // todo: use options
  //   make api_path_prefix into an option
  //
  // that is, use defaults
  
  var _api_path_prefix = '';
  var _$widget;
  var _render_round;   // compiled underscore template - nb: it's just a js function

  var _settings;
  var _defaults = {
                apiPathPrefix: 'http://footballdb.herokuapp.com/api/v1',
                tplId: null
              };

  function _debug( msg ) {
      if( window.console && window.console.log ) {
        window.console.log( "[debug] "+msg );
      }
    }

  var _def_tpl_round = "" +
"<h3>" +
" <%= data.event.title %>" +
"   -  " +
" <%= data.round.title %>" +
"</h3>" +
""  +
"<table>" +
" <% _.each( data.games, function( game, index ) { %>" +
"   <tr>" +
"     <td>" +
"      <%= game.play_at %>" +
"     </td>" +
"     <td style='text-align: right;'>" +
"       <%= game.team1_title %> (<%= game.team1_code %>)" +
"     </td>" +
"" +
"     <td>" +
"      <% if( game.score1 != null && game.score2 != null ) { %>" +
"        <% if( game.score1ot != null && game.score2ot != null ) { %>" +
"          <% if ( game.score1p != null && game.score2p != null ) { %>" +
"             <%= game.score1p %> - <%= game.score2p %> iE / " +
"          <% } %>" +
"           <%= game.score1ot %> - <%= game.score2ot %> nV / " +
"        <% } %>" +
"        <%= game.score1 %> - <%= game.score2 %>" +
"      <% } else { %>" +
"        - " +
"      <% } %>" +
"     </td>" +
"     <td>" +
"      <%= game.team2_title %> (<%= game.team2_code %>)" +
"     </td>" +
"   </tr>" +
"  <% }); %>" +
"</table>";
  
  
  
  function _init( widget_id, opts )
  {
    // todo: check if opts defined? - needed?
    if( $.type( opts ) === 'undefined' )
      opts = {};

    // todo: use _.extend from underscore ???    
    _settings = $.extend( _defaults, opts );
    
     _debug( "tplId: " + _settings.tplId );
     _debug( "apiPathPrefix: " + _settings.apiPathPrefix );
    
     _api_path_prefix = _settings.apiPathPrefix;
     
     var tpl_str = "";

     if( _settings.tplId == null ) {
      // use builtin template
        tpl_str = _def_tpl_round;
     }
     else 
     { // use user specified/supplied template
       tpl_str = $( _settings.tplId ).html();
     }

     _render_round  = _.template( tpl_str );

    _$widget  = $( widget_id );
  }

  
  function _fetch_round( event_key, round_pos, onsuccess )
  {
    var api_link = _api_path_prefix + "/event/" + event_key + "/round/" + round_pos + "?callback=?"; 
    $.getJSON( api_link, onsuccess );
  }

  function _update( event_key, round_pos )
  {
    _fetch_round( event_key, round_pos, function( json ) {
    
        var snippet = _render_round( { data: json } );
        _$widget.html( snippet );

    }); 
  }  // fn _update

  // call "c'tor/constructor"
  _init( widget_id, opts );

  // return/export public api
  return {
     update: _update
  }
} // fn sportdb_widget_new




////////////////////
// wrapper for jquery plugin


/*
(function( $ ) {

    function debug( msg ) {
      if( window.console && window.console.log ) {
        window.console.log( "[debug] "+msg );
      }
    }

    function setup_sportdb_widget( el, opts ) {
      debug( "hello from setup_sportdb_widget" );
      var sportdb_widget = sportdb_widget_new( el, opts );
      var $el = $(el);
      
      // NB: attach table sorter to dom table element
      // - use like $('#table1').data( 'table_sorter' ).hover().sort(1); etc.
      //  or
      //   var t = $('#table1').data( 'table_sorter' );
      //    t.hover().sort(1);
      $el.data( 'widget', sportdb_widget );
      
      // fix: use opts event_key for setup!!!! or similar
      sportdb_widget.update( 'euro.2012', '1' );
      return el;
    }

    debug( 'add jquery fn football' );

    $.fn.football = function( opts ) {
        debug( "calling football" );
        return this.each( function( index, el ) {
          debug( "before setup_sportdb_widget["+ index +"]" );
          setup_sportdb_widget( el, opts );
          debug( "after setup_sportdb_widget["+ index +"]" );
        });
    };

}( jQuery ));
*/