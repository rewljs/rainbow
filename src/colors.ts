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

type PresetColors = (typeof presetColors)[number]

const Colors: Record<string, string> = {}

const createColor = (name: PresetColors, h: number, s?: number, v?: number) => {
  const rgb = hsv2rgb(h, s, v)
  Colors[name] = `2;${rgb.join(';')}`
}

createColor('black', 0, 0, 0)
createColor('gray', 0, 0, 50)
createColor('grey', 0, 0, 50)
createColor('white', 0, 0, 100)
createColor('red', 5)
createColor('orange', 25)
createColor('yellow', 48)
createColor('olive', 77)
createColor('green', 115)
createColor('mint', 156)
createColor('cyan', 185)
createColor('sky', 210)
createColor('blue', 230)
createColor('purple', 265)
createColor('violet', 285)
createColor('pink', 312)

export default Colors as Record<PresetColors, string>
export { presetColors }
export type { PresetColors }