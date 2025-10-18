const Event = require("../models/eventModel");

//get all

exports.getEvent = async (req, res) => {
  try {
    const events = await Event.find()
      .populate("createdBy", "name email role") 
      .populate("participants", "name email"); 

    res.status(200).json({
      success: true,
      message: "Events retrieved successfully",
      data: events,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//get by id
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    res.status(200).json({
      success: true,
      message: "Successfully Retrived By id.",
      data: event,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

//Create event
exports.addEvent = async (req, res) => {
  try {
    const { title, description, date } = req.body;
    const created = req.user.id;
    const createEvent = await Event.create({
      title,
      description,
      date,
      createdBy: created,
    });
    res.status(201).json({
      success: true,
      message: "Successfully Created",
      data: createEvent,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

//for register
exports.registerEvent = async (req, res) => {
  try {
    //to find out which event should be in enrolled
    const eventId = req.params.id;
    //to find out which user is enroll in the event
    const userId = req.user.id;

    //to find the specific event
    const event = await Event.findOne({ eventId });

    //to already registered
    if (event.participants.includes(userId)) {
      return res.status(400).json({ message: "Already registered" });
    }

    //ot push the participants to the user is
    event.participants.push(userId);
    //it save the enrolled things
    await event.save();

    res.status(200).json({
      success: true,
      message: "Successfully registered for event",
      event,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error while registering" });
  }
};

//delete event
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: "Successfully deleted.",
      data: event,
    });
  } catch (error) {
    res.status(404).json({ message: "Id Not found" });
  }
};

//update event
exports.updateEvent = async (req,res) => {
    try {
        const event = await Event.findByIdAndUpdate(req.params.id,req.body,{
            new: true,
            runValidators: true
        })
        res.status(201).json({
            success: true,
            message: "Successfully Updated.",
            data: event
        })
    } catch (error) {
        res.status(404).json({ message: "Id Not found" });
    }
}
