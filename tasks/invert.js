'use strict';

module.exports = function (grunt) {
  grunt.registerTask('invert', function (source) {
    var path = require('path');
    var _ = require('lodash');

    var options = this.options();

    var sourcesPath = options.source;
    var metaPath = options.meta;
    var componentsPath = options.components;
    var sourceList = options.sourceList;
    var unifiedFileName = path.join(metaPath, options.unified);
    var unifiedFileExists = grunt.file.exists(unifiedFileName);

    var resultData = _.map(
      sourceList,
      function (source) {
        var metaFileName = source + '-meta.json';
        var metaFilePath = path.join(metaPath, metaFileName);

        if (!grunt.file.exists(metaFilePath)) {
          grunt.fail.warn('icons meta file "' + metaFileName + '" not found!');
        }
        var metaFile = grunt.file.readJSON(metaFilePath);

        var invertedIndex = {};
        // produce an index with tags as keys, and array of
        // icons as values
        _.each(metaFile.icons, function (icon) {
          _.each(icon.tags, function (tag) {
            if (invertedIndex[tag]) {
              invertedIndex[tag].push(icon.name);
            } else {
              invertedIndex[tag] = [icon.name];
            }
          })
        })
        metaFile.tags = invertedIndex;
        delete metaFile.icons;

        return metaFile;
      });

    grunt.file.write(
      unifiedFileName,
      JSON.stringify(resultData, null, 2)
    );
    grunt.log.writeln(unifiedFileName, unifiedFileExists ? 'updated.' : 'created.');
  });
};
