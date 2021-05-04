'use strict';

const supertest = require('supertest');
const server = require('../src/server.js');
const request = supertest(server.app);
let id;
describe('Testing server', () => {

  
  it('should send 404 error on a bad route', async () => {
    const response = await request.get('/wrongroute');
    
    expect(response.status).toEqual(404);
  });
  
  it('should send a 404 error when no food is found', async () => {
    const response = await request.get('/error');
    
    expect(response.status).toEqual(404);
  });

  it('Create a record', async () => {
    const response = await request.post('/food/').send({
      name: "Salmofish",
      catugary: "SeaFood"
    })
    expect(response.status).toEqual(201);
    expect(response.body.record.name).toEqual("Salmofish");
    expect(response.body.record.catugary).toEqual("SeaFood");
    id = response.body.id
  });
  // Update a record 
  it('Update a record', async () => {
    const response = await request.put(`/food/${id}`).send({
      name: "Salmofish",
      catugary: "SeaFood"
    });
    expect(response.status).toEqual(200);
    expect(response.body.record.name).toEqual('Salmofish');
    expect(response.body.record.catugary).toEqual('SeaFood');
  });
  // Read a record
  it('Read a record', async () => {
    const response = await request.get(`/food/${id}`);
    expect(response.status).toEqual(200);
    expect(response.body.record.name).toEqual('Salmofish');
    expect(response.body.record.catugary).toEqual('SeaFood');
  });
  // Read all Records
  it('Read all record', async () => {
    const response = await request.get('/food/');
    expect(response.status).toEqual(200);
    expect(response.body[0].record.name).toEqual('Salmofish');
    expect(response.body[0].record.catugary).toEqual('SeaFood');
  });
  // Delete a record
  it('Delete a record', async () => {
    const response = await request.delete(`/food/${id}`);
    expect(response.status).toEqual(202);
    
  });
});
