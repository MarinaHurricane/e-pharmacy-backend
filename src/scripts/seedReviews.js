// import prisma from '../db/prisma.js';
// import reviews from '../../data/product-reviews.json' with { type: "json" };


// async function seedReviews() {
//   await prisma.review.createMany({
//     data: reviews.map((review) => ({
//       productId: Number(review.productId),
//       avatar: review.avatar,
//       name: review.name,
//       text: review.text,
//       rating: Number(review.rating),
//       createdAt: new Date(review.createdAt),
//     })),
//   });

//   console.log(`Seeded ${reviews.length} reviews`);
// }

// seedReviews()
//   .catch((error) => {
//     console.error("Failed to seed reviews:", error);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });

import prisma from '../db/prisma.js';
import reviews from '../../data/reviews.json' with { type: 'json' };

async function seedReviews() {
  for (const review of reviews) {
    await prisma.review.upsert({
      where: {
        id: Number(review.id),
      },

      update: {
        productId: Number(review.productId),
        avatar: review.avatar,
        name: review.name,
        text: review.text,
        rating: Number(review.rating),
        createdAt: new Date(review.createdAt),
      },

      create: {
        id: Number(review.id),
        productId: Number(review.productId),
        avatar: review.avatar,
        name: review.name,
        text: review.text,
        rating: Number(review.rating),
        createdAt: new Date(review.createdAt),
      },
    });
  }

  console.log(`Seeded/updated ${reviews.length} reviews`);
}

seedReviews()
  .catch((error) => {
    console.error('Failed to seed reviews:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });