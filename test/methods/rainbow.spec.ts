import test from 'ava'
import rainbow from '../../src/methods/rainbow'
import { EachCharRegExp } from '../utils'

test('Render rainbow color', t => {
  t.regex(rainbow('text'), EachCharRegExp)
})

test('Render rainbow color with random hue offset', t => {
  t.regex(rainbow('text', { offset: 'random' }), EachCharRegExp)
})

test('Render rainbow color with reversed spectrum', t => {
  t.regex(rainbow('test', { reverse: true }), EachCharRegExp)
})

test('Render rainbow color with custom hue span', t => {
  t.regex(rainbow('test', { span: 60 }), EachCharRegExp)
})

test('Render rainbow color to the background', t => {
  t.regex(rainbow('text', { background: true }), EachCharRegExp)
})