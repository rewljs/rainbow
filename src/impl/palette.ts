import hsv2rgb from './hsv2rgb'

type ColorMethod<T extends readonly string[] | []> = T[number]

class Palette<T extends readonly string[] | []> {
  names: T = [] as T
  colors: Record<string, string> = {}

  constructor(names: T) {
    this.names = names as T
  }

  define(name: string, h: number, s: number, v: number) {
    const rgb = hsv2rgb(h, s, v)
    this.colors[name] = `2;${rgb.join(';')}`
    return this
  }

  check() {
    const impl = Object.keys(this.colors)
    if (impl.length != this.names.length) return false
    return this.names.every(name => impl.includes(name))
  }

  export() {
    return this.colors as Record<T[number], string>
  }
}

export default Palette
export { ColorMethod }