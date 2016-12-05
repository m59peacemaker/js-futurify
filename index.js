function Futurize (Future) {
  return function futurize (fn) {
    return function futurized () {
      var args = [].slice.call(arguments)
      return new Future(function (reject, resolve) {
        function cb (err, result) {
          err ? reject(err) : resolve(result)
        }
        fn.apply(undefined, args.concat(cb))
      })
    }
  }
}

module.exports = Futurize
