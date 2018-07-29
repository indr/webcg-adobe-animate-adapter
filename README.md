# webcg-adobe-animate-adapter

webcg-adobe-animate-adapter is an adapter to use Adobe Animate HTML5 Canvas templates (graphic overlays) with CasparCG. The adapter provides the same features as the TemplateHost of the CasparCG's flash producer, plus additional development and debug tools that make it easy to test your templates without a CasparCG instance.

- Support of ACMP commands `play`, `next`, `stop`, `update` and `invoke`.
- Support of "intro" and "outro" labels.
- Support of three data formats: plain JavaScript object, JSON and the templateData XML format.
- Automatic update of template instances according to the provided data via `update`.
- The adapter comes with lazy-loaded [development tools](https://github.com/indr/webcg-devtools) that provide a user interface to edit the template data and invoke the above commands.

## Installation

*This section describes how to install and integrate the adapter with your existing Adobe Animate HTML5 Canvas template. If you are looking for full instructions on how to create HTML5 Canvas templates with Adobe Animate, head over to my blog and follow the [tutorial](https://indr.ch/).*

 - Visit https://github.com/indr/webcg-adobe-animate-adapter/releases and download the latest version.
 - Extract the archive and place the two JavaScript files in the same folder as your Flash file.
 - In Adobe Animate, open your publish settings

## Contributing

`npm run build` builds the library to `dist`.  
`npm run dev` builds the library, then keeps rebuilding it whenever the source files change.  
`npm run test` run the unit tests in watch mode.  
`npm run demo` starts a demo at localhost:8080.

## Copyright and License

Copyright (c) 2018 Reto Inderbitzin, [MIT License](LICENSE)
