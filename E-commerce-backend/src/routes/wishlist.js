import { Router } from 'express';
import pool from '../db.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const { userId, productId } = req.query;

    if (userId && productId) {
      const result = await pool.query(
        'SELECT id, user_id as "userId", product_id as "productId" FROM wishlist WHERE user_id = $1 AND product_id = $2',
        [Number(userId), Number(productId)]
      );
      return res.json(result.rows.length > 0 ? result.rows[0] : null);
    }

    if (userId) {
      const result = await pool.query(
        'SELECT id, user_id as "userId", product_id as "productId" FROM wishlist WHERE user_id = $1 ORDER BY id',
        [Number(userId)]
      );
      return res.json(result.rows);
    }

    const result = await pool.query('SELECT id, user_id as "userId", product_id as "productId" FROM wishlist ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching wishlist:', err);
    res.status(500).json({ error: 'Failed to fetch wishlist' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { userId, productId } = req.body;
    const result = await pool.query(
      'INSERT INTO wishlist (user_id, product_id) VALUES ($1, $2) RETURNING id, user_id as "userId", product_id as "productId"',
      [Number(userId), Number(productId)]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error adding to wishlist:', err);
    res.status(500).json({ error: 'Failed to add to wishlist' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const result = await pool.query(
      'DELETE FROM wishlist WHERE id = $1 RETURNING id, user_id as "userId", product_id as "productId"',
      [Number(req.params.id)]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Wishlist item not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error removing from wishlist:', err);
    res.status(500).json({ error: 'Failed to remove from wishlist' });
  }
});

export default router;