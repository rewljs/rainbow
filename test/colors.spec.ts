import test from 'ava'
import Colors, { ColorList } from '../src/colors'

test('Shape of Colors', t => {
  const Colors_depth1 = {}
  for (const palette in Colors) {
    Colors_depth1[palette] = {}
  }

  const expected = {
    default: {},
    dark: {},
    light: {},
  }

  t.like(Colors_depth1, expected)
})

test('Shape of ColorList', t => {
  t.true(Array.isArray(ColorList))
})