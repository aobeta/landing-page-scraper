var compressor = require('node-minify');
const dirSearch = require('directory-search');

function jsOptimizer() {
  dirSearch('dist', '.js', function(err, files) {
    files.forEach(function(file) {
      compressor
        .minify({
          compressor: 'uglifyjs',
          input: file,
          output: file,
        })
        .catch(error => console.log(error));
    });
  });
}

module.exports = jsOptimizer;
