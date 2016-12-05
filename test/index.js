const test = require('tape')
const {Future} = require('ramda-fantasy')
const futurize = require('../')(Future)

const asyncFn = (a, b, cb) => {
  a ? cb(undefined, a + b) : cb(true)
}

test('returns a future', t => {
  t.plan(1)
  t.equal(futurize(asyncFn)(1, 1).constructor.name, 'Future')
})

test('fork works on resolve', t => {
  t.plan(1)
  futurize(asyncFn)(1, 1).fork(t.fail, t.pass)
})

test('fork works on reject', t => {
  t.plan(1)
  futurize(asyncFn)(undefined, undefined).fork(t.pass, t.fail)
})

test('fn is not executed until fork()', t => {
  t.plan(2)
  let called = false
  const fn = (cb) => {
    called = true
    cb()
  }
  const future = futurize(fn)()
  t.false(called)
  future.fork(t.fail, () => t.true(called))
})

test('cb(err) err is passed to fork reject', t => {
  t.plan(1)
  const fn = cb => cb('nope')
  futurize(fn)().fork(err => t.equal(err, 'nope'), t.fail)
})

test('cb(undefined, result) result is passed to fork resolve', t => {
  t.plan(1)
  const fn = cb => cb(undefined, 'yep')
  futurize(fn)().fork(t.fail, v => t.equal(v, 'yep'))
})

test('args are passed through', t => {
  t.plan(1)
  futurize(asyncFn)(3, 4).fork(t.fail, v => t.equal(v, 7))
})
