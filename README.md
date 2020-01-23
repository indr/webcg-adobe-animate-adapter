# webcg-adobe-animate-adapter

webcg-adobe-animate-adapter is an adapter to use Adobe Animate HTML5 Canvas templates (graphic overlays) with CasparCG. The adapter provides the same features as the TemplateHost of the CasparCG's flash producer, plus additional development and debug tools that make it easy to test your templates without a CasparCG instance. Have a look at the [live example lower third template](https://indr.github.io/webcg-adobe-animate-adapter) and its [source code](https://github.com/indr/webcg-adobe-animate-adapter/tree/master/docs).

## Features

- Support of ACMP commands `play`, `next`, `stop`, `update` and `invoke`.
- Support of "intro" and "outro" labels for playing and stopping.
- Support of jumping to labels using ACMP `invoke`.
- Automatic update of template instances according to the provided data via `update`.
- Three data formats: plain JavaScript object, JSON and the templateData XML format.
- The adapter comes with lazy-loaded [development tools](https://github.com/indr/webcg-devtools) that provide a user interface to edit the template data and invoke the above commands.

## Installation

*This section describes how to install and integrate the adapter with your existing Adobe Animate HTML5 Canvas template. If you are looking for full instructions on how to create HTML5 Canvas templates with Adobe Animate, head over to my blog and follow the [tutorial](https://indr.ch/).*

 - Visit https://github.com/indr/webcg-adobe-animate-adapter/releases and download the latest webcg-adobe-animate-adapter.zip.
 - Extract the archive and place the two JavaScript files `webcg-adobe-animate-adapter.umd.js` and `webcg-devtools.umd.js` in the `libs` folder of your Adobe Animate project.
 - Include `webcg-adobe-animate-adapter.umd.js` in your publish template by either
   - adding `<script src="libs/webcg-adobe-animate-adapter.umd.js"></script>` after the `<title>$TITLE</title>`, or
   - importing the publish template `Adobe-Animate-Publish-Template.html`, or
   - importing the publish profile `Adobe-Animate-Publish-Profile.apr`.
 - Test your movie and append `&debug=true` in your browsers address bar or  
   publish your movie, open the HTML file and append `?debug=true` to see the DevTools.

## Contributing

`npm run build` builds the library to `dist`.  
`npm run dev` builds the library, then keeps rebuilding it whenever the source files change.  
`npm run test` run the unit tests in watch mode.  
`npm run demo` starts a demo at localhost:8080.

## Copyright and License

Copyright (c) 2018 Reto Inderbitzin, [MIT License](LICENSE)
