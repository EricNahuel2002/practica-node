import request from 'supertest';
import app from '../../app';
import prisma from '../../prismaClient';

describe('Users API E2E', () => {

  let userId: number;

  beforeAll(async () => {
    await prisma.users.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  test('POST /api/users crea usuario', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({ nombre: 'E2E User' });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');

    userId = res.body.id;
  });

  test('GET /api/users devuelve lista', async () => {
    const res = await request(app).get('/api/users');

    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test('GET /api/users/:id devuelve usuario', async () => {
    const res = await request(app).get(`/api/users/${userId}`);

    expect(res.status).toBe(200);
    expect(res.body.id).toBe(userId);
  });

  test('PUT /api/users/:id actualiza usuario', async () => {
    const res = await request(app)
      .put(`/api/users/${userId}`)
      .send({ nombre: 'Actualizado' });

    expect(res.status).toBe(200);
    expect(res.body.nombre).toBe('Actualizado');
  });

  test('DELETE /api/users/:id elimina usuario', async () => {
    const res = await request(app)
      .delete(`/api/users/${userId}`);

    expect(res.status).toBe(200);
    expect(res.body.mensaje).toBe('Usuario eliminado');
  });

  test('GET usuario eliminado devuelve 404', async () => {
    const res = await request(app)
      .get(`/api/users/${userId}`);

    expect(res.status).toBe(404);
  });

});