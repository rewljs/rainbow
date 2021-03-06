import test from 'ava'
import Context from '../src/context'
import { EachCharRegExp, ColorRegExp } from './utils'

test('Initialize with no argument', t => {
  t.deepEqual(new Context().options, {})
})

test('Direct call', t => {
  t.is(new Context()('text'), 'text')
})

test('Render style', t => {
  const ctx = new Context()
  t.is(ctx.b('text'), '\x1b[1mtext\x1b[0m')
})

test('Start chaining from style', t => {
  const ctx = new Context()
  t.is(ctx.b().white('text'), '\x1b[1;38;2;255;255;255mtext\x1b[0m')
})

test('Render color', t => {
  const ctx = new Context()
  t.is(ctx.white('text'), '\x1b[38;2;255;255;255mtext\x1b[0m')
})

test('Start chaining from color', t => {
  const ctx = new Context()
  t.is(ctx.white().b('text'), '\x1b[1;38;2;255;255;255mtext\x1b[0m')
})

test('Modifier: bg', t => {
  const ctx = new Context()
  t.is(ctx.bg.white('text'), '\x1b[48;2;255;255;255mtext\x1b[0m')
})

test('Modifier: dark', t => {
  const ctx = new Context()
  t.regex(ctx.dark.red('text'), ColorRegExp)
})

test('Modifier: light', t => {
  const ctx = new Context()
  t.regex(ctx.light.red('text'), ColorRegExp)
})

test('Fallback to default when color in modifier is not available', t => {
  const ctx = new Context()
  t.is(ctx.light.white('text'), '\x1b[38;2;255;255;255mtext\x1b[0m')
})

test('Set color using RGB', t => {
  const ctx = new Context()
  t.is(ctx.rgb(255, 130, 30)('text'), '\x1b[38;2;255;130;30mtext\x1b[0m')
})

test('Set color using HSV', t => {
  const ctx = new Context()
  t.is(ctx.hsv(0, 100, 100)('text'), '\x1b[38;2;255;0;0mtext\x1b[0m')
})

test('Rainbow color', t => {
  const ctx = new Context()
  t.regex(ctx.rainbow('text'), EachCharRegExp)
})

test('Hash color', t => {
  const ctx = new Context()
  t.regex(ctx.hash('text'), ColorRegExp)
})