import test from 'ava'
import r from '../src/index'

test('Show colors', t => {
  t.log(
    r.red('text'),
    r.orange('text'),
    r.yellow('text'),
    r.olive('text'),
    r.green('text'),
    r.mint('text'),
    r.cyan('text'),
    r.sky('text'),
    r.blue('text'),
    r.purple('text'),
    r.violet('text'),
    r.pink('text'),
  )
  t.pass()
})