import { ICar } from "@/../libs/types";
import mongoose, { Document, Schema } from "mongoose";

type CarDoc = Document & ICar;

const CarSchema = new mongoose.Schema({
  CarId: {
    type: Schema.Types.ObjectId,
  },
  CarName: {
    type: String,
  },
  CarDescription: {
    type: String,
  },
  CarPicUrl: {
    type: String,
  },
  CarBrand: {
    type: String,
  },
  CarPrice: {
    type: Intl,
  },
});

const Car =
  (mongoose.models.car as mongoose.Model<CarDoc>) ||
  mongoose.model<CarDoc>("car", CarSchema);

export default Car;
