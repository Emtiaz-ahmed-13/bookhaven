const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const sampleBooks = [
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    description: "A story of the fabulously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan.",
    price: 12.99,
    category: "Fiction",
    photo: "https://picsum.photos/seed/gatsby/600/400",
    quantity: 50,
    inStock: true
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    description: "The story of young Scout Finch and her father Atticus in a racially divided Alabama town.",
    price: 14.99,
    category: "Fiction",
    photo: "https://picsum.photos/seed/mockingbird/600/400",
    quantity: 30,
    inStock: true
  },
  {
    title: "1984",
    author: "George Orwell",
    description: "A dystopian novel about totalitarianism and surveillance society.",
    price: 11.99,
    category: "Science",
    photo: "https://picsum.photos/seed/1984/600/400",
    quantity: 25,
    inStock: true
  },
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    description: "A romantic novel of manners that follows the emotional development of Elizabeth Bennet.",
    price: 13.99,
    category: "Fiction",
    photo: "https://picsum.photos/seed/pride/600/400",
    quantity: 40,
    inStock: true
  },
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    description: "A fantasy novel about Bilbo Baggins' journey with thirteen dwarves to reclaim their homeland.",
    price: 15.99,
    category: "Fiction",
    photo: "https://picsum.photos/seed/hobbit/600/400",
    quantity: 35,
    inStock: true
  },
  {
    title: "The Art of War",
    author: "Sun Tzu",
    description: "An ancient Chinese text on military strategy and tactics.",
    price: 9.99,
    category: "history",
    photo: "https://picsum.photos/seed/artofwar/600/400",
    quantity: 20,
    inStock: true
  },
  {
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    description: "A novel about teenage alienation and loss of innocence in post-World War II America.",
    price: 10.99,
    category: "Fiction",
    photo: "https://picsum.photos/seed/catcher/600/400",
    quantity: 28,
    inStock: true
  },
  {
    title: "Lord of the Flies",
    author: "William Golding",
    description: "A novel about the dark side of human nature, exploring the savagery that lies beneath civilization.",
    price: 11.99,
    category: "Fiction",
    photo: "https://picsum.photos/seed/lordflies/600/400",
    quantity: 22,
    inStock: true
  },
  {
    title: "Animal Farm",
    author: "George Orwell",
    description: "A satirical allegory of the Russian Revolution and the rise of Stalinism.",
    price: 9.99,
    category: "Fiction",
    photo: "https://picsum.photos/seed/animalfarm/600/400",
    quantity: 18,
    inStock: true
  },
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    description: "A novel about a young Andalusian shepherd who dreams of finding a worldly treasure.",
    price: 12.99,
    category: "Fiction",
    photo: "https://picsum.photos/seed/alchemist/600/400",
    quantity: 32,
    inStock: true
  },
  {
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    description: "A groundbreaking narrative of humanity's creation and evolution.",
    price: 16.99,
    category: "history",
    photo: "https://picsum.photos/seed/sapiens/600/400",
    quantity: 45,
    inStock: true
  },
  {
    title: "The Psychology of Money",
    author: "Morgan Housel",
    description: "Timeless lessons on wealth, greed, and happiness through 19 short stories.",
    price: 14.99,
    category: "psychology",
    photo: "https://picsum.photos/seed/psychology/600/400",
    quantity: 38,
    inStock: true
  }
];

const sampleBlogs = [
  {
    title: "Top 10 Fantasy Books to Read This Year",
    slug: "top-10-fantasy-books",
    excerpt: "From epic sagas to cozy adventures, discover this year's must-read fantasy titles.",
    content: "Curated list with highlights and why each title stands out.",
    coverImage: "https://picsum.photos/seed/blog1/1200/600",
    author: "BookHaven Editors",
  },
  {
    title: "How to Build a Daily Reading Habit",
    slug: "build-a-reading-habit",
    excerpt: "Practical tips to make reading a joyful part of your routine.",
    content: "Actionable strategies from setting goals to creating a reading environment.",
    coverImage: "https://picsum.photos/seed/blog2/1200/600",
    author: "BookHaven Editors",
  },
  {
    title: "Author Spotlight: Jane Austen",
    slug: "author-spotlight-jane-austen",
    excerpt: "A look at the wit and wisdom in Austen's classics.",
    content: "Context, themes, and recommendations to start exploring her work.",
    coverImage: "https://picsum.photos/seed/blog3/1200/600",
    author: "BookHaven Editors",
  },
];

async function seed() {
  try {
    console.log('Seeding database...');
    
    // Clear existing books
    await prisma.book.deleteMany();
    console.log('Cleared existing books');
    
    for (const book of sampleBooks) {
      await prisma.book.create({
        data: book
      });
      console.log(`Created book: ${book.title}`);
    }
    // Seed blogs
    await prisma.blog.deleteMany();
    console.log('Cleared existing blogs');
    for (const blog of sampleBlogs) {
      await prisma.blog.create({ data: blog });
      console.log(`Created blog: ${blog.title}`);
    }
    
    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
