const {src, dest, series, watch} = require('gulp')
const sass = require('gulp-sass')
const sourcemaps = require('gulp-sourcemaps')
const minify = require('gulp-minify')
const del = require('del')

function scss() {
  const cssSourcePath = [
    './src/scss/index.scss',
    './src/scss/home.scss',
    './src/scss/about.scss',
  ];
  const sassOptions = {
    errLogToConsole: true,
    outputStyle: 'compressed'
  };

  return src(cssSourcePath)
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('dist/css'))
}

function javascript() {
  const jsSourcePath = [
    './src/js/main.js', 
    './src/js/home.js',
    './src/js/contact.js',
    './src/js/about.js'
  ];
  return src(jsSourcePath)
    .pipe(minify({
      ext: {
        min: '.min.js'
      },
      ignoreFiles: ['-min.js']
    }))
    .pipe(dest('dist/js'))
}

function clear() {
  return del('dist')
}

function serve() {
  watch('src/scss/**/*.scss', series(scss))
  watch('src/js/**/*.js', series(javascript))
}

exports.build = series(clear, scss, javascript)
exports.serve = series(clear, scss, javascript, serve)
exports.clear = clear