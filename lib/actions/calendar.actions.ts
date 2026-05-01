import { Request } from 'express';
import { requireUser } from '../auth-utils';
import dbConnect from '../mongodb';
import CalendarNote from '../models/CalendarNote';
import mongoose from 'mongoose';

// Fallback mock since this is Express/Vite, but user requested revalidatePath
const revalidatePath = (path: string) => {
  console.log(`[Cache] Revalidated path: ${path}`);
};

/**
 * Server Action equivalent for saving a calendar note.
 * In a traditional Next.js App Router, this would accept (date, content) directly.
 * For this Express architecture, we pass the Request object to extract auth.
 */
export async function saveCalendarNote(req: Request, date: string, content: string) {
  const user = await requireUser(req);
  await dbConnect();

  const userId = new mongoose.Types.ObjectId((user as any).id);

  // Strict String Formatting: ensure the date remains exactly the YYYY-MM-DD string 
  // without any Date conversion.
  const strictDateStr = date.split('T')[0];

  // Upserts the note (updates if it exists, creates if it doesn't)
  const note = await CalendarNote.findOneAndUpdate(
    { userId, date: strictDateStr },
    { content },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  // Triggering the requested revalidation
  revalidatePath('/dashboard');
  
  return note;
}
