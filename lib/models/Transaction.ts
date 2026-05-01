import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ITransaction extends Document {
  userId: mongoose.Types.ObjectId;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  description?: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

const TransactionSchema: Schema = new Schema(
  {
    userId: { 
      type: Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    amount: { 
      type: Number, 
      required: true 
    },
    type: { 
      type: String, 
      enum: ['income', 'expense'], 
      required: true 
    },
    category: { 
      type: String, 
      required: true 
    },
    description: { 
      type: String 
    },
    date: { 
      type: Date, 
      required: true, 
      default: Date.now 
    },
  },
  { timestamps: true }
);

// Compound index for fast dashboard queries (User-specific transactions sorted by date)
TransactionSchema.index({ userId: 1, date: -1 });

const Transaction: Model<ITransaction> = 
  mongoose.models.Transaction || mongoose.model<ITransaction>('Transaction', TransactionSchema);

export default Transaction;
