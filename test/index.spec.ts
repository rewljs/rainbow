import test from 'ava'
import r from '../src/index'
import { EachCharRegExp, ColorRegExp } from './utils'

test('Render color directly', t => {
  t.is(r.white('text'), '\x1b[38;2;255;255;255mtext\x1b[0m')
})

test('Render style directly', t => {
  t.is(r.bold('text'), '\x1b[1mtext\x1b[0m')
})

test('Generate context from style invoke', t => {
  t.is(r.b().white('text'), '\x1b[1;38;2;255;255;255mtext\x1b[0m')
})

test('Generate context from color invoke', t => {
  t.is(r.white().b('text'), '\x1b[1;38;2;255;255;255mtext\x1b[0m')
})

test('Render rainbow color directly', t => {
  t.regex(r.rainbow('text'), EachCharRegExp)
})

test('Generate context from modifier: bg', t => {
  t.is(r.bg.white('text'), '\x1b[48;2;255;255;255mtext\x1b[0m')
})

test('Generate context from modifier: dark', t => {
  t.regex(r.dark.red('text'), ColorRegExp)
})

test('Generate context from modifier: light', t => {
  t.regex(r.light.red('text'), ColorRegExp)
})

test('Generate context from method: rgb', t => {
  t.is(r.rgb(255, 255, 255)('text'), '\x1b[38;2;255;255;255mtext\x1b[0m')
})

test('Generate context from method: hsv', t => {
  t.is(r.hsv(0, 100, 100)('text'), '\x1b[38;2;255;0;0mtext\x1b[0m')
})