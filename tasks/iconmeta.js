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

    var taskSources = source === 'all' ? sourceList : [source];
    _.each(taskSources, function (source) {
      var sourceManifest = grunt.file.readJSON(path.join(sourcesPath, source + '.json'));
      var sourceBower = grunt.file.readJSON(path.join(componentsPath, sourceManifest.bower.packageName, 'bower.json'));
      var file = grunt.file.read(path.join(componentsPath, sourceManifest.bower.packageName, sourceManifest.bower.main));
      var re = new RegExp(sourceManifest.selectorRegex, 'gi');

      var allNames = [];
      var match;
      while (match = re.exec(file)) {
        allNames.push(match[1]);
      }
      allNames = _.uniq(allNames.sort(), true);
      
      var metaFilePath = path.join(metaPath, source + '-meta.json');
      if (grunt.file.exists(metaFilePath)) {
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
            iconsMetaList.push( {
              name: name,
              categories: [],
              tags: []
            });
          }
        });
      } else {
        var iconsMetaList = _.map(allNames, function (name) {
          return {
            name: name,
            categories: [],
            tags: []
          };
        });
      }

      var iconsData = {
        name: sourceManifest.name,
        slug: sourceManifest.slug,
        homepage: sourceManifest.homepage,
        usage: sourceManifest.usage,
        version: sourceBower.version,
        icons: iconsMetaList
      };
      
      grunt.file.write(
        metaFilePath,
        JSON.stringify(iconsData, null, 2)
      );
    });
  });
};
