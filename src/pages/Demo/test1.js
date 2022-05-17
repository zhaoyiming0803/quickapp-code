const { test2 } = require('./test2')

export function test1 () {
    return 'this is test1' + ', ' + test2()
}
