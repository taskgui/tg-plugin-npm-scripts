var fs = require('fs')

module.exports = function (opts) {
  try {
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
  
    var all = require(opts.root + '/static/task.json')
  
    all.tasks.npm_scripts = {
      prefix: 'npm run',
      tasks: conf.scripts
    }
  
    fs.writeFileSync(opts.root + '/static/task.json',  JSON.stringify(all, null, 4))
  }
  catch(err)
  {
    //在此处理错误
    console.log(err)
  }
}
