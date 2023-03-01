import gulp from 'gulp'
import sass from 'sass'
import gulpSass from 'gulp-sass'


const sassCompiler = gulpSass(sass)

const SCRIPTS_FOLDER  ='./scripts';
const  BUILD_FOLDER = './build';
const JS_FILES = SCRIPTS_FOLDER + '/**/*.js';
const STYLE =  'css/*.scss'

 async function js_task() {
    gulp.src(JS_FILES)
        .pipe(gulp.dest(BUILD_FOLDER))
}
async function sassCompilation() {
    gulp.src(STYLE)
        .pipe(sassCompiler())
        .pipe(gulp.dest(BUILD_FOLDER))
}
gulp.task('default', gulp.parallel(js_task, sassCompilation))

gulp.task('watch-sass', function () {
    gulp.watch(STYLE, sassCompilation)
})
gulp.task('watch-js', function () {
    gulp.watch(JS_FILES, js_task)
})

gulp.task('watch', gulp.parallel(
    'watch-sass' , 'watch-js'
))