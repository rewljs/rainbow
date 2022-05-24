import hsv2rgb from './hsv2rgb'

const presetColors = [
  'black',
  'gray',
  'grey',
  'white',
  'red',
  'orange',
  'yellow',
  'olive',
  'green',
  'mint',
  'cyan',
  'sky',
  'blue',
  'purple',
  'violet',
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
createColor('red', 8, 75, 95)
createColor('orange', 25, 80, 95)
createColor('yellow', 48, 80, 96)
createColor('olive', 75, 70, 95)
createColor('green', 115, 60, 95)
createColor('mint', 156, 80, 95)
createColor('cyan', 185, 80, 95)
createColor('sky', 205, 70, 95)
createColor('blue', 225, 65, 95)
createColor('purple', 265, 60, 95)
createColor('violet', 285, 60, 95)
createColor('pink', 312, 50, 95)

export default Colors as Record<PresetColors, string>
export { presetColors }
export type { PresetColors }