import express from "express";
import { postRequest } from "../controllers/postRequest";
import { getUser } from "../controllers/getUser";
import { deleteUser } from "../controllers/deleteUser";

const routedr = express.Router();

/**
 * @swagger
 * /pushCommand:
 *   post:
 *     summary: Post User data
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               firstName:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               company:
 *                 type: string
 *                 description: "Optional. The company the user belongs to."
 *               message:
 *                 type: string
 *     responses:
 *       200:
 *         description: User data successfully saved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the operation was successful
 *                 message:
 *                   type: string
 *                   description: Message about the operation's result
 *       400:
 *         description: Missing required fields or invalid data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Description of the error
 *       500:
 *         description: Internal server error during the database operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message detailing the issue
 *
 */
routedr.route("/pushCommand").post(postRequest);

export default routedr;
