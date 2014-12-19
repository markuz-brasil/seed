'use strict'

var path = require('path')
var fs = require('fs')

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var runSequence = require('run-sequence');

var log = $.util.log
var red = $.util.colors.red
var cyan = $.util.colors.cyan

var CFG = require('./config');

function runTasks () {
  var args = [].slice.call(arguments)
  return function (evt) {
    if ('changed' !== evt.type) { return }
    // bug on runSequece.
    // this JSON trick is cleanest way to deep copy a simple, non-circular array.
    runSequence.apply(runSequence, JSON.parse(JSON.stringify(args)))
  }
}

function assets () {
  log("Starting '"+ cyan('watch:assets') +"'...")

  gulp.watch(CFG.js.src, runTasks(['commonjs', 'browserify'], 'reload'))
  gulp.watch(CFG.less.src, runTasks('less', 'reload'))
  gulp.watch(CFG.sass.src, runTasks('sass', 'reload'))
  gulp.watch(CFG.jade.src, runTasks('jade', 'reload'))
}

function gulpfile () {
  log("Starting '"+ cyan('watch:gulpfile') +"'...")
  gulp.watch(CFG.tasks.src, runTasks('restart'))
}

module.exports = {
  assets: assets,
  gulpfile: gulpfile,
}
