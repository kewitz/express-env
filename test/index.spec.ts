import expressEnv from '../index'
import { stub, assert, reset } from 'sinon'

process.env = {
  'WILLEM': 'DAFOE',
  'MICHAEL': 'DOUGLAS',
}

const res = { send: stub().returns('') }
const req = {}

describe('express-env', () => {
  beforeEach(reset)

  it('should expose process.env to default namespace window.ENV', () => {
    expressEnv()(req, res, null)

    assert.calledWithExactly(res.send, `window.ENV = {"WILLEM":"DAFOE","MICHAEL":"DOUGLAS"}`)
  })

  it('should allow custom namespace', () => {
    expressEnv({ namespace: 'window.LEAKY_ENVIRONMENT' })(req, res, null)

    assert.calledWithExactly(res.send, `window.LEAKY_ENVIRONMENT = {"WILLEM":"DAFOE","MICHAEL":"DOUGLAS"}`)
  })

  it('should support array whitelisting', () => {
    expressEnv({ whitelist: ['MICHAEL'] })(req, res, null)

    assert.calledWithExactly(res.send, `window.ENV = {"MICHAEL":"DOUGLAS"}`)
  })

  it('should support whitelist function', () => {
    expressEnv({ whitelist: (val: string, key: string) => key.includes('LL') })(req, res, null)

    assert.calledWithExactly(res.send, `window.ENV = {"WILLEM":"DAFOE"}`)
  })

  it('should support array blacklisting', () => {
    expressEnv({ blacklist: ['MICHAEL'] })(req, res, null)

    assert.calledWithExactly(res.send, `window.ENV = {"WILLEM":"DAFOE"}`)
  })

  it('should support whitelist function', () => {
    expressEnv({ blacklist: (val: string, key: string) => key.includes('LL') })(req, res, null)

    assert.calledWithExactly(res.send, `window.ENV = {"MICHAEL":"DOUGLAS"}`)
  })
})