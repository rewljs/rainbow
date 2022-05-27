/* eslint-disable no-control-regex */

import test from 'ava'
import hash from '../../src/methods/hash'

test('Render color', t => {
  t.regex(hash('text'), /\x1b\[38;2;\d{1,3};\d{1,3};\d{1,3}mtext\x1b\[0m/)
})

test('Render the same color for the same string', t => {
  const s1 = hash('string')
  const s2 = hash('string')
  t.is(s1, s2)
})

test('Render color for extra long string', t => {
  hash('a'.repeat(10000))
  t.pass()
})