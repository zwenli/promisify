function validateFunction(fn, name) {
  if (typeof fn !== 'function') {
    throw new Error(`${name}'s type must be function`)
  }
}

export function promisify(original) {
  validateFunction(original)

  function fn(...args) {
    return new Promise((resolve, reject) => {
      args.push((err, ...values) => {
        if (err) {
          return reject(err)
        }
        resolve(values[0])
      })
      Reflect.apply(original, this, args)
    })
  }

  Reflect.setPrototypeOf(fn, Reflect.getPrototypeOf(original))
  return Object.defineProperties(fn, Object.getOwnPropertyDescriptors(original))
}

// for callbacks without error for its first argument
export function promisifyNoError(original) {
  validateFunction(original)

  function fn(...args) {
    return new Promise((resolve) => {
      args.push((...values) => {
        resolve(values)
      })
      Reflect.apply(original, this, args)
    })
  }

  Reflect.setPrototypeOf(fn, Reflect.getPrototypeOf(original))
  return Object.defineProperties(fn, Object.getOwnPropertyDescriptors(original))
}
