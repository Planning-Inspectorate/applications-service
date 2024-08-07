# forms-web-app

## Structure

```
.
+-- src
|   +-- api
|   |   +-- ...
|   +-- controllers
|   |   +-- ...
|   +-- lib
|   +-- locales
|   |   +-- cy
|   |   +-- en
|   +-- middleware
|   +-- pages
|   |   +-- ...
|   +-- public
|   |   +-- images
|   |   +-- scripts
|   |   +-- stylesheets
|   +-- routes
|   +-- sass
|   |   +-- ...
|   +-- scripts
|   |   +-- ...
|   +-- services
|   +-- session
|   +-- utils
|   +-- validators
|   |   +-- ...
|   +-- views
|   |   +-- ...
```

|-|-|
|-------------|-----------------------------------------------------------------------------------------------------------------------------------------|
| api         | Exposes a single endpoint to the website for downloading all applications as CSV                                                        |
| controllers | Server-side code called by routes and pages                                                                                             |
| lib         | General-purpose code abstractions                                                                                                       |
| locales     | English and Welsh translations to be used as copy across the site. Translations for specific pages are nested in the `pages` directory. |
| middleware  | Custom express middlewares                                                                                                              |
| pages       | Express routes, controllers and Nunjucks views for the website's pages. Directory structure reflects the site page structure.           |
| public      | Files to be made publicly available for use on this site.                                                                               |
| routes      | Setup of top-level middlewares + any non-page Express routes.                                                                           |
| sass        | Sass stylesheets. These are compiled to CSS and bundled into the `public` directory.                                                    |
| scripts     | Client-side JavaScript code                                                                                                             |
| services    | Methods that call the API. Called elsewhere in the code to make API calls.                                                              |
| session     | Code for accessing and updating data stored in the user session                                                                         |
| utils       | General purpose code abstractions                                                                                                       |
| validators  | `express-validator` code for validating requests made by the client                                                                     |
| views       | Nunjucks code to be reused across multiple pages                                                                                        |


## Creating pages

Inside the `pages` directory is a `router.js` file. Each page has a subdirectory which contains (most importantly) a `controller.js` file and a `view.njk` file. Any other files needed to render the page (like translations and middlewares) also go into this subdirectory.

For larger sub-sections of the site, an additional sub-router can be created to manage its own routing, and imported into the main `router.js` file. There is an example of this in `pages/examination`.


## Client-side JS pattern

To ensure accessibility across the broadest range of browsers, client-side JavaScript should be kept to a minimum.

### Creating a client-side script

Where needed, client-side scripts are added to the `scripts` directory. Each script should have methods to initialise it.

The Webpack config file is responsible for bundling these scripts into the `public` directory. Each script's file path is referenced by the `configAppScripts` and `configPageScripts` objects.

### Using a client-side script

Each script added to the `scripts` directory will have a corresponding `.script.js` file generated in the `public` directory. These can be called directly from within a Nunjucks view.

There is an example in `src/pages/projects/documents/view.njk`.
