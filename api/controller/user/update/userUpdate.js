const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = async function (req, res) {
  const { role, data } = req.body;
  const obj = {
    ...data,
  };
  delete obj.id;
  try {
    if (role === "admin") {
      console.log(req.body);
      const updateUser = await prisma.user.update({
        where: {
          id: data.id,
        },
        data: obj,
        include: {
            spending: true,
            department: true
        }
      });
      delete updateUser.password
      delete updateUser.username
      delete updateUser.createdAt
      delete updateUser.updatedAt
      updateUser.department = updateUser.department.name
      res.status(200).json(updateUser);
    } else {
      throw { error: "role not an admin" };
    }
  } catch (error) {
    res.send(error);
  }
};
