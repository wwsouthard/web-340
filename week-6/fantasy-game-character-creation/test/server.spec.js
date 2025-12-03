const http = require('http');
const server = require('../src/server');

describe('Fantasy Game Character Creation Server', () => {
  const PORT = 3001; // Use different port to avoid conflicts
  let testServer;

  beforeAll((done) => {
    testServer = server.listen(PORT, () => {
      done();
    });
  });

  afterAll((done) => {
    testServer.close(() => {
      done();
    });
  });

  test('GET / should return welcome message', (done) => {
    const req = http.get(`http://localhost:${PORT}/`, (res) => {
      expect(res.statusCode).toBe(200);
      expect(res.headers['content-type']).toContain('application/json');

      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        const response = JSON.parse(data);
        expect(response.message).toBeDefined();
        expect(response.endpoints).toBeDefined();
        done();
      });
    });

    req.on('error', (err) => {
      done(err);
    });
  });

  test('GET /api/characters should return all characters', (done) => {
    const req = http.get(`http://localhost:${PORT}/api/characters`, (res) => {
      expect(res.statusCode).toBe(200);
      expect(res.headers['content-type']).toContain('application/json');

      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        const characters = JSON.parse(data);
        expect(Array.isArray(characters)).toBe(true);
        expect(characters.length).toBeGreaterThan(0);
        expect(characters[0]).toHaveProperty('id');
        expect(characters[0]).toHaveProperty('name');
        expect(characters[0]).toHaveProperty('class');
        expect(characters[0]).toHaveProperty('level');
        done();
      });
    });

    req.on('error', (err) => {
      done(err);
    });
  });

  test('GET /api/characters/1 should return a specific character', (done) => {
    const req = http.get(`http://localhost:${PORT}/api/characters/1`, (res) => {
      expect(res.statusCode).toBe(200);
      expect(res.headers['content-type']).toContain('application/json');

      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        const character = JSON.parse(data);
        expect(character).toHaveProperty('id');
        expect(character).toHaveProperty('name');
        expect(character).toHaveProperty('class');
        expect(character).toHaveProperty('level');
        expect(character.id).toBe(1);
        done();
      });
    });

    req.on('error', (err) => {
      done(err);
    });
  });

  test('GET /api/characters/999 should return 404 for non-existent character', (done) => {
    const req = http.get(`http://localhost:${PORT}/api/characters/999`, (res) => {
      expect(res.statusCode).toBe(404);
      expect(res.headers['content-type']).toContain('application/json');

      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        const response = JSON.parse(data);
        expect(response.error).toBeDefined();
        expect(response.error).toBe('Character not found');
        done();
      });
    });

    req.on('error', (err) => {
      done(err);
    });
  });

  test('GET /api/characters/invalid should return 400 for invalid ID', (done) => {
    const req = http.get(`http://localhost:${PORT}/api/characters/invalid`, (res) => {
      expect(res.statusCode).toBe(400);
      expect(res.headers['content-type']).toContain('application/json');

      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        const response = JSON.parse(data);
        expect(response.error).toBeDefined();
        expect(response.error).toBe('Invalid character ID');
        done();
      });
    });

    req.on('error', (err) => {
      done(err);
    });
  });

  test('GET /unknown-route should return 404', (done) => {
    const req = http.get(`http://localhost:${PORT}/unknown-route`, (res) => {
      expect(res.statusCode).toBe(404);
      expect(res.headers['content-type']).toContain('application/json');

      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        const response = JSON.parse(data);
        expect(response.error).toBeDefined();
        expect(response.error).toBe('Route not found');
        done();
      });
    });

    req.on('error', (err) => {
      done(err);
    });
  });
});