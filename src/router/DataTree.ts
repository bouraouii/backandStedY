import express from "express";
import { postTree } from "../controllers/postRequest";

const routedr = express.Router();

/**
 * @swagger
 * /postTree:
 *   post:
 *     summary: Post an object with dynamic keys and any type of value
 *     tags: [Tree]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             description: Object with dynamic properties of any type
 *             additionalProperties: 
 *               type: "object" # Accepting any type of value for each dynamic property
 *     responses:
 *       200:
 *         description: Operation successful
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
 *                 data:
 *                   type: object
 *                   additionalProperties:
 *                     type: "object" # This allows any kind of property inside the data object
 *                   description: Dynamically typed properties inside the object
 *       400:
 *         description: Invalid input or missing data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Description of the error
 *       500:
 *         description: Internal server error during the operation
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
routedr.route("/postTree").post(postTree);

export default routedr;
