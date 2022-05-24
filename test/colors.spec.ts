import test from 'ava'
import Colors from '../src/colors'

test('Black', t => {
  t.is(Colors.black, '2;0;0;0')
})

test('Gray', t => {
  t.is(Colors.gray, '2;128;128;128')
})

test('White', t => {
  t.is(Colors.white, '2;255;255;255')
})