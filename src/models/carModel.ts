import { ICar } from "@/../libs/types";
import mongoose, { Document } from "mongoose";

type CarDoc = Document & ICar;

const CarSchema = new mongoose.Schema({
  CarId: {
    type: Intl,
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
  CarRentalFrom: {
    type: String,
  },
  CarRentalTo: {
    type: String,
  },
});

const Car =
  (mongoose.models.car as mongoose.Model<CarDoc>) ||
  mongoose.model<CarDoc>("car", CarSchema);

export default Car;
