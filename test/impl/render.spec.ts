import test from 'ava'
import render, { expandStyle } from '../../src/impl/render'
import type { SegmentStyles, SegmentStylesDeduped } from '../../src/impl/render'

test('Pure text', t => {
  const rendered = render({
    content: 'text',
  })
  t.is(rendered, 'text')
})

test('Orange text', t => {
  const rendered = render({
    content: 'text',
    color: [255, 130, 30],
  })
  t.is(rendered, '\x1b[38;2;255;130;30mtext\x1b[0m')
})

test('Orange text with direct color code', t => {
  const rendered = render({
    content: 'text',
    color: '2;255;130;30',
  })
  t.is(rendered, '\x1b[38;2;255;130;30mtext\x1b[0m')
})

test('Orange text inside blue text', t => {
  const inside = render({
    content: 'inside',
    color: [255, 130, 30],
  })
  const outside = render({
    content: `outside ${inside} outside`,
    color: [70, 200, 255],
  })
  t.is(outside, '\x1b[38;2;70;200;255moutside \x1b[38;2;255;130;30minside\x1b[0m\x1b[38;2;70;200;255m outside\x1b[0m')
})

test('Two orange texts inside blue text', t => {
  const inside = render({
    content: 'inside',
    color: [255, 130, 30],
  })
  const outside = render({
    content: `outside ${inside} outside ${inside} outside`,
    color: [70, 200, 255],
  })
  t.is(outside, '\x1b[38;2;70;200;255moutside \x1b[38;2;255;130;30minside\x1b[0m\x1b[38;2;70;200;255m outside \x1b[38;2;255;130;30minside\x1b[0m\x1b[38;2;70;200;255m outside\x1b[0m')
})

test('Orange text inside blue text inside pink text', t => {
  const inside = render({
    content: 'inside',
    color: [255, 130, 30],
  })
  const middle = render({
    content: `middle ${inside} middle`,
    color: [70, 200, 255],
  })
  const outside = render({
    content: `outside ${middle} outside`,
    color: [245, 130, 185],
  })
  t.is(outside, '\x1b[38;2;245;130;185moutside \x1b[38;2;70;200;255mmiddle \x1b[38;2;255;130;30minside\x1b[0m\x1b[38;2;245;130;185m\x1b[38;2;70;200;255m middle\x1b[0m\x1b[38;2;245;130;185m outside\x1b[0m')
})

test('Orange text left to blue text inside pink text', t => {
  const inside = render({
    content: 'inside',
    color: [255, 130, 30],
  })
  const middle = render({
    content: `middle ${inside}`,
    color: [70, 200, 255],
  })
  const outside = render({
    content: `outside ${middle} outside`,
    color: [245, 130, 185],
  })
  t.is(outside, '\x1b[38;2;245;130;185moutside \x1b[38;2;70;200;255mmiddle \x1b[38;2;255;130;30minside\x1b[0m\x1b[38;2;245;130;185m outside\x1b[0m')
})

test('Orange text right to blue text inside pink text', t => {
  const inside = render({
    content: 'inside',
    color: [255, 130, 30],
  })
  const middle = render({
    content: `${inside} middle`,
    color: [70, 200, 255],
  })
  const outside = render({
    content: `outside ${middle} outside`,
    color: [245, 130, 185],
  })
  t.is(outside, '\x1b[38;2;245;130;185moutside \x1b[38;2;70;200;255m\x1b[38;2;255;130;30minside\x1b[0m\x1b[38;2;245;130;185m\x1b[38;2;70;200;255m middle\x1b[0m\x1b[38;2;245;130;185m outside\x1b[0m')
})

test('Text with orange background', t => {
  const rendered = render({
    content: 'text',
    background: [255, 130, 30],
  })
  t.is(rendered, '\x1b[48;2;255;130;30mtext\x1b[0m')
})

test('Text with orange background with direct color code', t => {
  const rendered = render({
    content: 'text',
    background: '2;255;130;30',
  })
  t.is(rendered, '\x1b[48;2;255;130;30mtext\x1b[0m')
})

test('Text with style reset', t => {
  const inside = render({
    content: 'inside',
    reset: true,
  })
  const outside = render({
    content: `outside ${inside} outside`,
    color: [255, 130, 30],
  })
  t.is(outside, '\x1b[38;2;255;130;30moutside \x1b[0m\x1b[0minside\x1b[0m\x1b[38;2;255;130;30m outside\x1b[0m')
})

test('Text with style reset (left edge)', t => {
  const inside = render({
    content: 'inside',
    reset: true,
  })
  const outside = render({
    content: `outside ${inside}`,
    color: [255, 130, 30],
  })
  t.is(outside, '\x1b[38;2;255;130;30moutside \x1b[0m\x1b[0minside\x1b[0m')
})

test('Text with style reset (right edge)', t => {
  const inside = render({
    content: 'inside',
    reset: true,
  })
  const outside = render({
    content: `${inside} outside`,
    color: [255, 130, 30],
  })
  t.is(outside, '\x1b[0m\x1b[0minside\x1b[0m\x1b[38;2;255;130;30m outside\x1b[0m')
})

test('Bold text', t => {
  const rendered = render({
    content: 'text',
    bold: true,
  })
  t.is(rendered, '\x1b[1mtext\x1b[0m')
})

test('Dim text', t => {
  const rendered = render({
    content: 'text',
    dim: true,
  })
  t.is(rendered, '\x1b[2mtext\x1b[0m')
})

test('Italic text', t => {
  const rendered = render({
    content: 'text',
    italic: true,
  })
  t.is(rendered, '\x1b[3mtext\x1b[0m')
})

test('Underline text', t => {
  const rendered = render({
    content: 'text',
    underline: true,
  })
  t.is(rendered, '\x1b[4mtext\x1b[0m')
})

test('Blink text', t => {
  const rendered = render({
    content: 'text',
    blink: true,
  })
  t.is(rendered, '\x1b[5mtext\x1b[0m')
})

test('Inverted text', t => {
  const rendered = render({
    content: 'text',
    inverse: true,
  })
  t.is(rendered, '\x1b[7mtext\x1b[0m')
})

test('Hidden text', t => {
  const rendered = render({
    content: 'text',
    hidden: true,
  })
  t.is(rendered, '\x1b[8mtext\x1b[0m')
})

test('Strikethrough text', t => {
  const rendered = render({
    content: 'text',
    strikethrough: true,
  })
  t.is(rendered, '\x1b[9mtext\x1b[0m')
})

test('Pink bold italic underline text with dark purple background', t => {
  const rendered = render({
    content: 'text',
    bold: true,
    italic: true,
    underline: true,
    color: [245, 130, 185],
    background: [70, 20, 150],
  })
  t.is(rendered, '\x1b[1;3;4;38;2;245;130;185;48;2;70;20;150mtext\x1b[0m')
})

test('Invert text color and background color in the middle', t => {
  const inside = render({
    content: 'inside',
    inverse: true,
  })
  const outside = render({
    content: `outside ${inside} outside`,
    color: [255, 130, 30],
    background: [20, 50, 75],
  })
  t.is(outside, '\x1b[38;2;255;130;30;48;2;20;50;75moutside \x1b[7minside\x1b[0m\x1b[38;2;255;130;30;48;2;20;50;75m outside\x1b[0m')
})

const testExpandStyle = test.macro({
  exec(t, input: SegmentStyles, expected: SegmentStylesDeduped) {
    t.is(expandStyle(input), expected)
  },
  title(_, input, expected) {
    return `Expand segment style: ${input} -> ${expected}`
  },
})

test(testExpandStyle, 'b', 'bold')
test(testExpandStyle, 'i', 'italic')
test(testExpandStyle, 'u', 'underline')
test(testExpandStyle, 's', 'strikethrough')
test(testExpandStyle, 'bold', 'bold')