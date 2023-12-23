"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ratings_controllers_1 = require("../controllers/ratings.controllers");
const router = (0, express_1.default)();
router.get('/api/ratings', ratings_controllers_1.getRatings);
router.post('/api/ratings', ratings_controllers_1.createRating);
router.get('/api/ratings/:id', ratings_controllers_1.getRatingById);
router.patch('/api/ratings/:id', ratings_controllers_1.updateRating);
router.delete('/api/ratings/:id', ratings_controllers_1.deleteRating);
exports.default = router;
