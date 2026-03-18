import prisma from './src/lib/prisma.js';

async function main() {
  try {
    const patients = await prisma.patient.findMany({
      take: 5,
      select: { id: true, fullName: true, patientCode: true }
    });
    console.log('--- PATIENTS IN DB ---');
    console.log(JSON.stringify(patients, null, 2));
  } catch (err) {
    console.error('Query error:', err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
