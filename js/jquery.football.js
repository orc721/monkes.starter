

////////////////////////////////////
// football.dp api wrapper

var sportdb_api_new = function( opts )
{
  var _defaults = {
                apiPathPrefix: 'http://footballdb.herokuapp.com/api/v1',
              };
  var _settings;

  function _debug( msg ) {
      if( window.console && window.console.log ) {
        window.console.log( '[debug] '+msg );
      }
    }

  function _init( opts )
  {
    _settings = _.extend( {}, _defaults, opts );
    
    _debug( 'apiPathPrefix: ' + _settings.apiPathPrefix );
  }

  function _fetch_round( event_key, round_pos, onsuccess )
  {
    var api_url = _settings.apiPathPrefix + '/event/' + event_key + '/round/' + round_pos + '?callback=?'; 
    $.getJSON( api_url, onsuccess );
  }

  // call "c'tor/constructor"
  _init( opts );

  // return/export public api
  return {
     fetch_round: _fetch_round
  }
} // fn sportdb_api_new




var sportdb_widget_new = function( id, opts ) {
  
  var _$el;
  var _$div1;
  var _$div2;
  var _render_round;   // compiled underscore template - nb: it's just a js function
  var _api;

  var _defaults = {
                tplId: null
              };
  var _settings;
  

  function _debug( msg ) {
      if( window.console && window.console.log ) {
        window.console.log( '[debug] '+msg );
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
  
  
  
  function _init( id, opts )
  {
     if( typeof id === 'string' ) {
       _debug( 'sportdb_widget_new id: ' + id );
     }
     else
     {
       _debug( 'sportdb_widget_new w/ el' );
     }
    
     _settings = _.extend( {}, _defaults, opts );

     _debug( 'tplId: ' + _settings.tplId );
     _debug( 'apiPathPrefix: ' + _settings.apiPathPrefix );
    
     // pass along api opts if available
     var api_opts = {};
     if( _settings.apiPathPrefix !== undefined && _settings.apiPathPrefix !== null ) {
       api_opts.apiPathPrefix = _settings.apiPathPrefix;
     }
    
     _api = sportdb_api_new( api_opts );
    
     
     var tpl_str = '';

     if( _settings.tplId == null ) {
      // use builtin template
        tpl_str = _def_tpl_round;
     }
     else 
     { // use user specified/supplied template
       tpl_str = $( _settings.tplId ).html();
     }

     _render_round  = _.template( tpl_str );

    _$el  = $( id );
    
    _$div1 = $( '<div />' );
    _$div2 = $( '<div />' );
    _$el.append(  _$div1, _$div2 );
    
    _update( '1' );
    _build_nav();
  }

  
  function _build_nav() {

     _.each( _settings.rounds, function( round_pos, index ) {
  
       _debug( 'build round_pos ' + round_pos );
       // _$div1.append( )
       
            var $link = $( "<a href='#'>" + round_pos + "</a>" );
            $link.click( function() {
               _debug( 'onclick - update round_pos: ' + round_pos );
               _update( round_pos );
             });
            if( index > 0 ) {
              _$div1.append( " | " );
            }
            _$div1.append( $link );
     });

/*
    <p>
   <a href="#" onclick="sportdb_widget.update( 'euro.2012', '1' ); return false;">1</a> |
   <a href="#" onclick="sportdb_widget.update( 'euro.2012', '2' ); return false;">2</a> |
   <a href="#" onclick="sportdb_widget.update( 'euro.2012', '3' ); return false;">3</a> |
   <a href="#" onclick="sportdb_widget.update( 'euro.2012', '4' ); return false;">4</a> |
   <a href="#" onclick="sportdb_widget.update( 'euro.2012', '5' ); return false;">5</a> |
   <a href="#" onclick="sportdb_widget.update( 'euro.2012', '6' ); return false;">6</a>
</p>
*/
  }
  

  function _update( round_pos )
  {
    _api.fetch_round( _settings.event, round_pos, function( json ) {
    
      var snippet = _render_round( { data: json } );
      _$div2.html( snippet );

    }); 
  }  // fn _update

  // call "c'tor/constructor"
  _init( id, opts );

  // return/export public api
  return {
     update: _update
  }
} // fn sportdb_widget_new




////////////////////
// wrapper for jquery plugin

function register_jquery_fn_football( $ ) {

    function debug( msg ) {
      if( window.console && window.console.log ) {
        window.console.log( '[debug] '+msg );
      }
    }

    debug( 'before add jquery fn football' );

    function setup_sportdb_widget( el, opts ) {
      debug( 'hello from setup_sportdb_widget' );
      var sportdb_widget = sportdb_widget_new( el, opts );
      var $el = $(el);
      
      $el.data( 'widget', sportdb_widget );

      return el;
    }

    $.fn.football = function( opts ) {
        debug( 'calling football' );
        return this.each( function( index, el ) {
          debug( 'before setup_sportdb_widget['+ index +']' );
          setup_sportdb_widget( el, opts );
          debug( 'after setup_sportdb_widget['+ index +']' );
        });
    };

    debug( 'after add jquery fn football' );
}

register_jquery_fn_football( jQuery );
