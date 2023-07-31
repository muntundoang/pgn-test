const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = async function (req, res) {
  const { role, data } = req.body;
  console.log(req.body)
  const obj = {
    ...data,
  };
  delete obj.id;
  delete obj.employee
  try {
    if (role === "admin") {
      const updateDept = await prisma.department.update({
        where: {
          id: data.id,
        },
        data: obj,
        include: {
          employee: {
            select: {
              name: true,
              id: true,
            },
          },
        },
      });
      delete updateDept.createdAt;
      delete updateDept.updatedAt;
      res.status(200).json(updateDept);
    } else {
      throw { error: "role not an admin" };
    }
  } catch (error) {
    res.send(error);
  }
};
