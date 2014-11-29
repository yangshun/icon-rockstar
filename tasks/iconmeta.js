'use strict';

module.exports = function (grunt) {
  grunt.registerTask('iconmeta', function (source) {
    var path = require('path');
    var _ = require('lodash');

    var options = this.options();

    var sourcesPath = options.source;
    var metaPath = options.meta;
    var componentsPath = options.components;
    var sourceList = options.sourceList;

    if (source !== 'all' && !_.contains(sourceList, source)) {
      grunt.fail.warn('"' + source + '" not found in "sources.json".');
    }
    var taskSources = source === 'all' ? sourceList : [source];
    _.each(taskSources, function (source) {
      var manifestFilePath = path.join(sourcesPath, source + '.json');
      if (!grunt.file.exists(manifestFilePath)) {
        grunt.fail.warn('Source manifest file "' + source + '.json" not found!');
      }
      var sourceManifest = grunt.file.readJSON(manifestFilePath);

      var sourceBower = grunt.file.readJSON(path.join(componentsPath, sourceManifest.bower.packageName, 'bower.json'));
      var mainFileName = sourceManifest.bower.main;
      var mainFilePath = path.join(componentsPath, sourceManifest.bower.packageName, mainFileName);
      if (!grunt.file.exists(mainFilePath)) {
        grunt.fail.warn('Main CSS file at "' + mainFilePath + '" not found!');
      }
      var file = grunt.file.read(mainFilePath);
      var re = new RegExp(sourceManifest.selectorRegex, 'gi');
      var delimiter = sourceManifest.selectorDelimiter;

      var allNames = [];
      var match;
      while (match = re.exec(file)) {
        allNames.push(match[1]);
      }
      allNames = _.uniq(allNames.sort(), true);

      var metaFileName = source + '-meta.json';
      var metaFilePath = path.join(metaPath, metaFileName);
      var metaFileExists = grunt.file.exists(metaFilePath);

      function createIconObject (name) {
        return {
          name: name,
          categories: [],
          tags: name.split(delimiter)
        };
      }

      if (metaFileExists) {
        var metaFile = grunt.file.readJSON(metaFilePath);
        var existingIconLookup = {};
        _.each(metaFile.icons, function (item) {
          existingIconLookup[item.name] = item;
        });
        var existingIconsNameList = _.pluck(metaFile.icons, 'name');
        var combinedIconList = _.union(allNames, existingIconsNameList).sort();
        var iconsMetaList = [];
        _.each(combinedIconList, function (name) {
          if (existingIconLookup[name]) {
            iconsMetaList.push(existingIconLookup[name]);
          } else {
            iconsMetaList.push(createIconObject(name));
          }
        });
      } else {
        var iconsMetaList = _.map(allNames, function (name) {
          return createIconObject(name);
        });
      }

      var metaFileData = {
        name: sourceManifest.name,
        slug: sourceManifest.slug,
        homepage: sourceManifest.homepage,
        usage: sourceManifest.usage,
        version: sourceBower.version,
        icons: iconsMetaList
      };

      grunt.file.write(
        metaFilePath,
        JSON.stringify(metaFileData, null, 2)
      );
      grunt.log.writeln(metaFileName, metaFileExists ? 'updated.' : 'created.');
    });
  });
};
