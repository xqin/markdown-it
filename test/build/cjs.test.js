'use strict'

const assert = require('node:assert/strict')
const { describe, it } = require('node:test')
const md = require('../../')()

describe('CJS', () => {
  it('require', () => {
    assert.strictEqual(md.render('abc'), '<p>abc</p>\n')
  })
})
