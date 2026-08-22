import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../config/prisma';
import { AuthTokenPayload } from '../types';
import { calculateProfileScore } from '../services/profileScoreEngine';
import { learningPathService } from '../services/learningPathService';

const JWT_SECRET = process.env.JWT_SECRET || 'smartedu_sih2026_super_secret_jwt_key_983742';

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, college, course, branch, graduationYear, targetRole } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({ error: 'Name, email, and password are required.' });
      return;
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      res.status(400).json({ error: 'An account with this email already exists.' });
      return;
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
        role: 'STUDENT',
        profile: {
          create: {
            college: college || 'Galgotias University',
            course: course || 'B.Tech',
            branch: branch || 'Computer Science & Engineering',
            graduationYear: graduationYear ? parseInt(graduationYear) : 2026,
            targetRole: targetRole || 'Backend Developer',
            cgpa: 8.0,
            semester: 6,
            profileScore: 65,
            careerReadiness: 60,
          },
        },
      },
      include: { profile: true },
    });

    if (user.profile) {
      await learningPathService.getOrCreateLearningPath(user.profile.id, user.profile.targetRole);
    }

    const payload: AuthTokenPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      message: 'Registration successful!',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        profileId: user.profile?.id,
      },
    });
  } catch (error: any) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Failed to register user. ' + error.message });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ error: 'Email and password are required.' });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { email },
      include: { profile: true },
    });

    if (!user) {
      res.status(401).json({ error: 'Invalid email or password.' });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      res.status(401).json({ error: 'Invalid email or password.' });
      return;
    }

    const payload: AuthTokenPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });

    res.json({
      message: 'Login successful!',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        profileId: user.profile?.id,
      },
    });
  } catch (error: any) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Failed to login. ' + error.message });
  }
};

export const getMe = async (req: any, res: Response): Promise<void> => {
  try {
    const userId = req.user.userId;
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        profile: {
          include: {
            skills: { include: { skill: true } },
            projects: true,
            certifications: true,
            careerGoals: true,
          },
        },
      },
    });

    if (!user) {
      res.status(404).json({ error: 'User not found.' });
      return;
    }

    res.json({ user });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to fetch user. ' + error.message });
  }
};

export const demoLogin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { role = 'student' } = req.body; // 'student' or 'admin'
    const targetEmail = role === 'admin' ? 'admin@smartedu.ai' : 'aryan@smartedu.ai';

    const user = await prisma.user.findUnique({
      where: { email: targetEmail },
      include: { profile: true },
    });

    if (!user) {
      res.status(404).json({ error: `Demo account (${targetEmail}) not found. Please run seed script.` });
      return;
    }

    const payload: AuthTokenPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });

    res.json({
      message: `Logged in as ${user.name} (${user.role})`,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        profileId: user.profile?.id,
      },
    });
  } catch (error: any) {
    res.status(500).json({ error: 'Demo login failed. ' + error.message });
  }
};
