import { IRoom } from "@/../libs/types";
import mongoose, { Document } from "mongoose";

type RoomDoc = Document & IRoom;

const RoomSchema = new mongoose.Schema({
  RoomId: {
    type: Intl,
  },
  RoomType: {
    type: String,
  },
  RoomDescription: {
    type: String,
  },
  RoomPicUrl: {
    type: String,
  },
  RoomNumber: {
    type: Intl,
  },
  RoomPrice: {
    type: Intl,
  },
  RoomRating: {
    type:Intl,
  },
});

const Room =
  (mongoose.models.room as mongoose.Model<RoomDoc>) ||
  mongoose.model<RoomDoc>("room", RoomSchema);

export default Room;
