const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const { getAllUsers, getUserById } = require('../../src/controllers/userController');

describe('method get', () => {
  it('should return json with all Users', async () => {
    const users = await prisma.user.findMany();

    const response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
    }

    await getAllUsers(null, response);

    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledWith(users);
  })

  it('should return json with one User', async() => {
    const user = await prisma.user.findUnique({
        where: { id : 1452335379 }
    })

    const request = { params : { id : 1452335379 } }
    const response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
    }

    await getUserById(request, response);
    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledWith(user);
  })
})