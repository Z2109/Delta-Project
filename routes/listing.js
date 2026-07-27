const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../Models/listing.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");
const listingController = require('../controllers/listing.js')
const multer  = require('multer') // form k data ko parse krme k liye multer use krnge
const {storage} = require("../cloudConfig.js");// file jo hai wo cloudm jaa kr upload ho
const upload = multer({storage}); // aur multer upload file se data nikalega aur uploads naam ka file bana kr usme save kr dega pr ab direct storage m save krega



router.route("/")
.get(wrapAsync(listingController.index))
.post(isLoggedIn,upload.single('listing[image]'), validateListing, wrapAsync(listingController.createListing));

//New Route
router.get("/new", isLoggedIn, listingController.renderNewForm);

router.route("/:id")
.get( wrapAsync (listingController.showListing))
.put(isLoggedIn,isOwner,upload.single('listing[image]'),validateListing,wrapAsync(listingController.updateLiting))
.delete(isLoggedIn,isOwner, wrapAsync (listingController.deleteListing));

    //edit route

    router.get("/:id/edit",isLoggedIn,isOwner, wrapAsync(listingController.editListing));

module.exports = router;