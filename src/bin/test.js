import { configure, processCLIArgs, run } from '@japa/runner'
import { assert } from '@japa/assert'
import { fileSystem } from '@japa/file-system'
import { expectTypeOf } from '@japa/expect-type'
import { snapshot } from '@japa/snapshot'

processCLIArgs(process.argv.splice(2))
configure({
  files: ['src/tests/**/*.spec.js'],
  plugins: [
    assert(),
    fileSystem(),
    expectTypeOf(),
    snapshot(),
  ],
})

run()