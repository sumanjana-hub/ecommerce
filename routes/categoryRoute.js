const express = require('express');
const { requiresignin, isadmin } = require('../middleware/authMiddleware.js');
const { createCategoryController, updateCategoryController, categoryController, singlecategoryController, deleteCategoryController } = require('../controllers/categoryController.js');


const router = express.Router();

router.post("/create-category", requiresignin, isadmin, createCategoryController);

router.put("/update-category/:id", requiresignin, isadmin, updateCategoryController);

router.get("/Get-category", requiresignin, isadmin, categoryController);

router.get("/single-category/:slug", requiresignin, isadmin, singlecategoryController);

router.delete( "/delete-category/:id", requiresignin, isadmin, deleteCategoryController );
  

module.exports = router;