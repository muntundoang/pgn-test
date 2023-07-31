const { PrismaClient } = require("@prisma/client");
const { hashPassword } = require("../../../middleware/bcrypt");
const prisma = new PrismaClient();

module.exports = async function (req, res) {
    try {
        let {
            name,
            username,
            role,
            password,
            departmentId
        } = req.body

        if(!role){
            role = 'employee'
        }

        const payload = await prisma.user.create({
            data: {
                name,
                username,
                departmentId,
                password: hashPassword(password),
                role,
            },
            select: {
                id: true,
                name: true,
                role: true,
                departmentId: true,
                spending: true,
                department: {
                    select: {
                        name: true
                    }
                }
            }
        })
        payload.department = payload.department.name
        console.log(payload)
        res.status(200).json({message: 'User Created', payload})
    } catch (error) {
        console.log(error)
        res.send(error)
    }
}