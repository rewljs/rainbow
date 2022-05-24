import test from 'ava'
import render from '../src/render'

test('Provide escape sequence directly', t => {
  const rendered = render({
    content: 'text',
    escape: '\x1b[38;2;255;130;30m',
  })
  t.is(rendered, '\x1b[38;2;255;130;30mtext\x1b[0m')
  t.log(rendered)
})

test('Render orange text', t => {
  const rendered = render({
    content: 'text',
    color: [255, 130, 30],
  })
  t.is(rendered, '\x1b[38;2;255;130;30mtext\x1b[0m')
  t.log(rendered)
})

test('Render orange text inside blue text', t => {
  const inside = render({
    content: 'inside',
    color: [255, 130, 30],
  })
  const outside = render({
    content: `outside ${inside} outside`,
    color: [70, 200, 255],
  })
  t.log(outside)
  t.is(outside, '\x1b[38;2;70;200;255moutside \x1b[38;2;255;130;30minside\x1b[0m\x1b[38;2;70;200;255m outside\x1b[0m')
})

test('Render two orange texts inside blue text', t => {
  const inside = render({
    content: 'inside',
    color: [255, 130, 30],
  })
  const outside = render({
    content: `outside ${inside} outside ${inside} outside`,
    color: [70, 200, 255],
  })
  t.log(outside)
  t.is(outside, '\x1b[38;2;70;200;255moutside \x1b[38;2;255;130;30minside\x1b[0m\x1b[38;2;70;200;255m outside \x1b[38;2;255;130;30minside\x1b[0m\x1b[38;2;70;200;255m outside\x1b[0m')
})

test('Render orange text inside blue text inside pink text', t => {
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
  t.log(outside)
  t.is(outside, '\x1b[38;2;245;130;185moutside \x1b[38;2;70;200;255mmiddle \x1b[38;2;255;130;30minside\x1b[0m\x1b[38;2;70;200;255m middle\x1b[0m\x1b[38;2;245;130;185m outside\x1b[0m')
})

test('Render orange text left to blue text inside pink text', t => {
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
  t.log(outside)
  t.is(outside, '\x1b[38;2;245;130;185moutside \x1b[38;2;70;200;255mmiddle \x1b[38;2;255;130;30minside\x1b[0m\x1b[38;2;245;130;185m outside\x1b[0m')
})

test('Render orange text right to blue text inside pink text', t => {
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
  t.log(outside)
  t.is(outside, '\x1b[38;2;245;130;185moutside \x1b[38;2;255;130;30minside\x1b[0m\x1b[38;2;70;200;255m middle\x1b[0m\x1b[38;2;245;130;185m outside\x1b[0m')
})

test('Render text with orange background', t => {
  const rendered = render({
    content: 'text',
    background: [255, 130, 30],
  })
  t.is(rendered, '\x1b[48;2;255;130;30mtext\x1b[0m')
  t.log(rendered)
})

test('Render bold text', t => {
  const rendered = render({
    content: 'text',
    bold: true,
  })
  t.is(rendered, '\x1b[1mtext\x1b[0m')
  t.log(rendered)
})

test('Render italic text', t => {
  const rendered = render({
    content: 'text',
    italic: true,
  })
  t.is(rendered, '\x1b[3mtext\x1b[0m')
  t.log(rendered)
})

test('Render underline text', t => {
  const rendered = render({
    content: 'text',
    underline: true,
  })
  t.is(rendered, '\x1b[4mtext\x1b[0m')
  t.log(rendered)
})

test('Render pink bold italic underline text with dark purple background', t => {
  const rendered = render({
    content: 'text',
    bold: true,
    italic: true,
    underline: true,
    color: [245, 130, 185],
    background: [70, 20, 150],
  })
  t.log(rendered)
  t.is(rendered, '\x1b[1;3;4;38;2;245;130;185;48;2;70;20;150mtext\x1b[0m')
})

test('Invert text color and background color in the middle', t => {
  const inside = render({
    content: 'inside',
    invert: true,
  })
  const outside = render({
    content: `outside ${inside} outside`,
    color: [255, 130, 30],
    background: [20, 50, 75],
  })
  t.log(outside)
  t.is(outside, '\x1b[38;2;255;130;30;48;2;20;50;75moutside \x1b[7minside\x1b[0m\x1b[38;2;255;130;30;48;2;20;50;75m outside\x1b[0m')
})