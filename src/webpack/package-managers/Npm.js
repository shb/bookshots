const { exec } = require('child_process')

module.exports = class Npm
{
  constructor () {
    this.env = Object.assign({}, process.env)
  }

  setEnv(env) {
    Object.assign(this.env, env)
  }

  run(script, params) {
    return new Promise((res, rej) => {
      exec(`npm ${script} -- ${params}`, {
        env: this.env
      }, (e, out, err) => {
        if (e) rej(e)
        else res([out, err])
      })
    })
  }
}