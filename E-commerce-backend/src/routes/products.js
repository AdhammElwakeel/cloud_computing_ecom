import { Router } from 'express';
import pool from '../db.js';

const router = Router();

const PRODUCTS_SELECT = 'SELECT id, title, price::float as price, cat_prefix as "catPrefix", img, max_quantity as max FROM products';

router.get('/', async (req, res) => {
  try {
    const { cat_prefix, id } = req.query;

    if (id) {
      const ids = Array.isArray(id) ? id : [id];
      const placeholders = ids.map((_, i) => `$${i + 1}`).join(', ');
      const result = await pool.query(
        `${PRODUCTS_SELECT} WHERE id IN (${placeholders})`,
        ids.map(Number)
      );
      return res.json(result.rows);
    }

    if (cat_prefix) {
      const result = await pool.query(
        `${PRODUCTS_SELECT} WHERE cat_prefix = $1 ORDER BY id`,
        [cat_prefix]
      );
      return res.json(result.rows);
    }

    const result = await pool.query(`${PRODUCTS_SELECT} ORDER BY id`);
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

export default router;