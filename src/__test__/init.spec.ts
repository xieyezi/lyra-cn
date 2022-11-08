import { describe, test, expect } from 'vitest'
import { useLyra } from '../index'

describe('init db', () => {
  const { init } = useLyra()
  const db = init({
    key: 'string',
    quote: 'string',
    author: 'string',
  })
  test('db will be init', () => {
    expect(db).toBeTypeOf('object')
  })
})
