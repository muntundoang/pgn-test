const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = async function (req, res) {
  const { id, role } = req.body;

  try {
    if (role === "admin") {
      const deleteDept = await prisma.department.delete({
        where: {
          id: id,
        },
      });
      res.status(200).json({message: `Department ${deleteDept.name} deleted`});
    } else {
      throw { error: "role not an admin" };
    }
  } catch (error) {
    res.send(error);
  }
};
