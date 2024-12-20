// Execute: npx ts-node util/seed.ts

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const main = async () => {
    await prisma.book.deleteMany();
    await prisma.user.deleteMany();
    await prisma.leesStatus.deleteMany();
    await prisma.review.deleteMany();

    // BOOKS

    const book1 = await prisma.book.create({
        data: {
            title: 'To Kill a Mockingbird',
            author: 'Harper Lee',
            length: 281,
            synopsis: 'A novel about the serious issues of rape and racial inequality.',
        },
    });
    
    const book2 = await prisma.book.create({
        data: {
            title: '1984',
            author: 'George Orwell',
            length: 328,
            synopsis: 'A dystopian social science fiction novel and cautionary tale about the dangers of totalitarianism.',
        },
    });
    
    const book3 = await prisma.book.create({
        data: {
            title: 'Pride and Prejudice',
            author: 'Jane Austen',
            length: 279,
            synopsis: 'A romantic novel that charts the emotional development of the protagonist Elizabeth Bennet.',
        },
    });
    
    const book4 = await prisma.book.create({
        data: {
            title: 'The Great Gatsby',
            author: 'F. Scott Fitzgerald',
            length: 180,
            synopsis: 'A novel about the American dream and the roaring twenties.',
        },
    });

    // ADMIN

    const admin = await prisma.user.create({
        data: {
            username: 'admin',
            password: await bcrypt.hash('admin123', 12),
            role: 'admin',
            books: {
                connect: [
                    { id: book1.id },
                    { id: book2.id },
                    { id: book3.id },
                    { id: book4.id },
                ],
            },
        },
    });

    // USERS

    const lecturerJP = await prisma.user.create({
        data: {
            username: 'johanp',
            password: await bcrypt.hash('johanp123', 12),
            role: 'lecturer',
            books: {
                connect: [
                    { id: book1.id },
                    { id: book2.id },
                ],
            },
        },
    });

    const lecturerES = await prisma.user.create({
        data: {
            username: 'elkes',
            password: await bcrypt.hash('elkes123', 12),
            role: 'lecturer',
            books: {
                connect: [
                    { id: book3.id },
                    { id: book4.id },
                ],
            },
        },
    });

    const lecturerGJ = await prisma.user.create({
        data: {
            username: 'greetjej',
            password: await bcrypt.hash('greetjej123', 12),
            role: 'lecturer',
            books: {
                connect: [
                    { id: book3.id },
                    { id: book4.id },
                ],
            },
        },
    });

    const student1 = await prisma.user.create({
        data: {
            username: 'peterp',
            password: await bcrypt.hash('peterp123', 12),
            role: 'student',
            books: {
                connect: [
                    { id: book2.id },
                ],
            },
        },
    });

    const student2 = await prisma.user.create({
        data: {
            username: 'bruceb',
            password: await bcrypt.hash('bruceb123', 12),
            role: 'student',
            books: {
                connect: [
                    { id: book1.id },
                ],
            }
        }
    });

    const student3 = await prisma.user.create({
        data: {
            username: 'sallys',
            password: await bcrypt.hash('sallysb123', 12),
            role: 'student',
            books: {
                connect: [
                    { id: book4.id },
                ],
            },
        },
    });

    const student4 = await prisma.user.create({
        data: {
            username: 'michaelm',
            password: await bcrypt.hash('michaelm123', 12),
            role: 'student',
            books: {
                connect: [
                    { id: book3.id },
                ],
            },
        },
    });

    const student5 = await prisma.user.create({
        data: {
            username: 'lindas',
            password: await bcrypt.hash('lindas123', 12),
            role: 'student',
            books: {
                connect: [
                    { id: book1.id },
                    { id: book2.id },
                    { id: book3.id },
                    { id: book4.id },
                ],
            },
        },
    });

    const users = [student1, student2, student3, student4, student5];
    const books = [book1, book2, book3, book4];

    for (const user of users) {
        for (const book of books) {
            await prisma.leesStatus.create({
                data: {
                    status: 'reading',
                    progress: Math.floor(Math.random() * 100),
                    user: { connect: { id: user.id } },
                    book: { connect: { id: book.id } },
                },
            });

            await prisma.review.create({
                data: {
                    rating: Math.floor(Math.random() * 5) + 1,
                    comment: 'Great book!',
                    user: { connect: { id: user.id } },
                    book: { connect: { id: book.id } },
                },
            });
        }
    }
};

(async () => {
    try {
        await main();
        await prisma.$disconnect();
    } catch (error) {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    }
})();
