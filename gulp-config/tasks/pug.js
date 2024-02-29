import { src, dest } from 'gulp'

const pug = require('gulp-pug')

/*
--- Импорт утилитарных модулей ---
--- ---
--- 1) с описанием путей к Файлам проекта
--- 2) модуль с константами и утилитами
*/
import PATH_TO from '../path-to'
import Utils from '../gulp-utils'
import OPTIONS from '../options'

/*
=====================================================
------------------- ОСНОВНОЙ ТАСК -------------------
=====================================================
*/

export default function pugToHtml() {
    return Utils.pipeline(
        src(PATH_TO.source.pug.pages + '**/*.pug'),
        pug(OPTIONS.pug),
        dest(PATH_TO.build.root)
    )
}
