const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = async function (req, res) {
  const { id, role } = req.body;

  try {
    if (role === "admin") {
      const deleteUser = await prisma.user.delete({
        where: {
          id: id,
        },
      });
      res.status(200).json(deleteUser);
    } else {
      throw { error: "role not an admin" };
    }
  } catch (error) {
    res.send(error);
  }
};
