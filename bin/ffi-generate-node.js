#!/usr/bin/env node

var jsb = require('js-beautify');
var argv = require('optimist')
  .usage('Generate node-ffi bindings for a given header file\nUsage: $0')
  .demand('f').alias('f', 'file').describe('f', 'The header file to parse')
  .demand('l').alias('l', 'library').describe('l', 'The name of the library to dlopen')
  .alias('m', 'module').describe('m', 'The name of module the bindings will be exported as')
  .boolean('x').alias('x', 'file_only').describe('x', 'Only export functions found in this file')
  .alias('p', 'prefix').describe('p', 'Only import functions whose name start with prefix')
  .boolean('s').alias('s', 'strict').describe('s', 'Use StrictType (experimental)')
  .alias('L', 'libclang').describe('L', 'Path to directory where libclang.{so,dylib} is located')
  .argv

function tryClang(cb) {
  var libclang;

  try {
    libclang = require('libclang');
  } catch (e) {
    libclang = false;
  }

  if (libclang) return cb(true);

  require('child_process').exec('llvm-config --libdir', function (err, stdout, stderr) {
    if (stdout.trim()) {
      cb(stdout.trim());
    } else {
      cb(err.code);
    }
  });
}

function generate() {
  var generate = require('../lib/generateffi').generate;

  var ret = generate({
    filename: argv.f,
    library: argv.l,
    module: argv.m,
    prefix: argv.p,
    compiler_args: argv._,
    strict_type: argv.s,
    single_file: argv.x,
  });

  console.log(jsb.js_beautify(ret.serialized));

  if (generate.unmapped) {
    process.stderr.write("-------Unmapped-------\r\n");
    process.stderr.write(generate.unmapped + '\r\n');
  }
}

tryClang(function (ret) {
  var library;

  if (isNaN(ret)) library = ret;
  if (argv.L) library = argv.L;

  if (ret === true) {
    generate();
  } else if (library) {
    var env = process.env;
    switch (process.platform) {
      case 'darwin':
        env.DYLD_LIBRARY_PATH = library + ':' + env.DYLD_LIBRARY_PATH || '';
        break;
      default:
        env.LD_LIBRARY_PATH = library + ':' + env.LD_LIBRARY_PATH || '';
        break;
    }
    var c = require('child_process').spawn(process.execPath, process.argv.slice(1), {env:env});
    c.stdout.pipe(process.stdout);
    c.stderr.pipe(process.stderr);
    c.on('exit', function (code) {
      process.exit(code);
    });
  } else {
    console.error('Unable to load libclang, either specify -L or have llvm-config in your path');
  }
});
