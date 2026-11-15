import test from 'node:test'
import assert from 'node:assert/strict'
import { validateAuth } from './authValidation.js'

const valid = { fullName: 'Test User', email: 'test@example.com', phone: '+60 12 345 6789', password: 'example-only' }

test('empty registration requires all four fields', () => {
  assert.deepEqual(Object.keys(validateAuth({}, true)), ['fullName', 'email', 'phone', 'password'])
})
test('login checks only email and password and accepts an existing short password', () => {
  assert.deepEqual(validateAuth({ email: valid.email, password: 'short' }), {})
})
test('email validation rejects malformed addresses and accepts surrounding whitespace', () => {
  for (const email of ['missing-at', 'a@', 'a@b', 'a b@example.com']) {
    assert.ok(validateAuth({ ...valid, email }).email)
  }
  assert.deepEqual(validateAuth({ ...valid, email: ' test@example.com ' }), {})
})
test('registration rejects blank names and short or whitespace-only passwords', () => {
  assert.ok(validateAuth({ ...valid, fullName: '  ' }, true).fullName)
  for (const password of ['short', '        ']) {
    assert.ok(validateAuth({ ...valid, password }, true).password)
  }
})
test('phone validation rejects letters, misplaced plus signs and invalid lengths', () => {
  for (const phone of ['123', '+1234567890123456', '012abc345678', '012+345678']) {
    assert.ok(validateAuth({ ...valid, phone }, true).phone)
  }
})
test('registration accepts formatted local and international phone numbers', () => {
  for (const phone of ['012-345 6789', '+60 (12) 345-6789']) {
    assert.deepEqual(validateAuth({ ...valid, phone }, true), {})
  }
})
test('validation does not mutate entered values', () => {
  const values = Object.freeze({ ...valid })
  validateAuth(values, true)
  assert.deepEqual(values, valid)
})
