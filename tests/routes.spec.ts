import request from 'supertest';
import { app, server } from '../src/index';

describe('Connect4 api endoints', () => {
    afterAll((done) => {
        server.close(done);
    });

    it('tests POST /game endpoint', async () => {
        const response = await request(app).post('/game');
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe(
            '| | | | | | | |\n| | | | | | | |\n| | | | | | | |\n| | | | | | | |\n| | | | | | | |\n| | | | | | | |\n',
        );
    });

    it('tests GET /board endpoint', async () => {
        const response = await request(app).get('/board');
        expect(response.statusCode).toBe(200);
        expect(response.text).toHaveLength(96);
        expect(typeof response.text).toBe('string');
    });

    it('tests PUT /token/user/1 endpoint, should return board', async () => {
        const response = await request(app).put('/token/user/1');
        expect(response.statusCode).toBe(200);
        expect(response.text).toHaveLength(96);
        expect(typeof response.text).toBe('string');
    });

    it('tests PUT /token/user/0 endpoint, should return an error 404', async () => {
        const response = await request(app).put('/token/user/0');
        expect(response.statusCode).toBe(404);
    });

    it('tests PUT /token/house endpoint', async () => {
        const response = await request(app).put('/token/house');
        expect(response.statusCode).toBe(200);
        expect(response.text).toHaveLength(96);
        expect(typeof response.text).toBe('string');
    });

    it('tests POST /board/open endpoint', async () => {
        const response = await request(app).post('/door/open');
        expect(response.statusCode).toBe(403);
        expect(response.text).toBe('The door is closed.');
    });
});
