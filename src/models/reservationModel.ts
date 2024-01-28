import mongoose, { Document, Schema } from "mongoose";


const ReservationSchema = new mongoose.Schema({
  customer: { type: Schema.Types.ObjectId, ref: "User", require: true },
  RoomId: { type: Schema.Types.ObjectId, ref: "Room", require: true },
  reservationFrom: { type: Date, require: true },
  reservationTo: { type: Date, require: true },
  spa: Boolean,
  gym: Boolean,
  carReservation: {
    CarId: {type: Schema.Types.ObjectId, ref: "Car" },
    CarRentalFrom: Date,
    CarRentalTo: Date,
  },
});

const Reservation =
  mongoose.models.reservation ||
  mongoose.model("reservation", ReservationSchema);

export default Reservation;
