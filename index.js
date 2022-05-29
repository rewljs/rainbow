const Rainbow = require('./lib').default
const ColorList = require('./lib').ColorList
const render = require('./lib').render
const hsv2rgb = require('./lib').hsv2rgb

module.exports = Rainbow
module.exports.ColorList = ColorList
module.exports.render = render
module.exports.hsv2rgb = hsv2rgb