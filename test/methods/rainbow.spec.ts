import test from 'ava'
import rainbow from '../../src/methods/rainbow'
import { TestRegExp } from '../utils'

test('Render rainbow color', t => {
  t.regex(rainbow('text'), TestRegExp)
})

test('Render rainbow color with random hue offset', t => {
  t.regex(rainbow('text', { offset: 'random' }), TestRegExp)
})

test('Render rainbow color with reversed spectrum', t => {
  t.regex(rainbow('test', { reverse: true }), TestRegExp)
})

test('Render rainbow color with custom hue span', t => {
  t.regex(rainbow('test', { span: 60 }), TestRegExp)
})

test('Render rainbow color to the background', t => {
  t.regex(rainbow('text', { background: true }), /(\x1b\[[\d;]+m.*\x1b\[0m)+/)
})