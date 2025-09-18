const { request } = require('@playwright/test');

async function getApiContext() {
  return await request.newContext({
    baseURL: 'https://api.example.com',
    extraHTTPHeaders: {
      Authorization: `Bearer ${process.env.API_TOKEN}`
    }
  });
}

module.exports = { getApiContext };
