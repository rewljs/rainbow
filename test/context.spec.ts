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

test('Render colored text', t => {
  const ctx = new Context()
  t.is(ctx.white('text'), '\x1b[38;2;255;255;255mtext\x1b[0m')
})

test('Render style -> color chain', t => {
  const ctx = new Context()
  t.is(ctx.b().white('text'), '\x1b[1;38;2;255;255;255mtext\x1b[0m')
})

test('Render color -> style chain', t => {
  const ctx = new Context()
  t.is(ctx.white().b('text'), '\x1b[1;38;2;255;255;255mtext\x1b[0m')
})

test('Render rainbow color text', t => {
  const ctx = new Context()
  t.regex(ctx.rainbow('text'), TestRegExp)
})