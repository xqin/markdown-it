import assert from 'node:assert'
import { describe, it } from 'node:test'
import crypto from 'node:crypto'
import { readFileSync } from 'fs'

describe('Verify original reference', () => {
  it('verify original source crc', async () => {
    /* eslint-disable  max-len */
    const response = await fetch('https://raw.githubusercontent.com/commonmark/cmark/master/test/pathological_tests.py')

    assert.strictEqual(response.ok, true, `Unable to fetch cmark pathological tests: ${response.status} ${response.statusText}`)

    const src_md5 = crypto.createHash('md5').update(await response.text()).digest('hex')
    const tracked_md5 = JSON.parse(readFileSync(new URL('./pathological.json', import.meta.url))).md5

    assert.strictEqual(
      src_md5,
      tracked_md5,
      'CRC of cmark pathological tests changed. Verify and update pathological.json'
    )
  })
})
