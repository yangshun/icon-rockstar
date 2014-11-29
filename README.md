Icon Rockstar
==

Webfont icons are cool. There are a few awesome sources of webfont icons such as [Font Awesome](http://fortawesome.github.io/Font-Awesome/), [Foundation Icons](http://zurb.com/playground/foundation-icon-fonts-3) and [Open Iconic](https://useiconic.com/open).

However, when finding suitable icons to use, it's often a pain because each icon is tagged to its name only, and a related keyword search will fail to work. Meet Icon Rockstar, a search engine for webfont icons.

Getting Started
==

Install the necessary node packages, grunt command line tool and bower packages:
```
$ npm install -g bower grunt-cli
$ npm install
$ bower install
```

Building an Icon Source Meta file
==

Each icon source has a manifest file that resides in `icons_sources_manifest`. The grunt task `grunt rockstar:<source>` generates a JSON meta file from the source's main CSS file that is specified inside the manifest file. The meta file contains some information about the source, and a list of icons provided by the source. For example, running:
```
$ grunt rockstar:font-awesome
```
will create a `font-awesome-meta.json` file within the `icons_meta` folder. Categories and tags can then be added to the icons by modifying the `font-awesome-meta.json` file directly.

Alternatively, running `grunt rockstar` or `grunt rockstar:all` will run `grunt rockstar` on all sources specified within `sources.json`.

Adding an Icon Source
==

There are a few things that have to be done when adding a new icon source:

1. Install the icon package via `bower`.
2. Create a source manifest JSON file within `icons_sources_manifest`.
3. Update `sources.json` with the file name of the new source manifest JSON file.
4. Run `bower rockstar:<new_source>`.

Updating an Icon Source
==

Updating icon sources is quite similar to adding new icon sources.

1. Update the corresponding icon package via `bower`.
2. Look for the source's manifest file within `icons_sources_manifest` and update any values where necessary.
3. Update `sources.json` with the file name of the new source manifest JSON file.
4. Run `bower rockstar:<source>`.
5. The source's meta JSON file will be updated with the new icons added, preserving already existing icon names.

License
==

Copyright (c) 2014 [Tay Yang Shun](https://github.com/yangshun) and [Chen Minqi](https://github.com/BenMQ). Licensed under the MIT license.
