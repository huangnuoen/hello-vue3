// npm run sync 拉取代码-打包-自动提交-push
const shell = require('shelljs')
shell.exec('git pull')
if (shell.exec('npm run build').code !== 0) {
  shell.echo('Error: Git commit failed')
  shell.exit(1)
}
shell.cd('../../public/health')
shell.exec('git add .')
shell.exec("git commit -m ':package: 【 health platform 】: 辛苦打包中.. '")
shell.exec('git push')
