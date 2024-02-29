import { series } from 'gulp'

// --- Кастомные модули из директории "gulp-config/tasks" ---
import pugToHtml from './gulp-config/tasks/pug'
import css from './gulp-config/tasks/css'
import scripts from './gulp-config/tasks/scripts'
import { sprite, imagesoptimisation } from './gulp-config/tasks/images'
import copy from './gulp-config/tasks/copy'
import clean from './gulp-config/tasks/clean'

// --- Утилиты ---
import Utils from './gulp-config/gulp-utils'

/*
=====================================================
----------------------- ТАСКИ -----------------------
=====================================================
*/

// --- Основной таск для поднятия сервера ---
function server(done) {
    Utils.server.init({
        server: {
            baseDir: './build',
        },

        notify: false,
        open: true,
        port: 9000,
        injectchanges: true,

        files: [
            {
                match: ['src/pug/**/*.pug'],
                fn: series(pugToHtml, refresh),
            },
            {
                match: ['src/sass/**/*.{scss,sass}'],
                fn: series(css),
            },
            {
                match: ['src/js/**/*.js'],
                fn: series(scripts, refresh),
            },
            {
                match: ['src/images/**/*.{jpg,png}'],
                fn: series(imagemin, refresh),
            },
            {
                match: ['src/images/**/icon-*.svg'],
                fn: series(sprite, refresh),
            },
        ],
    })

    done()
}

// --- Таск для перезагрузки страницы в браузере ---
function refresh(done) {
    Utils.server.reload()
    done()
}

// --- Таск оптимизации изображений ---
function imagemin(done) {
    imagesoptimisation()
    done()
}

/*
==========================================================================
--- Основные задачи для Сборки проекта в 'продакшн' и поднятие Сервера ---
==========================================================================
*/

// --- Таск для Сборки проекта БЕЗ поднятия сервера ---
const prod_build = series(
    clean,
    copy,
    css,
    scripts,
    sprite,
    pugToHtml,
    imagemin
)

exports.build = prod_build
exports.start = series(prod_build, server)

export { clean, copy, css, scripts, sprite, pugToHtml }
