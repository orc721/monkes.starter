define( function(require) {
 'use strict';

            require( 'utils' );
  var Api = require( 'football/api' );
  // todo: check - use Football.Api or Football.Service  why? why not??

  var tpl_event        = require( 'text!../../templates/event.html' );
  var tpl_rounds_long  = require( 'text!../../templates/rounds-long.html' );
  var tpl_rounds_short = require( 'text!../../templates/rounds-short.html' );
  var tpl_games        = require( 'text!../../templates/games.html' );

  var Widget = {};

Widget.create = function( id, opts ) {

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


  var _tpl_event        = tpl_event;
  var _tpl_rounds_long  = tpl_rounds_long;
  var _tpl_rounds_short = tpl_rounds_short;
  var _tpl_games        = tpl_games;

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
    
     _api = Api.create( api_opts );
     
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

    _api.fetch_rounds( _settings.event, function( data ) {
    
      var snippet;
      
      if( data.rounds.length >= 16 )
        snippet = _render_rounds_short( { rounds: data.rounds } );
      else
        snippet = _render_rounds_long( { rounds: data.rounds } );

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

  function _update_round( round )
  {
    debug( 'update round: ' + round );

    _api.fetch_round( _settings.event, round, function( data ) {
    
      var snippet = _render_games( { games: data.games } );
      _$div_games.html( snippet );

      var snippet2 = _render_event( { event: data.event, round: data.round } );
      _$div_event.html( snippet2 );

    }); 
  }  // fn _update

  // call "c'tor/constructor"
  _init( id, opts );

  // return/export public api
  return {
     update: _update
  }
} // end fn Widget.create

  return Widget;

}); // end define