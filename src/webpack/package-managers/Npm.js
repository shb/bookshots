const { exec } = require('child_process')

module.exports = class Npm {
  run(script, params) {
    return new Promise((res, rej) => {
      exec(`npm ${script} -- ${params}`, (e, out, err) => {
        res(out)
      })
    })
  }
}