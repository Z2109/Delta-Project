const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Review = require("../Models/reviews.js");
const Listing = require("../Models/listing.js");
const {validateReview, isLoggedIn, isReviewAuthor} = require("../middleware.js");
const reviewcontroller = require("../controllers/reviews.js");

//validate listing for joi


// Reviews
// Post Review Route
router.post("/",isLoggedIn, validateReview,wrapAsync (reviewcontroller.createReview));

//Delete review Route
router.delete("/:reviewId",isLoggedIn,isReviewAuthor, wrapAsync(reviewcontroller.deleteReview));

module.exports = router;