export function plural(count, one, many) {
  return `${count} ${count === 1 ? one : many}`
}
