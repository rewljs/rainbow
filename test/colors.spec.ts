import test from 'ava'
import Colors, { presetColors } from '../src/colors'

test('Test color: white', t => {
  t.is(Colors.white, '2;255;255;255')
})

test('All preset colors are attached to the Colors object', t => {
  t.deepEqual(Object.keys(Colors), presetColors)
})