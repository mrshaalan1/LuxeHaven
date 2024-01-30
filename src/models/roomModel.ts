import mongoose, { Document, Schema } from "mongoose";


const RoomSchema = new mongoose.Schema({
  RoomId: {
    type: Schema.Types.ObjectId,
  },
  RoomType: {
    type: String,
  },
  RoomDescription: {
    type: String,
  },
  RoomPic: {
    type: String,
  },
  RoomNumber: {
    type: Intl,
  },
  RoomPrice: {
    type: Intl,
  },
});

const Room = mongoose.models.room || mongoose.model("room", RoomSchema);


export default Room;
