import { promisify, promisifyNoError } from '../src/index.js'
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

const pNoErrorMock = promisifyNoError(mock)

test('promisifyNoError resolve', async (t) => {
  try {
    const res = await pNoErrorMock(true)
    t.is(res[1], true)
    t.pass()
  } catch {
    t.fail()
  }
})

test('promisifyNoError reject', async (t) => {
  try {
    const res = await pNoErrorMock(false)
    t.is(res[0].message, 'false')
    t.pass()
  } catch {
    t.fail()
  }
})