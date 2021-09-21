import app from './index.js';

describe('server', () => {
    it('exists', () => {
        expect(typeof app).toBe('function')
    })
})