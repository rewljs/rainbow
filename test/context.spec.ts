import test from 'ava'
import Context from '../src/context'
import { TestRegExp } from './utils'

test('Initialize with no argument', t => {
  const ctx = new Context()
  t.deepEqual(ctx.options, {})
})

test('Render styled text', t => {
  const ctx = new Context()
  t.is(ctx.b('text'), '\x1b[1mtext\x1b[0m')
})

test('Start chaining from style', t => {
  const ctx = new Context()
  t.is(ctx.b().white('text'), '\x1b[1;38;2;255;255;255mtext\x1b[0m')
})

test('Render colored text', t => {
  const ctx = new Context()
  t.is(ctx.white('text'), '\x1b[38;2;255;255;255mtext\x1b[0m')
})

test('Start chaining from color', t => {
  const ctx = new Context()
  t.is(ctx.white().b('text'), '\x1b[1;38;2;255;255;255mtext\x1b[0m')
})

test('Render text with background color', t => {
  const ctx = new Context()
  t.is(ctx.bgWhite('text'), '\x1b[48;2;255;255;255mtext\x1b[0m')
})

test('Start chaining from background color', t => {
  const ctx = new Context()
  t.is(ctx.bgWhite().black('text'), '\x1b[38;2;0;0;0;48;2;255;255;255mtext\x1b[0m')
})

test('Set color using RGB', t => {
  const ctx = new Context()
  t.is(ctx.rgb(255, 130, 30)('text'), '\x1b[38;2;255;130;30mtext\x1b[0m')
})

test('Set color using HSV', t => {
  const ctx = new Context()
  t.is(ctx.hsv(0, 100, 100)('text'), '\x1b[38;2;255;0;0mtext\x1b[0m')
})

test('Render rainbow color text', t => {
  const ctx = new Context()
  t.regex(ctx.rainbow('text'), TestRegExp)
})