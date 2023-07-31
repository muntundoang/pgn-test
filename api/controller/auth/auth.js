const { PrismaClient } = require("@prisma/client");
const { readPayloadToken } = require("../../middleware/jwt");
const prisma = new PrismaClient();

module.exports = async function (req, res) {
  const { access_token } = req.body;

  try {
    let user
    if (!access_token === false) {
      const { data } = readPayloadToken(access_token);
      user = await prisma.user.findUnique({
        where: {
          id: data,
        },
        include: {
          spending: true
        }
      });
      delete user.id;
      delete user.password;
      delete user.username;
      user.valid = true

      user.spending.sort(function(a,b){
        const sort = b.date - a.date
        return sort;
      });

    }
    res.status(200).json({user});
  } catch (error) {
    console.log("<===== error auth =====> \n", error);
    res.send(error);
  }
};
