const express = require("express");
const router = express.Router();
const newCollectionsController = require("../controllers/newCollectionsController");
const auth = require("../middleware/auth");
const role = require("../middleware/role");

/**
 * @swagger
 * tags:
 *   name: NewCollections
 *   description: New collections management
 */

/**
 * @swagger
 * /newcollections:
 *   get:
 *     summary: Get all new collections
 *     tags: [NewCollections]
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: The list of the new collections
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/NewCollection'
 */
router.get("/", auth, newCollectionsController.getAllNewCollections);

/**
 * @swagger
 * /newcollections/{id}:
 *   get:
 *     summary: Get a new collection by ID
 *     tags: [NewCollections]
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The new collection ID
 *     responses:
 *       200:
 *         description: The new collection description by ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NewCollection'
 *       404:
 *         description: New collection not found
 */
router.get("/:id", auth, newCollectionsController.getNewCollectionById);

/**
 * @swagger
 * /newcollections:
 *   post:
 *     summary: Create a new collection
 *     tags: [NewCollections]
 *     security:
 *       - ApiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewCollection'
 *     responses:
 *       200:
 *         description: The new collection was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NewCollection'
 *       500:
 *         description: Some server error
 */
router.post("/", auth, role(["admin"]), newCollectionsController.createNewCollection);

/**
 * @swagger
 * /newcollections/{id}:
 *   put:
 *     summary: Update a new collection
 *     tags: [NewCollections]
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The new collection ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewCollection'
 *     responses:
 *       200:
 *         description: The new collection was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NewCollection'
 *       404:
 *         description: New collection not found
 *       500:
 *         description: Some server error
 */
router.put("/:id", auth, role(["admin"]), newCollectionsController.updateNewCollection);

/**
 * @swagger
 * /newcollections/{id}:
 *   delete:
 *     summary: Remove a new collection
 *     tags: [NewCollections]
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The new collection ID
 *     responses:
 *       200:
 *         description: The new collection was deleted
 *       404:
 *         description: The new collection was not found
 */
router.delete("/:id", auth, role(["admin"]), newCollectionsController.deleteNewCollection);

module.exports = router;
