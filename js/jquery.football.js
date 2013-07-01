
var sportdb_widget_new = function( widget_id, tpl_id, api_path_prefix ) {
  
  // todo: use options
  //   make api_path_prefix into an option
  //
  // that is, use defaults
  
  var _api_path_prefix = '';
  var _$widget;
  var _$tpl;
  
  function _init( widget_id, tpl_id, api_path_prefix )
  {
    _api_path_prefix = api_path_prefix;
    _$widget  = $( widget_id );
    _tpl      = $( tpl_id ).html();   // todo: check if it returns jquery object or just plain js{    
  }

  
  function _fetch_round( event_key, round_pos, onsuccess )
  {
    var api_link = _api_path_prefix + "/event/" + event_key + "/round/" + round_pos + "?callback=?"; 
    $.getJSON( api_link, onsuccess );
  }

  function _update( event_key, round_pos )
  {
    _fetch_round( event_key, round_pos, function( json ) {
    
        var snippet = _.template( _tpl, { data: json } );
        _$widget.html( snippet );

    }); 
  }  // fn _update

  // call "c'tor/constructor"
  _init( widget_id, tpl_id, api_path_prefix );

  // return/export public api
  return {
     update: _update
  }
} // fn sportdb_widget_new

