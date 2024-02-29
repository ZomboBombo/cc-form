export default {
    /*
    ===========================
    --- Директория "src/" ---
    ===========================
    */
    source: {
        root: './src/',
        pug: {
            root: './src/pug/',
            pages: './src/pug/to-html/',
        },
        sass: {
            root: './src/sass/',
            main_style_file: './src/sass/styles.scss',
        },
        js: {
            root: './src/js/',
            main_file: './src/js/main.js',
        },
        fonts: './src/fonts/',
        images: './src/images/',
        favicons: './src/favicons/',
    },

    /*
    ===========================
    --- Директория "build/" ---
    ===========================
    */
    build: {
        root: './build/',
        css: './build/css/',
        js: './build/js/',
        images: './build/images/',
    },
}
