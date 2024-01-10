const { dateToString } = require("../../helpers/date");
const Event = require("../../models/event");
const User = require("../../models/user");

const { transformEvent } = require("./merge");



module.exports = {
    events: async () => {
      try {
        // const events = await Event.find().populate('creator').lean();
        // return events;
        const events = await Event.find();
        return events.map((event) => (transformEvent(event)));
      } catch (err) {
        throw err;
      }
    },
    createEvent: async (args,req) => {
      if(!req.isAuth){
        throw new Error("Unauthenticated");
      }
      try {
        const event = new Event({
          title: args.eventInput.title,
          description: args.eventInput.description,
          price: +args.eventInput.price,
          date: new Date(args.eventInput.date),
          creator: req.userId,
        });
  
        let createdEvent;
  
        const result = await event.save();
        createdEvent = transformEvent(result);
        const _user = await User.findById(req.userId);
  
        if (!_user) {
          throw new Error("User not found");
        }
        _user.createdEvents.push(event);
        await _user.save();
        return createdEvent;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
  };
