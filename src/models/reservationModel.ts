import mongoose, { Document } from "mongoose";
import { IReservation } from "@/../libs/types";

type ReservationDoc = Document & IReservation;

const ReservationSchema = new mongoose.Schema({
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Room',
      required: true,
    },
    menuItem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Menu',
      required: false ,
    },
    car: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Car',
      required: false ,
    },
    reservationFrom: {
      type: String,
      required: true,
    },
    reservationTo: {
      type: String,
      required: true,
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
   

const Reservation = mongoose.models.reservation || mongoose.model<ReservationDoc>("reservation", ReservationSchema);

export default Reservation;
