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
      var cssPath = path.join(componentsPath, sourceManifest.main);
      var file = grunt.file.read(cssPath);

      var re = new RegExp(sourceManifest.selectorRegex, 'gi');
      var matches = re.exec(file);
      var allNames = [];
      while (matches) {
        allNames.push(matches[1]);
        matches = re.exec(file);
      }
      allNames = allNames.sort();
    });
  });
};
