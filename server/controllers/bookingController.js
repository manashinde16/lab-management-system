const db = require("../models/db");

exports.createBooking = (req, res) => {
  const { full_name, age, gender, phone, test_type, booking_date } = req.body;

  const sql =
    "INSERT INTO bookings (full_name, age, gender, phone, test_type, booking_date) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(
    sql,
    [full_name, age, gender, phone, test_type, booking_date],
    (err) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: "Booking created" });
    }
  );
};

exports.getAllBookings = (req, res) => {
  db.query(
    "SELECT * FROM bookings ORDER BY booking_date DESC",
    (err, results) => {
      if (err) return res.status(500).json({ error: err });
      res.json(results);
    }
  );
};

exports.searchBooking = (req, res) => {
  const { name } = req.query;
  db.query(
    "SELECT * FROM bookings WHERE full_name LIKE ?",
    [`%${name}%`],
    (err, results) => {
      if (err) return res.status(500).json({ error: err });
      res.json(results);
    }
  );
};
