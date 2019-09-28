export const objectToStringArray = (object => Object.keys(object).reduce((acc, cur, i) => {
  acc.push(cur)
  acc.push(object[cur])
  return acc
}, [])
)