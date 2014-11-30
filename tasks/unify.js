'use strict';

module.exports = function (grunt) {
  grunt.registerTask('unify', function (source) {
    var path = require('path');
    var _ = require('lodash');

    var options = this.options();

    var sourcesPath = options.source;
    var metaPath = options.meta;
    var componentsPath = options.components;
    var sourceList = options.sourceList;
    var unifiedFileName = path.join(metaPath, options.unified);
    var unifiedFileExists = grunt.file.exists(unifiedFileName);

    var resultData = {"metadata": [], "icons" :[]};
    _.each(
      sourceList,
      function (source) {
        var metaFileName = source + '-meta.json';
        var metaFilePath = path.join(metaPath, metaFileName);

        if (!grunt.file.exists(metaFilePath)) {
          grunt.fail.warn('icons meta file "' + metaFileName + '" not found!');
        }
        var metaFile = grunt.file.readJSON(metaFilePath);

        resultData.metadata.push({
          "name": metaFile.name,
          "slug": metaFile.slug,
          "usage": metaFile.usage,
          "version": metaFile.version
        });

        resultData.icons.push(_.map(metaFile.icons, function (icon) {
          return _.assign(icon, {"iconset": metaFile.slug});
        })
      )});

    grunt.file.write(
      unifiedFileName,
      JSON.stringify(resultData, null, 2)
    );
    grunt.log.writeln(unifiedFileName, unifiedFileExists ? 'updated.' : 'created.');
  });
};
