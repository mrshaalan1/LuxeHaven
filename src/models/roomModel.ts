import { IRoom } from "@/../libs/types";
import mongoose, { Document, Schema } from "mongoose";

type RoomDoc = Document & IRoom;

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

const Room =
  (mongoose.models.room as mongoose.Model<RoomDoc>) ||
  mongoose.model<RoomDoc>("room", RoomSchema);

export default Room;
