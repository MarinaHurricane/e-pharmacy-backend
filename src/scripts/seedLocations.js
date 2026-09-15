import prisma from '../db/prisma.js';
import locations from '../../data/stores.json' with {
  type: 'json',
};

async function seedLocations() {
  for (const location of locations) {
    await prisma.location.updateMany({
      where: {
        name: location.name,
      },
      data: {
        openTime: location.openTime,
        closeTime: location.closeTime,
      },
    });
  }

  console.log(`Updated ${locations.length} locations`);
}

seedLocations()
  .catch((error) => {
    console.error('Failed to update locations:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });