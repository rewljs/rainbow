import hsv2rgb from './impl/hsv2rgb'

const presetColors = [
  'black',
  'gray',
  'grey',
  'white',
  'red',
  'orange',
  'honey',
  'yellow',
  'lemon',
  'olive',
  'green',
  'mint',
  'cyan',
  'sky',
  'blue',
  'purple',
  'violet',
  'magenta',
  'pink',
] as const

type PresetColors = typeof presetColors[number]

const Colors: Record<string, string> = {}

const createColor = (name: PresetColors, h: number, s: number, v: number) => {
  const rgb = hsv2rgb(h, s, v)
  Colors[name] = `2;${rgb.join(';')}`
}

createColor('black', 0, 0, 0)
createColor('gray', 0, 0, 50)
createColor('grey', 0, 0, 50)
createColor('white', 0, 0, 100)
createColor('red', 8, 70, 95)
createColor('orange', 25, 80, 95)
createColor('honey', 36, 80, 95)
createColor('yellow', 48, 80, 95)
createColor('lemon', 60, 80, 90)
createColor('olive', 78, 70, 95)
createColor('green', 115, 70, 90)
createColor('mint', 156, 75, 95)
createColor('cyan', 185, 80, 95)
createColor('sky', 202, 90, 95)
createColor('blue', 230, 70, 100)
createColor('purple', 265, 60, 100)
createColor('violet', 280, 60, 95)
createColor('magenta', 300, 50, 95)
createColor('pink', 315, 45, 95)

export default Colors as Record<PresetColors, string>
export { presetColors }
export type { PresetColors }