import gulp from "gulp";
import { path } from "./gulp/path.js";
import { deleteAsync } from 'del';
import htmlMin from "gulp-htmlmin";
import browserSync from "browser-sync";
import cleanCSS from "gulp-clean-css";
import autoprefixer from "gulp-autoprefixer";
import webpack from "webpack-stream";

gulp.task('server', () => {
    browserSync({
        server: {
            baseDir: `${path.build}`
        }
    });
});

gulp.task('copy', () => {
    return gulp.src([`${path.src}/assets/**/*.*`, `!${path.src}/assets/css/**/*.css`])
        .pipe(gulp.dest(`${path.build}/assets/`))
        .pipe(browserSync.stream());
});

gulp.task('watch', () => {
    gulp.watch([`${path.src}/assets/**/*.*`, `!${path.src}/assets/css/**/*.css`], gulp.series('reset', gulp.parallel('copy')))
    gulp.watch(`${path.src}/*.html`, gulp.parallel('html'))
    gulp.watch(`${path.src}/assets/css/**/*.css`, gulp.parallel('styles'))
    gulp.watch(`${path.src}/js/**/*.js`, gulp.parallel('build-js'))
});

gulp.task('reset', () => {
    return deleteAsync(`${path.build}`, {force: true});
});

gulp.task('html', () => {
    return gulp.src(`${path.src}/*.html`)
        .pipe(htmlMin({ collapseWhitespace: true }))
        .pipe(gulp.dest(path.build))
        .pipe(browserSync.stream());
});

gulp.task('styles', () => {
    return gulp.src(`${path.src}/assets/css/**/*.css`, {sourcemaps: true})
        .pipe(cleanCSS())
        .pipe(autoprefixer())
        .pipe(gulp.dest(`${path.build}/assets/css`))
        .pipe(browserSync.stream());
});

gulp.task("build-js", () => {
    return gulp.src(`${path.src}/js/**/*.js`)
        .pipe(webpack({
            mode: 'production',
            output: {
                filename: 'script.js'
            },
            watch: false,
            devtool: "source-map",
            module: {
                rules: [
                    {
                        test: /\.m?js$/,
                        exclude: /(node_modules|bower_components)/,
                        use: {
                            loader: 'babel-loader',
                            options: {
                                presets: [['@babel/preset-env', {
                                    debug: true,
                                    corejs: 3,
                                    useBuiltIns: "usage"
                                }]]
                            }
                        }
                    }
                ]
            }
        }))
        .pipe(gulp.dest(`${path.build}/js/`))
        .pipe(browserSync.stream());
});

gulp.task('default', gulp.series('reset', gulp.parallel('copy', 'html', 'styles', 'build-js', 'watch', 'server')));