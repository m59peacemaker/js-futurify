# futurize-c

Turns a function that takes a node-style callback into a function that returns a future.

## install

```sh
npm install futurize-c
```

## example

```js
const {Future} = require('ramda-fantasy')
const futurize = require('futurize-c')(Future) // pass in an implementation of Future

const incrementLater = (ms, n, cb) => {
  setTimeout(() => {
    cb(undefined, n + 1)
  }, ms)
}

const futureIncrement = futurize(incrementLater)
futureIncrement(500, 7).fork(
  console.error,
  console.log //=> 8
)
```
