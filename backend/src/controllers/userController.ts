import { Request, Response } from 'express'
import { Role } from '../generated/prisma/client.js';
import { prisma } from '../lib/prisma.js';

export async function getAllUsers(req: Request, res: Response) {
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
    });

    const serializedUsers = users.map(user => ({
      ...user,
      id: user.id.toString(),
    }));

    res.status(200).json(serializedUsers);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: 'Failed to fetch users' });
  }
}

export async function createRandomUser(req: Request, res: Response) {
  try {
    const random = Math.random().toString(36).slice(2, 10);

    const user = await prisma.user.create({
      data: {
        email: `dummy_${random}@example.com`,
        provider: 'google',
        providerUserId: `google-sub-${random}`,
        name: `Dummy User ${random}`,
        emailVerified: false,
        role: Role.USER,
        isActive: true,
      },
    });

    // ✅ Transform BigInt to string for JSON
    const userSerializable = {
      ...user,
      id: user.id.toString(),
    };

    res.status(201).json(userSerializable);
  } catch (err) {
    console.error('Error creating random user:', err);
    res.status(500).json({ message: 'Failed to create user' });
  }
}