import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clear existing records to prevent unique constraint conflicts on re-seeding
  await prisma.book.deleteMany();
  await prisma.genre.deleteMany();

  // Create 4 Genres
  const fiction = await prisma.genre.create({ data: { name: 'Fiction' } });
  const sciFi = await prisma.genre.create({ data: { name: 'Science Fiction' } });
  const mystery = await prisma.genre.create({ data: { name: 'Mystery' } });
  const fantasy = await prisma.genre.create({ data: { name: 'Fantasy' } });

  // Create 15 Books distributed across the genres
  await prisma.book.createMany({
    data: [
      // Fiction (4 books)
      { title: 'To Kill a Mockingbird', author: 'Harper Lee', genreId: fiction.id, publishedYear: 1960 },
      { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genreId: fiction.id, publishedYear: 1925 },
      { title: '1984', author: 'George Orwell', genreId: fiction.id, publishedYear: 1949 },
      { title: 'Pride and Prejudice', author: 'Jane Austen', genreId: fiction.id, publishedYear: 1813 },

      // Science Fiction (4 books)
      { title: 'Dune', author: 'Frank Herbert', genreId: sciFi.id, publishedYear: 1965 },
      { title: 'Neuromancer', author: 'William Gibson', genreId: sciFi.id, publishedYear: 1984 },
      { title: 'Foundation', author: 'Isaac Asimov', genreId: sciFi.id, publishedYear: 1951 },
      { title: 'Snow Crash', author: 'Neal Stephenson', genreId: sciFi.id, publishedYear: 1992 },

      // Mystery (4 books)
      { title: 'The Hound of the Baskervilles', author: 'Arthur Conan Doyle', genreId: mystery.id, publishedYear: 1902 },
      { title: 'And Then There Were None', author: 'Agatha Christie', genreId: mystery.id, publishedYear: 1939 },
      { title: 'The Girl with the Dragon Tattoo', author: 'Stieg Larsson', genreId: mystery.id, publishedYear: 2005 },
      { title: 'Gone Girl', author: 'Gillian Flynn', genreId: mystery.id, publishedYear: 2012 },

      // Fantasy (3 books)
      { title: 'The Hobbit', author: 'J.R.R. Tolkien', genreId: fantasy.id, publishedYear: 1937 },
      { title: 'Harry Potter and the Sorcerer\'s Stone', author: 'J.K. Rowling', genreId: fantasy.id, publishedYear: 1997 },
      { title: 'The Way of Kings', author: 'Brandon Sanderson', genreId: fantasy.id, publishedYear: 2010 },
    ],
  });

  console.log('Seeding completed successfully with 4 genres and 15 books!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
