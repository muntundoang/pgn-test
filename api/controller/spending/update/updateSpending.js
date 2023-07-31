const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = async function (req, res) {
  let { role, data } = req.body;
  if (data?.date) {
    const myDate = data.date.split("-");
    const newDate = new Date(myDate[2], myDate[1] - 1, myDate[0]);
    data.date = newDate;
  }
  const option = {
    where: {
      id: data.id,
    },
    data: data,
    include: {
      employee: {
        select: {
          name: true,
          departmentId: true,
        },
      },
    },
  };
  try {
    if (role === "admin") {
      const updateSpend = await prisma.spending.update(option);
      delete updateSpend.createdAt;
      delete updateSpend.updatedAt;
      res.status(200).json(updateSpend);
    } else {
      throw { error: "role not an admin" };
    }
  } catch (error) {
    res.send(error);
  }
};
