import mongoose, { Document, Model, Schema } from "mongoose";

export interface ICalendarNote extends Document {
  userId: mongoose.Types.ObjectId;
  date: string;
  content: string;
}

const CalendarNoteSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: String, required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

// Compound indexing for upsert and fast querying per user/date
CalendarNoteSchema.index({ userId: 1, date: 1 }, { unique: true });

const CalendarNote: Model<ICalendarNote> =
  mongoose.models.CalendarNote || mongoose.model<ICalendarNote>("CalendarNote", CalendarNoteSchema);

export default CalendarNote;
