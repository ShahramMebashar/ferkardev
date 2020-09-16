let mix = require('laravel-mix')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
require('mix-html-builder');

mix
  .js('src/js/main.js', 'dist/js')
  .sass('src/scss/vendors.scss', 'dist/css')
  .sass('src/scss/main.scss', 'dist/css')
  .sass('src/scss/main.rtl.scss', 'dist/css')
  .options({
    processCssUrls: false
  })
  .sourceMaps()



mix
  .html({
      htmlRoot: './src/views/*.html', 
      output: './', 
      partialRoot: './src/views/partials',   
      layoutRoot: './src/views/layouts', 
      minify: {
          removeComments: true
      },
      inject: true,
      versioning: true
  })
  .setPublicPath('dist');

mix.webpackConfig( () => {
  return {
    plugins: [
      new BrowserSyncPlugin({
          host: 'localhost',
          port: 3000,
          watch: true,
          server: { baseDir: ['dist'] }
      })
  ]
  }
})

mix.copy('src/js/vendors', 'dist/js/vendors')
mix.copy('src/images', 'dist/images')
mix.copy('src/icons', 'dist/icons')
mix.copy('src/fonts', 'dist/fonts')

//mix.copy('src/scss/vendor/misc', 'dist/css')