

var football_widget_new = function( id, opts ) {
  // 'use strict';

  var _$el;
  var _$div_event;    // used for event header 
  var _$div_rounds;   // used for rounds
  var _$div_games;    // used for round details (matches/games)

  var _render_event; // compiled underscore templates - nb: it's just a js function
  var _render_rounds_long;
  var _render_rounds_short;
  var _render_games;   

  var _api;

  var _defaults = {
                tplId: null
              };
  var _settings;


  var _tpl_event = "" +
"<h3>" +
" <%= data.event.title %>" +
"   -  " +
" <%= data.round.title %>" +
"</h3>" +
"";


  var _tpl_rounds_long = "" +
"    <% _.each( data.rounds, function( round, index ) { %>" +
"" +
"      <%  if( index > 0 ) { %>" +
"        |" +
"      <% } %>" +
"" +
"      <a href='#' data-round='<%= round.pos %>'>" +
"        <%= round.title %>" +
"      </a>" +
"" +
"    <% }); %>" +
"";


  var _tpl_rounds_short = "" +
"    <% _.each( data.rounds, function( round, index ) { %>" +
"" +
"      <%  if( data.rounds.length/2 === index ) { %>" +
"         <br>" +
"      <% } else {" +
"            if( index > 0 ) { %>" +
"             |" +
"      <% }} %>" +
"" +
"      <a href='#' data-round='<%= round.pos %>'>" +
"        <%= round.pos %>" +
"      </a>" +
"" +
"    <% }); %>" +
"";

  var _tpl_games = "" +
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
  
  
  
  function _init( id, opts )
  {
     _settings = _.extend( {}, _defaults, opts );

     debug( 'tplId: ' + _settings.tplId );
     debug( 'apiPathPrefix: ' + _settings.apiPathPrefix );
    
     // pass along api opts if available
     var api_opts = {};
     if( _settings.apiPathPrefix !== undefined && _settings.apiPathPrefix !== null ) {
       api_opts.apiPathPrefix = _settings.apiPathPrefix;
     }
    
     _api = football_api_new( api_opts );
    
     
     var tpl_str = '';

     if( _settings.tplId == null ) {
      // use builtin template
        tpl_str = _tpl_games;
     }
     else 
     { // use user specified/supplied template
       tpl_str = $( _settings.tplId ).html();
     }

     _render_games  = _.template( tpl_str );
     
     _render_event  = _.template( _tpl_event );
     
     _render_rounds_short = _.template( _tpl_rounds_short );
     _render_rounds_long  = _.template( _tpl_rounds_long );


    _$el  = $( id );
    _$el.addClass( 'football-widget' );  // for styling add always .football-widget class
    
    _$div_event  = $( '<div />' ).addClass( 'event' );
    _$div_rounds = $( '<div />' ).addClass( 'rounds' );
    _$div_games  = $( '<div />' ).addClass( 'games' );
    
    _$el.append(  _$div_event, _$div_rounds, _$div_games );
    
    _update_rounds();

    _update_round( '1' );
  }


  function _update() { }

  function _update_rounds()
  {
    debug( 'update rounds' );

    _api.fetch_rounds( _settings.event, function( json ) {
    
      var snippet;
      
      if( json.rounds.length >= 16 )
        snippet = _render_rounds_short( { data: json } );
      else
        snippet = _render_rounds_long( { data: json } );

      _$div_rounds.html( snippet );

      // add click funs - assumes links with data-round='3' etc.
      // - todo/check: is there a better way to add click handlers in templates?
      _$div_rounds.find( 'a' ).click( function() {
        debug( 'click update round' );
        var $link = $(this);
        var round = $link.data( 'round' );
         debug( 'data-round:' + round );
         _update_round( round );
         return false;
      });

    }); 
  }

  function _update_round( round_pos )
  {
    debug( 'update round: ' + round_pos );

    _api.fetch_round( _settings.event, round_pos, function( json ) {
    
      var snippet = _render_games( { data: json } );
      _$div_games.html( snippet );
      
      var snippet2 = _render_event( { data: json } );
      _$div_event.html( snippet2 );

    }); 
  }  // fn _update

  // call "c'tor/constructor"
  _init( id, opts );

  // return/export public api
  return {
     update: _update
  }
} // fn football_widget_new
