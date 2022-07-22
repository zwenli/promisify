import { promisify } from '../src/index.js'
import test from 'ava'


function mock(isResolve, cb) {
  if (isResolve) {
    cb(null, true)
  } else {
    cb(new Error('false'))
  }
}

const pMock = promisify(mock)

test('resolve', async (t) => {
  try {
    const res = await pMock(true)
    t.is(res, true)
    t.pass()
  } catch {
    t.fail()
  }
})

test('reject', async (t) => {
  try {
    const res = await pMock(false)
    t.fail()
  } catch(err) {
    t.is(err.message, 'false')
    t.pass()
  }
})