import test from 'ava'
import hash from '../../src/methods/hash'
import { ColorRegExp, BgRegExp } from '../utils'

test('Render color', t => {
  t.regex(hash('text'), ColorRegExp)
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

test('Render color using provided saturation', t => {
  t.regex(hash('text', { s: 90 }), ColorRegExp)
})

test('Render color using provided value', t => {
  t.regex(hash('text', { v: 90 }), ColorRegExp)
})

test('Render color to the background', t => {
  t.regex(hash('text', { background: true }), BgRegExp)
})