const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { syncDate, dateToString } = require('../../../middleware/timeConvert')

module.exports = async function (req, res) {
  try {
    const users = await prisma.user.findMany({
      where: {
        role: "employee",
      },
      include: {
        spending: true,
        department: true,
      },
    });
    users.forEach((e) => {
      e.department = e.department.name;
      delete e.createdAt;
      delete e.updatedAt;
      delete e.password;
      delete e.username;
      e.spending.forEach((item) => {
        item.date = dateToString(item.date)
        delete item.createdAt;
        delete item.updatedAt;
      });
    });
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};
