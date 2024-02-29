/*
 ** Служебные комментарии от ESLint
 ** для корректной работы require()
 */

/* eslint no-undef: "error" */
/* eslint-env node */

import { src, dest } from 'gulp'
import PATH_TO from '../path-to'
import OPTIONS from '../options'

// --- Вспомогательные утилиты ---
const pipeline = require('readable-stream').pipeline

/*
=====================================================
------------------- ОСНОВНОЙ ТАСК -------------------
=====================================================
*/

// *** Копирование файлов ***
export default function copy() {
    return pipeline(
        src(
            [
                `${PATH_TO.source.fonts}**/*.{${OPTIONS.fonts.extension}}`,
                `${PATH_TO.source.images}**/*.{${OPTIONS.images.extension}}`,
                `${PATH_TO.source.favicons}**/*.*`,
                `!${PATH_TO.source.favicons}**/*.ico`,
            ],
            {
                base: PATH_TO.source.root,
            }
        ),
        dest(PATH_TO.build.root),

        src(`${PATH_TO.source.favicons}favicon.ico`),
        dest(PATH_TO.build.root)
    )
}
