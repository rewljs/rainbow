import test from 'ava'
import r from '../src/index'
import { EachCharRegExp } from './utils'

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