import test from 'ava'
import Colors, { presetColors } from '../src/colors'

test('Test color: black', t => {
  t.is(Colors.black, '2;0;0;0')
})

test('Test color: grey', t => {
  t.is(Colors.grey, '2;128;128;128')
})

test('Test color: white', t => {
  t.is(Colors.white, '2;255;255;255')
})

test('All preset colors are attached to the Colors object', t => {
  t.deepEqual(Object.keys(Colors), presetColors)
})