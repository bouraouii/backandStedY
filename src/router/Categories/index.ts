import express from "express";

import { getRequestController } from "../../controllers/request";

const router = express.Router();

/**
 * @swagger
 * /Request:
 *   get:
 *     summary: return categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: ok
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *       404:
 *         description: not found
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *       500:
 *         description: error
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *
 */
router.route("/Request").get(getRequestController);



export default router;
