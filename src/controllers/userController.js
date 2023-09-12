const { PrismaClient  } = require('@prisma/client')

const prisma = new PrismaClient()

const getAllUsers = async (request, response) => {
    try {
        const users = await prisma.user.findMany()
        return response.status(200).json(users)
    } catch (error) {
        response.status(500).json({
            error: error.message,
        })
    }
}

const getUserById = async (request, response) => {
    try {
        const user = await prisma.user.findUnique({
            where: {id: Number(request.params.id)}
        })
        return response.status(200).json(user)
    } catch (error) {
        response.status(500).json({
            error: error.message,
        })
    }
}

module.exports = {
    getAllUsers,
    getUserById
}