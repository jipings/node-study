
const assert = require('assert');
const request = require('supertest');

describe('=== http ===', () => {
    let app;

    before(() => {
        app = require('..')
    });

    it('should GET /', () => {
        return request(app)
            .get('/')
            .expect('Content-Type', /html/)
            .expect(200);
    });

    it('should list todo', () => {
        return request(app)
            .get('/api/todo')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(res => {
                assert(res.body[0].title.includes('Node.js'));
            })
    })

    it('should GET list with filter: completed=false', () => {
        return request(app)
            .get('/api/todo')
            .query({completed: false})
            .expect('Content-Type', /json/)
            .expect('X-Response-Time', /\d+ms/)
            .expect(200)
            .then(res => {
                assert(res.body[0].title.includes('Egg'));
            });
    });

})