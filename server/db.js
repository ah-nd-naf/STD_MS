const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
const { PrismaClient } = require('@prisma/client');
require("dotenv").config();

// 1. Create a standard PG pool using your Neon URL
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// 2. Wrap it in the Prisma Adapter
const adapter = new PrismaPg(pool);

// 3. Pass the adapter to Prisma
const prisma = new PrismaClient({ adapter });

module.exports = prisma;
