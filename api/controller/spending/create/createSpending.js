const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = async function (req, res) {
  try {
    let { employeeId, date, value } = req.body;

    const myDate = date.split("-");
    const newDate = new Date(myDate[2], myDate[1] - 1, myDate[0]);

    const user = await prisma.user.findUnique({
      where: {
        id: employeeId,
      },
    });

    if (!user) {
      throw { error: "Employee not found" };
    }

    const spendingCreate = await prisma.spending.create({
      data: {
        employeeId,
        date: newDate,
        value,
      },
    });

    res.status(200).json({ message: `Spending Created`, spendingCreate });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};
