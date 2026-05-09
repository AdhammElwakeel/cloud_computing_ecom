import pool from '../db.js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dbData = JSON.parse(readFileSync(join(__dirname, '../../db.json'), 'utf-8'));

async function seed() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS categories (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        prefix VARCHAR(255) NOT NULL,
        img TEXT NOT NULL
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        cat_prefix VARCHAR(255) NOT NULL,
        img TEXT NOT NULL,
        max_quantity INTEGER NOT NULL DEFAULT 0
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS wishlist (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL,
        product_id INTEGER NOT NULL
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255),
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
      )
    `);

    const catCount = await pool.query('SELECT COUNT(*) FROM categories');
    if (parseInt(catCount.rows[0].count) === 0) {
      for (const cat of dbData.categories) {
        await pool.query(
          'INSERT INTO categories (title, prefix, img) VALUES ($1, $2, $3)',
          [cat.title, cat.prefix, cat.img]
        );
      }
      console.log('Categories seeded');
    }

    const prodCount = await pool.query('SELECT COUNT(*) FROM products');
    if (parseInt(prodCount.rows[0].count) === 0) {
      for (const prod of dbData.products) {
        await pool.query(
          'INSERT INTO products (title, price, cat_prefix, img, max_quantity) VALUES ($1, $2, $3, $4, $5)',
          [prod.title, prod.price, prod.cat_prefix, prod.img, prod.max]
        );
      }
      console.log('Products seeded');
    }

    const wishCount = await pool.query('SELECT COUNT(*) FROM wishlist');
    if (parseInt(wishCount.rows[0].count) === 0) {
      for (const item of dbData.wishlist) {
        await pool.query(
          'INSERT INTO wishlist (user_id, product_id) VALUES ($1, $2)',
          [item.userId, item.productId]
        );
      }
      console.log('Wishlist seeded');
    }

    console.log('Seeding complete!');
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

seed();