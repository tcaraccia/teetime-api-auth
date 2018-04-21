const gulp = require("gulp");
const apidoc = require("gulp-apidoc");

gulp.task("apidoc", (done) => {
    apidoc({
        src: "./server",
        dest: "../docs/apidoc"
    }, done);
});

gulp.task("watch", () => {
    gulp.watch(["./server/**"], ["apidoc"]);
});