import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export interface AuthTokenPayload {
  userId: string;
  email: string;
  role: string;
  name: string;
}

const JWT_SECRET = process.env.JWT_SECRET || 'smartedu_sih2026_super_secret_jwt_key_983742';

export function signToken(payload: AuthTokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): AuthTokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as AuthTokenPayload;
  } catch (error) {
    return null;
  }
}

export function getUserFromRequest(request: NextRequest): AuthTokenPayload | null {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }
    const token = authHeader.split(' ')[1];
    return verifyToken(token);
  } catch {
    return null;
  }
}
