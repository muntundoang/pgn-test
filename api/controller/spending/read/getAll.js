const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { syncDate, dateToString } = require('../../../middleware/timeConvert')

module.exports = async function (req, res) {
  try {
    const option = {
      include: {
        employee: {
          select: {
            name: true,
            departmentId: true,
          },
        },
      },
    };
    const obj = await prisma.spending.findMany({
      include: {
        employee: {
          select: {
            name: true,
            departmentId: true,
            department: {
              select: {
                name: true
              }
            }
          },
        },
      },
    });
    const spending = obj
      .map((e) => {
        delete e.createdAt;
        delete e.updatedAt;
        e.nameEmployee = e.employee.name
        e.nameDepartement = e.employee.department.name
        delete e.employee
        return e;
      })
      .filter((e) => Boolean(e));
    res.status(200).json(spending);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};
