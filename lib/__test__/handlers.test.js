const handlers = require('../handlers')

test('Render "MAIN" page is OK', () => {
    const req = {}
    const res = { render: jest.fn() }
    handlers.home(req,res)
    expect(res.render.mock.calls.length).toBe(1)
    expect(res.render.mock.calls[0][0]).toBe('home')
})

test('Render "ABOUT" page is OK', () => {
    const req = {}
    const res = { render: jest.fn() }
    handlers.about(req,res)
    expect(res.render.mock.calls.length).toBe(1)
    expect(res.render.mock.calls[0][0]).toBe('about')
    expect(res.render.mock.calls[0][1])
        .toEqual(expect.objectContaining({
            fortune: expect.stringMatching(/\W/)
        }))
})

test('Render "404" page is OK', () => {
    const req = {}
    const res = { render: jest.fn() }
    handlers.notFound(req,res)
    expect(res.render.mock.calls.length).toBe(1)
    expect(res.render.mock.calls[0][0]).toBe('404')
})

test('Render "500" page is OK', () => {
    const err = new Error('Some errors')
    const req = {}
    const res = { render: jest.fn() }
    handlers.serverError(err,req,res)
    expect(res.render.mock.calls.length).toBe(1)
    expect(res.render.mock.calls[0][0]).toBe('500')
})