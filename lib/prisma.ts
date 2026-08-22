import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

function initializePrisma(): PrismaClient {
  // Support Vercel / AWS Lambda Serverless environments
  if (process.env.VERCEL) {
    const dbUrl = process.env.DATABASE_URL || 'file:./dev.db';

    // If using SQLite file path on Vercel Serverless, copy to writable /tmp
    if (dbUrl.startsWith('file:')) {
      const tmpDbPath = '/tmp/dev.db';

      if (!fs.existsSync(tmpDbPath)) {
        const potentialSources = [
          path.join(process.cwd(), 'prisma', 'dev.db'),
          path.join(process.cwd(), 'prisma', 'prisma', 'dev.db'),
          path.join(process.cwd(), 'dev.db'),
          path.resolve('./prisma/dev.db'),
        ];

        let copied = false;
        for (const src of potentialSources) {
          if (fs.existsSync(src)) {
            try {
              fs.copyFileSync(src, tmpDbPath);
              copied = true;
              console.log(`Successfully initialized serverless database from ${src} to /tmp/dev.db`);
              break;
            } catch (err) {
              console.error(`Failed copying sqlite db from ${src}:`, err);
            }
          }
        }

        if (!copied) {
          console.warn('Warning: No seed SQLite dev.db found in deployment.');
        }
      }

      process.env.DATABASE_URL = `file:${tmpDbPath}`;
    }
  }

  return new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  });
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? initializePrisma();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;

