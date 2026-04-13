import request from 'supertest';
import app from '../../app';
import prisma from '../../prismaClient';

describe('Users API - Integration', () => {

  beforeEach(async () => {
    // limpiar tabla antes de cada test
    await prisma.users.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  // 🔹 POST
  test('POST /api/users crea usuario', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({ nombre: 'Juan' });

    expect(res.status).toBe(201);
    expect(res.body.nombre).toBe('Juan');

    // ✔️ verificar en DB
    const userInDb = await prisma.users.findUnique({
      where: { id: res.body.id }
    });

    expect(userInDb).not.toBeNull();
  });

  // 🔹 GET ALL
  test('GET /api/users devuelve usuarios desde DB', async () => {
    await prisma.users.create({
      data: { nombre: 'Maria' }
    });

    const res = await request(app).get('/api/users');

    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].nombre).toBe('Maria');
  });

  // 🔹 GET BY ID
  test('GET /api/users/:id devuelve usuario correcto', async () => {
    const user = await prisma.users.create({
      data: { nombre: 'Carlos' }
    });

    const res = await request(app)
      .get(`/api/users/${user.id}`);

    expect(res.status).toBe(200);
    expect(res.body.nombre).toBe('Carlos');
  });

  // 🔹 PUT
  test('PUT /api/users/:id actualiza en DB', async () => {
    const user = await prisma.users.create({
      data: { nombre: 'Viejo' }
    });

    const res = await request(app)
      .put(`/api/users/${user.id}`)
      .send({ nombre: 'Nuevo' });

    expect(res.status).toBe(200);

    const updated = await prisma.users.findUnique({
      where: { id: user.id }
    });

    expect(updated?.nombre).toBe('Nuevo');
  });

  // 🔹 DELETE
  test('DELETE /api/users/:id elimina de DB', async () => {
    const user = await prisma.users.create({
      data: { nombre: 'Eliminar' }
    });

    const res = await request(app)
      .delete(`/api/users/${user.id}`);

    expect(res.status).toBe(200);

    const deleted = await prisma.users.findUnique({
      where: { id: user.id }
    });

    expect(deleted).toBeNull();
  });

});