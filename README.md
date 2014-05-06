# football.js

Football widgets in JavaScript using the [football.db HTTP JSON(P) API](https://github.com/openfootball/api)

## Live Demo

Try the Football widget running
on GitHub Pages [`footballjs.github.io/football.js/matchday.html`](http://footballjs.github.io/football.js/matchday.html).


## Usage Example

    <div id='world'></div>
        
    <script>
      Widget.create( '#world', { event: 'world.2014' } );
    </script>

or as a jQuery plugin

    <div id='world'></div>
    
    <script>
      $( '#world' ).football( { event: 'world.2014' } );
    </script>

That's it.


## Chrome Dev Tips

Tip: If you use Chrome allow local file access (for loading the builtin templates) while you test or develop
by adding the flag `--allow-file-access-from-files`.
Otherwise you will get a cross-domain security error when loading the builtin templates.
Example:

    <path>/chrome.exe --allow-file-access-from-files


## License

The `football.js` scripts are dedicated to the public domain.
Use it as you please with no restrictions whatsoever.

## Questions? Comments?

Send them along to the [Open Sports Database & Friends Forum/Mailing List](http://groups.google.com/group/opensport).
Thanks!
