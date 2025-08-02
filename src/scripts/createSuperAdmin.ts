import { prisma } from '../daos/PrismaClientInstance';
import bcrypt from 'bcrypt';

async function createSuperAdmin() {
    const existing = await prisma.user.findFirst({
        where: { email: 'shubham.patil@sagacitysoftware.co.in' },
    });

    if (existing) {
        console.log('Super admin already exists');
        return;
    }

    const hashedPassword = await bcrypt.hash('Shubham@123', 10);

    await prisma.user.create({
        data: {
            email: 'shubham.patil@sagacitysoftware.co.in',
            password: hashedPassword,
            firstName: 'Shubham',
            lastName: 'Patil',
            phoneNumber: '9878786565',
            role: 'SuperAdmin',
        },
    });

    console.log('Super admin created');
}

createSuperAdmin()
    .then(() => process.exit(0))
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });
