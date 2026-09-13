import prisma from '../db/prisma.js';
import locations from '../../data/stores.json' with {
  type: 'json',
};

async function seedLocations() {
  await prisma.location.createMany({
    data: locations.map((location) => ({
      name: location.name,
      address: location.address,
      city: location.city,
      phone: location.phone,
      rating: Number(location.rating),
    })),
  });

  console.log(`Seeded ${locations.length} locations`);
}

seedLocations()
  .catch((error) => {
    console.error('Failed to seed locations:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });