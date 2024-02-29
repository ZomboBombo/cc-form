import { src, dest } from 'gulp'

// --- Оптимизация изображений ---
import imagemin from 'gulp-imagemin'
import cheerio from 'gulp-cheerio'
import webp from 'gulp-webp'
import svgstore from 'gulp-svgstore'

// --- Вспомогательные утилиты ---
import rename from 'gulp-rename'

/*
--- Импорт утилитарных модулей ---
--- ---
--- 1) с описанием путей к Файлам проекта
--- 2) модуль с константами и утилитами
*/
import PATH_TO from '../path-to'
import OPTIONS from '../options'
import Utils from '../gulp-utils'

/*
=====================================================
------------------- ОСНОВНОЙ ТАСК -------------------
=====================================================
*/

// --- Список составных путей к наборам изображений в разных форматах ---
const path_to_images_set = {
    of_all_formats: PATH_TO.source.images + '**/*.{png,jpg,svg}',
    of_bitmaps: PATH_TO.source.images + '**/*.{png,jpg}',
    of_svg_icons: PATH_TO.source.images + '**/{logo,icon-*}.svg',
}

// *** Оптимизация изображений ***
export const optimizeImages = () => {
    return Utils.pipeline(
        src(path_to_images_set.of_all_formats),
        imagemin([
            imagemin.optipng(OPTIONS.images.optipng),
            imagemin.mozjpeg(OPTIONS.images.mozjpeg),
            imagemin.svgo({
                plugins: [OPTIONS.images.svgo],
            }),
        ]),
        dest(PATH_TO.build.images)
    )
}

// *** Переформатирование изображений в WebP ***
export const transformToWebp = () => {
    return Utils.pipeline(
        src(path_to_images_set.of_bitmaps),
        webp(OPTIONS.images.webp),
        dest(PATH_TO.build.images)
    )
}

// *** Сборка SVG-спрайта ***
export const sprite = () => {
    return Utils.pipeline(
        src(path_to_images_set.of_svg_icons),
        cheerio({
            parserOptions: {
                xmlMode: true,
            },
        }),
        svgstore({
            inlineSvg: true,
        }),
        rename('sprite.svg'),
        dest(PATH_TO.build.images)
    )
}

// *** Функция для ручной оптимизации изображений ***
export const imagesoptimisation = () => {
    optimizeImages()
    transformToWebp()
}
