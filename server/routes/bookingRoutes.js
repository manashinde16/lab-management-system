const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
  createBooking,
  getAllBookings,
  searchBooking,
} = require("../controllers/bookingController");

router.post("/", createBooking);
router.get("/", auth, getAllBookings);
router.get("/search", auth, searchBooking);

module.exports = router;
