import mongoose, { Schema } from "mongoose";

const bookingSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  timeSlot: {
    type: String,
    required: true,
  },
  bedNumber: {
    type: Number,
    required: true,
    min: 1,
    max: 8,
  }
}, { timestamps: true });

const Booking = mongoose.models.Booking || mongoose.model("Booking", bookingSchema);

export default Booking; 