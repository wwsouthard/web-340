const http = require('http');
const url = require('url');

// Sample character data
const characters = [
  { id: 1, name: 'Aragorn', class: 'Ranger', level: 50 },
  { id: 2, name: 'Gandalf', class: 'Wizard', level: 100 },
  { id: 3, name: 'Legolas', class: 'Archer', level: 45 }
];

// Helper function to parse URL and query parameters
function parseRequest(req) {
  const parsedUrl = url.parse(req.url, true);
  return {
    pathname: parsedUrl.pathname,
    query: parsedUrl.query,
    method: req.method
  };
}

// Helper function to send JSON response
function sendJSON(res, statusCode, data) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}

// Helper function to send error response
function sendError(res, statusCode, message) {
  sendJSON(res, statusCode, { error: message });
}

const server = http.createServer((req, res) => {
  const { pathname, method } = parseRequest(req);

  // Handle CORS preflight requests
  if (method === 'OPTIONS') {
    res.writeHead(200, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
    res.end();
    return;
  }

  // Home route
  if (pathname === '/' && method === 'GET') {
    sendJSON(res, 200, {
      message: 'Welcome to the Fantasy Game Character Creation API',
      endpoints: {
        '/api/characters': 'GET - Get all characters',
        '/api/characters/:id': 'GET - Get a specific character by ID'
      }
    });
    return;
  }

  // Get all characters
  if (pathname === '/api/characters' && method === 'GET') {
    sendJSON(res, 200, characters);
    return;
  }

  // Get character by ID
  if (pathname.startsWith('/api/characters/') && method === 'GET') {
    const id = parseInt(pathname.split('/')[3]);
    
    if (isNaN(id)) {
      sendError(res, 400, 'Invalid character ID');
      return;
    }

    const character = characters.find(c => c.id === id);
    
    if (!character) {
      sendError(res, 404, 'Character not found');
      return;
    }

    sendJSON(res, 200, character);
    return;
  }

  // 404 Not Found
  sendError(res, 404, 'Route not found');
});

// Only listen if this file is run directly (not when required for testing)
if (require.main === module) {
  server.listen(3000, () => {
    console.log('Server listening on port 3000');
  });
}

module.exports = server;