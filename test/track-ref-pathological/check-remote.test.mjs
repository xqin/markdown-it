import needle from 'needle'
import assert from 'node:assert'
import { describe, it } from 'node:test'
import crypto from 'node:crypto'
import { readFileSync } from 'fs'

describe('Verify original reference', () => {
  it('verify original source crc', async () => {
    /* eslint-disable  max-len */
    const src = await needle('get', 'https://raw.githubusercontent.com/commonmark/cmark/master/test/pathological_tests.py')
    const src_md5 = crypto.createHash('md5').update(src.body).digest('hex')
    const tracked_md5 = JSON.parse(readFileSync(new URL('./pathological.json', import.meta.url))).md5

    assert.strictEqual(
      src_md5,
      tracked_md5,
      'CRC of cmark pathological tests changed. Verify and update pathological.json'
    )
  })
})
