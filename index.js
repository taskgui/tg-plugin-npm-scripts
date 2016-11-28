var fs = require('fs')

module.exports = function (opts) {
  var all = require(opts.root + '/static/task.json')
  
  if (fs.existsSync(opts.cwd + '/package.json')) {
    var conf = require(opts.cwd + '/package.json')

    if (!conf) {
      console.log('not exist package.json')
      return
    }
  
    console.log('available npm scripts:')

    for (var _name in conf.scripts) {
      console.log('\t' + _name)
      var cmd = 'alias ' + _name + '=\'npm run ' + _name + '\''
    }
  
    all.tasks.npm_scripts = {
      prefix: 'npm run',
      tasks: conf.scripts
    }
  
    fs.writeFileSync(opts.root + '/static/task.json',  JSON.stringify(all, null, 4))
  } else {
    all.tasks.npm_scripts = {
    }
  
    fs.writeFileSync(opts.root + '/static/task.json',  JSON.stringify(all, null, 4))
  }
}
