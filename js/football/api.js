////////////////////////////////////
// football.db api wrapper

define( function(require) {
 'use strict';

  require( 'utils' );
  
  var Api = {};

Api.create = function( opts )
{

  var _defaults = {
            // todo/fix: rename to apiBaseUrl ??? check for convention ? or better just baseUrl
                apiPathPrefix: 'http://footballdb.herokuapp.com/api/v1'
              };
  var _settings;


  function _init( opts )
  {
    _settings = _.extend( {}, _defaults, opts );
    
    debug( 'apiPathPrefix: ' + _settings.apiPathPrefix );
  }


  function _fetch( path, onsuccess )
  {
    var apiUrl = _settings.apiPathPrefix + path + '?callback=?';
    $.getJSON( apiUrl, onsuccess );
  }

  function _fetch_rounds( event, onsuccess )
  {
    _fetch( '/event/' + event + '/rounds', onsuccess );
  }

  function _fetch_round( event, round, onsuccess )
  {
    _fetch( '/event/' + event + '/round/' + round, onsuccess );
  }

  // call "c'tor/constructor"
  _init( opts );

  // return/export public api
  return {
     fetch_round:  _fetch_round,
     fetch_rounds: _fetch_rounds
  }
} // end fn Api.create

  return Api;

}); // end define