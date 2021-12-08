const gulp = require("gulp");
const del = require("del");
const rename = require("gulp-rename");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const csso = require("postcss-csso");
const terser = require("gulp-terser");
const squoosh = require("gulp-libsquoosh");
const sync = require("browser-sync").create();



// Clean

const clean = () => {
  return del("build");
};

exports.clean = clean;



// Copy HTML

const copyHTML = (done) => {
  gulp.src([
    "src/*.html",
  ])
    .pipe(gulp.dest("build"))
  done();
}

exports.copyHTML = copyHTML;



// Copy images

const copyImages = () => {
  return gulp.src([
    "src/img/**/*.{png,jpg,jpeg,svg}",
  ])
    .pipe(squoosh())
    .pipe(gulp.dest("build/img"))
}

exports.copyImages = copyImages;



// Styles

const styles = () => {
  return gulp.src([
    "src/css/slick.css",
    "src/css/slick-theme.css"
  ])
    .pipe(gulp.dest("build/css"))
    .pipe(gulp.src("src/sass/style.scss"))
    .pipe(sass())
    .pipe(postcss([
      autoprefixer(),
    ]))
    .pipe(gulp.dest("build/css"))
}

exports.styles = styles;



// Styles Minify

const stylesMinify = () => {
  return gulp.src("src/sass/style.scss")
    .pipe(sass())
    .pipe(postcss([
      autoprefixer(),
      csso(),
    ]))
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(sync.stream());
}

exports.stylesMinify = stylesMinify;



// Scripts

const scripts = () => {
  return gulp.src([
    "src/js/*.js",
    "!src/js/jquery-3.6.0.min.js",
  ])
    .pipe(terser())
    .pipe(rename(path => ({
      dirname: path.dirname,
      basename: path.basename + ".min",
      extname: ".js"
    })))
    .pipe(gulp.dest("build/js"))

    .pipe(gulp.src("src/js/**/*.*"))
    .pipe(gulp.dest("build/js"))

    .pipe(gulp.src([
      "src/js/slick/fonts/slick.woff",
      "src/js/slick/fonts/slick.ttf",
    ], {
      base: "src"
    }))
    .pipe(rename({dirname: ""}))
    .pipe(gulp.dest("build/css/fonts"))

    .pipe(gulp.src("src/js/slick/ajax-loader.gif"))
    .pipe(gulp.dest("build/css"))

    .pipe(sync.stream());
}

exports.scripts = scripts;



// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: "build"
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

exports.server = server;



// Reload

const reload = (done) => {
  sync.reload();
  done();
}

exports.reload = reload;



// Watcher

const watcher = () => {
  gulp.watch("src/sass/**/*.scss", gulp.series(styles, stylesMinify));
  gulp.watch("src/js/*.js", gulp.series(scripts));
  gulp.watch("src/*.html", gulp.series(copyHTML, reload));
}



// Build

exports.default = gulp.series(
  clean,
  copyHTML,
  copyImages,
  gulp.parallel(
    styles,
    stylesMinify,
    scripts,
  ),
  gulp.series(
    server,
    watcher
  )
);
