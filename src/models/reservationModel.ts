import mongoose, { Document } from "mongoose";
import { IReservation } from "@/../libs/types";

type ReservationDoc = Document & IReservation;

const ReservationSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  //TODO: change to required: true
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room",
    required: false,
  },
  menuItem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Menu",
    required: false,
  },
  CarId: {
    //TODO: change to object
    type: Intl,
    ref: "Car",
    required: false,
  },
  //TODO: change to required: true
  reservationFrom: {
    type: String,
    required: false,
  },
  //TODO: change to required: true
  reservationTo: {
    type: String,
    required: false,
  },
  CarRentalFrom: {
    type: String,
    required: false,
  },
  CarRentalTo: {
    type: String,
    required: false,
  },
  spa: {
    type: Boolean,
    default: false,
  },
  gym: {
    type: Boolean,
    default: false,
  },
});

const Reservation =
  mongoose.models.reservation ||
  mongoose.model<ReservationDoc>("reservation", ReservationSchema);

export default Reservation;
