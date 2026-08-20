import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '../config/database';
import { User, StudentProfile } from '../types';
import { AuthenticatedRequest } from '../middleware/auth';

const JWT_SECRET = process.env.JWT_SECRET || 'interndisha_super_secret_jwt_key_2025_empowerment';

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role = 'student' } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide name, email, and password.' });
    }

    const existing = await db.getUserByEmail(email);
    if (existing) {
      return res.status(400).json({ success: false, message: 'An account with this email already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = `user-${Date.now()}`;

    const newUser: User = {
      id: userId,
      name,
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      role: role === 'admin' ? 'admin' : 'student',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`,
      createdAt: new Date().toISOString()
    };

    await db.createUser(newUser);

    // Initialize blank student profile if student
    if (newUser.role === 'student') {
      const initialProfile: StudentProfile = {
        id: `profile-${Date.now()}`,
        userId: newUser.id,
        fullName: newUser.name,
        email: newUser.email,
        highestQualification: 'B.Tech',
        college: '',
        course: '',
        branch: '',
        currentYear: '1st Year',
        skills: [],
        interests: [],
        preferredRoles: [],
        preferredLocation: 'Any',
        workPreference: 'Any',
        onboardingCompleted: false,
        updatedAt: new Date().toISOString()
      };
      await db.upsertProfile(initialProfile);
    }

    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, role: newUser.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    const { password: _, ...safeUser } = newUser;
    return res.status(201).json({
      success: true,
      message: 'Account created successfully!',
      token,
      user: safeUser
    });
  } catch (error: any) {
    console.error('Registration error:', error);
    return res.status(500).json({ success: false, message: 'Server error during registration.' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password.' });
    }

    const user = await db.getUserByEmail(email);
    if (!user || !user.password) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    const profile = user.role === 'student' ? await db.getProfileByUserId(user.id) : null;
    const { password: _, ...safeUser } = user;

    return res.status(200).json({
      success: true,
      message: 'Login successful!',
      token,
      user: safeUser,
      profile
    });
  } catch (error: any) {
    console.error('Login error:', error);
    return res.status(500).json({ success: false, message: 'Server error during login.' });
  }
};

export const demoLogin = async (req: Request, res: Response) => {
  try {
    const { role = 'student' } = req.body;
    const targetEmail = role === 'admin' ? 'admin@interndisha.com' : 'student@interndisha.com';
    const user = await db.getUserByEmail(targetEmail);

    if (!user) {
      return res.status(404).json({ success: false, message: 'Demo account not found.' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    const profile = user.role === 'student' ? await db.getProfileByUserId(user.id) : null;
    const { password: _, ...safeUser } = user;

    return res.status(200).json({
      success: true,
      message: `Logged in as Demo ${role === 'admin' ? 'Admin' : 'Student'}!`,
      token,
      user: safeUser,
      profile
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: 'Demo login failed.' });
  }
};

export const getMe = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Not authenticated.' });
    }

    const user = await db.getUserById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    const profile = user.role === 'student' ? await db.getProfileByUserId(user.id) : null;
    const { password: _, ...safeUser } = user;

    return res.status(200).json({
      success: true,
      user: safeUser,
      profile
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: 'Server error fetching user.' });
  }
};
