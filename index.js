var fs = require('fs')


module.exports = function (opts) {
  var conf = require(opts.cwd + '/package.json')
  var lines = []
  console.log('available script:')

  for (var _name in conf.scripts) {
    console.log('\t' + _name)
    var cmd = 'alias ' + _name + '=\'npm run ' + _name + '\''
    lines.push(cmd)
  }
  
  var all = require(opts.root + '/static/task.json')
  
  all.scripts = conf.scripts
  
  fs.writeFileSync(opts.root + '/static/task.json',  JSON.stringify(all, null, 4))
}
