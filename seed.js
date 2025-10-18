// seed.js
require('dotenv').config(); 
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/authModel");
const Event = require("./models/eventModel");

const uri = process.env.URI; 

mongoose.connect(uri)
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(err));

async function seed() {
  try {

    await User.deleteMany();
    await Event.deleteMany();

    const hashedPassword = await bcrypt.hash("password123", 10);

    const admin = await User.create({
      name: "Admin User",
      email: "admin@example.com",
      password: hashedPassword,
      role: "admin",
    });

    const user1 = await User.create({
      name: "John Doe",
      email: "john@example.com",
      password: hashedPassword,
      role: "user",
    });

    const user2 = await User.create({
      name: "Jane Smith",
      email: "jane@example.com",
      password: hashedPassword,
      role: "user",
    });

    // Create events
    const event1 = await Event.create({
      title: "Tech Talk",
      description: "Learn about the latest in AI and web dev",
      date: new Date("2025-11-01T10:00:00Z"),
      createdBy: admin._id,
      participants: [user1._id, user2._id],
    });

    const event2 = await Event.create({
      title: "Music Workshop",
      description: "Guitar and piano masterclass",
      date: new Date("2025-11-05T15:00:00Z"),
      createdBy: admin._id,
      participants: [user2._id],
    });

    console.log("Database seeded successfully!");
    mongoose.disconnect();
  } catch (error) {
    console.log(error);
  }
}

seed();
