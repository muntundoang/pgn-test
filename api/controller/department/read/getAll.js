const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = async function (req, res) {
  try {
    // const options = {
    //   include: {
    //     employee: {
    //       select: {
    //         name: true,
    //         id: true,
    //         role: true,
    //       },
    //     },
    //   },
    // }
    const obj = await prisma.department.findMany({
      include: {
        employee: {
          select: {
            id: true,
            name: true
          }
        }
      }
    });
    const departments = obj
      .map((e) => {
        if (e.name !== "Admin System") {
          delete e.createdAt;
          delete e.updatedAt;
          return e;
        }
      })
      .filter((e) => Boolean(e));
    res.status(200).json(departments);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};
