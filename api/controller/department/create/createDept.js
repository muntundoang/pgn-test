const { PrismaClient } = require("@prisma/client");
const { hashPassword } = require("../../../middleware/bcrypt");
const prisma = new PrismaClient();

module.exports = async function (req, res) {
    try {
        let {
            name,
        } = req.body

        const payload = await prisma.department.create({
            data: {
                name,
            }
        })
        delete payload.createdAt
        delete payload.updatedAt
        res.status(200).json({message: `Department ${payload.name} Created`, payload})
    } catch (error) {
        console.log(error)
        res.send(error)
    }
}