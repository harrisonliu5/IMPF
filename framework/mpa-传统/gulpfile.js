const gulp = require('gulp');
const watch = require('gulp-watch');
const babel = require('gulp-babel');
const rollup = require('gulp-rollup');
//通过配置replace来替换不需要的代码
const replace = require('rollup-plugin-replace');
const gulpSequence = require('gulp-sequence');
// 任务名字
let _task = ["builddev"]
//1.编译es6。2.tress-shaking-去掉多余的代码

//开发环境的gulp
gulp.task("builddev", () => {
    return watch('src/back/**/*.js',
        {
            ignoreInitial: false
        },
        () => {
            gulp.src('src/back/**/*.js')
                .pipe(babel({
                    babelrc: false,
                    plugins: ['transform-es2015-modules-commonjs']
                }))
                .pipe(gulp.dest('dist'))
        }
    )
});

//生产环境的gulp
gulp.task("buildprod", () => {
    return gulp.src('src/back/**/*.js')
        .pipe(babel({
            babelrc: false,
            ignore: ['./src/back/config/index.js'],
            plugins: ['transform-es2015-modules-commonjs']
        }))
        .pipe(gulp.dest('dist'))
});

// 不能写在一起是因为不编译别的文件夹
gulp.task("buildconfig", () => {
    gulp.src('src/back/**/*.js')
        // 处理无用代码。文件入口是配置文件，导出的文件类型是commonjs
        .pipe(rollup({
            input: './src/back/config/index.js',
            output: {
                format: 'cjs'
            },
            plugins: [
                replace({
                    "process.env.NODE_ENV": JSON.stringify('production')
                })
            ]
        }))
        .pipe(gulp.dest('dist'))
});


if (process.env.NODE_ENV == 'production') {
    // _task = ['buildprod','buildconfig'];
    _task = gulpSequence('buildprod', 'buildconfig');
}

gulp.task('default', _task);