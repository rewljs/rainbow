import hsv2rgb from './hsv2rgb'

type ColorMethod<T extends readonly string[] | []> = T[number]

class Palette<T extends readonly string[] | []> {
  names: T = [] as T
  private _colors: Record<string, string> = {}

  constructor(names: T) {
    this.names = names as T
  }

  define(name: T[number], h: number, s: number, v: number) {
    const rgb = hsv2rgb(h, s, v)
    this._colors[name] = `2;${rgb.join(';')}`
    return this
  }

  get colors() {
    return this._colors as Record<T[number], string>
  }
}

export default Palette
export type { ColorMethod }