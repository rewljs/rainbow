import test from 'ava'
import { Context } from '../src/index'

test('Test', t => {
  t.log(new Context().blue())
  t.pass()
})