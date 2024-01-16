const express = require('express');
const { requiresignin, isadmin } = require('../middleware/authMiddleware.js');
const { createproductController, getProductController, getSingleProductController, productPhotoController, deleteProductController, updateProductController, productFiltersController, productCountController, productListController, searchProductController, realtedProductController, productCategoryController, braintreeTokenController, brainTreePaymentController } = require('../controllers/productController.js');
const formidable = require("express-formidable")

const router = express.Router();

router.post("/create-product", requiresignin, isadmin,formidable() ,createproductController);

router.get("/get-product", getProductController);

router.get("/get-product/:slug", getSingleProductController);

router.get("/product-photo/:pid", productPhotoController);

router.delete("/delete-product/:pid", deleteProductController);

router.put(
    "/update-product/:pid",
    requiresignin,
    isadmin,
    formidable(),
    updateProductController
  );

  router.post("/product-filters", productFiltersController);

  router.get("/product-count", productCountController);

  router.get("/product-list/:page", productListController);

  router.get("/search/:keyword", searchProductController);

  router.get("/related-product/:pid/:cid", realtedProductController);

  router.get("/product-category/:slug", productCategoryController);

  router.get("/braintree/token", braintreeTokenController);

  router.post("/braintree/payment", requiresignin, brainTreePaymentController);







  



module.exports = router;