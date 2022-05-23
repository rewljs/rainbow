import test from 'ava'
import hsv2rgb from '../src/hsv2rgb'
import type { Color } from '../src/types'

const transform = test.macro({
  exec(t, input: Color, expected: Color) {
    t.deepEqual(hsv2rgb(...input), expected)
  },
  title(provided = '', input) {
    return `HSV to RGB: ${provided || `HSV(${input.join(', ')})`}`
  },
})

test('Black', transform, [0, 0, 0], [0, 0, 0])
test('Gray 50%', transform, [0, 0, 50], [128, 128, 128])
test('Gray 70%', transform, [0, 0, 70], [179, 179, 179])
test('White', transform, [0, 0, 100], [255, 255, 255])

test('Red', transform, [0, 100, 100], [255, 0, 0])
test('Green', transform, [120, 100, 100], [0, 255, 0])
test('Blue', transform, [240, 100, 100], [0, 0, 255])

test('Yellow', transform, [60, 100, 100], [255, 255, 0])
test('Cyan', transform, [180, 100, 100], [0, 255, 255])
test('Magenta', transform, [300, 100, 100], [255, 0, 255])

test(transform, [162, 66, 95], [82, 242, 194])
test(transform, [15, 68, 55], [140, 69, 45])
test(transform, [271, 67, 86], [148, 72, 219])

test('Red but 99% saturatiion', transform, [0, 100, 99], [252, 0, 0])
test('Red but 99% value', transform, [0, 99, 100], [255, 3, 3])

test('HSV to RGB: Treat h = 360 as h = 0', t => {
  const rgb = hsv2rgb(360, 100, 100)
  t.deepEqual(rgb, [255, 0, 0])
})