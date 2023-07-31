const { PrismaClient } = require("@prisma/client");
const { hashPassword } = require("../middleware/bcrypt");
const prisma = new PrismaClient();

async function main() {
  const createManyDepartment = await prisma.department.createMany({
    data: [
      { name: 'Information Technology' },
      { name: 'Human Capital' },
      { name: 'Finance & Accounting' },
      { name: 'Admin System' },
    ],
    skipDuplicates: true,
  })
  const dataEmployee = [
    { name: 'Budi', departmentId: 1, username: 'user1', password: 'user' },
    { name: 'Iwan', departmentId: 2, username: 'user2', password: 'user' },
    { name: 'Susi', departmentId: 3, username: 'user3', password: 'user' },
    { name: 'Amir', departmentId: 1, username: 'user4', password: 'user' },
    { name: 'Primus', departmentId: 1, username: 'user5', password: 'user' },
    { name: 'Tuti', departmentId: 2, username: 'user6', password: 'user' },
    { name: 'Sinta', departmentId: 2, username: 'user7', password: 'user' },
    { name: 'Santi', departmentId: 3, username: 'user8', password: 'user' },
    { name: 'Badu', departmentId: 3, username: 'user9', password: 'user' },
    { name: `Marfu'ah`, departmentId: 3, username: 'user10', password: 'user' },
    { name: `admin`, departmentId: 4, username: 'admin', password: 'adminpass', role: 'admin' },
  ]

  dataEmployee.forEach((e) => {
    const newPass = hashPassword(e.password)
    e.password = newPass
  })

  const createManyEmployee = await prisma.user.createMany({
    data: dataEmployee,
    skipDuplicates: true,
  })
  const dataSpending = [
    {employeeId: 1, date: '04-03-2020', value: 3000000},
    {employeeId: 4, date: '06-04-2020', value: 9826000},
    {employeeId: 5, date: '06-04-2020', value: 43879200},
    {employeeId: 4, date: '08-09-2020', value: 8983400},
    {employeeId: 6, date: '06-12-2020', value: 2425600},
    {employeeId: 7, date: '02-03-2021', value: 879200},
    {employeeId: 2, date: '02-03-2021', value: 68892340},
    {employeeId: 3, date: '01-05-2021', value: 3500000},
    {employeeId: 3, date: '03-06-2021', value: 567800},
    {employeeId: 4, date: '03-06-2021', value: 6786730},
    {employeeId: 8, date: '02-08-2021', value: 7893400},
    {employeeId: 3, date: '02-03-2021', value: 8200450},
    {employeeId: 1, date: '23-12-2021', value: 8982300},
    {employeeId: 2, date: '03-02-2022', value: 334890},
    {employeeId: 5, date: '06-04-2022', value: 2342460},
    {employeeId: 2, date: '11-04-2022', value: 78923400},
    {employeeId: 6, date: '05-11-2022', value: 2344600},
    {employeeId: 3, date: '05-11-2022', value: 32324900},
    {employeeId: 6, date: '03-01-2023', value: 5500100},
    {employeeId: 5, date: '27-03-2023', value: 2342350},
    {employeeId: 5, date: '02-04-2023', value: 2423400},
  ]
  dataSpending.forEach((e) => {
    const myDate = e.date.split("-")
    const newDate = new Date( myDate[2], myDate[1] - 1, myDate[0]);
    e.date = newDate
  })

  const createManySpending = await prisma.spending.createMany({
    data: dataSpending,
    skipDuplicates: true,
  })

  console.log("seed Department==> ", createManyDepartment);
  console.log("seed Employee==> ", createManyEmployee);
  console.log("seed Spending==> ", createManySpending);
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
