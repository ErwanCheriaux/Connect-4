import request from 'supertest';
import { app, server } from '../src/index';

describe('Connect4 api endoints', () => {
    afterAll((done) => {
        server.close(done);
    });

    it('tests /game endpoints', async () => {
        const response = await request(app).post('/game');
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe(
            '| | | | | | | |\n| | | | | | | |\n| | | | | | | |\n| | | | | | | |\n| | | | | | | |\n| | | | | | | |\n',
        );
    });
});
