import test from 'ava'
import Palette from '../../src/impl/palette'

test('Create palette', t => {
  const palette = new Palette(['red'])
  t.deepEqual(palette.names, ['red'])
})

test('Define colors', t => {
  const palette = new Palette(['red'])
  palette.define('red', 0, 100, 100)
  t.deepEqual(palette.colors, { red: '2;255;0;0' })
})