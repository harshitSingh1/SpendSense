import mongoose from 'mongoose';

export interface IArsenalProgress {
  userId: mongoose.Types.ObjectId;
  financialIq: number;
  completedModules: string[];
  moduleScores: { [key: string]: number };
  ratedTools: { toolId: string; vote: 'up' | 'down' }[];
}

const ArsenalProgressSchema = new mongoose.Schema<IArsenalProgress>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    index: true,
  },
  financialIq: {
    type: Number,
    default: 100,
  },
  completedModules: [{
    type: String,
  }],
  moduleScores: {
    type: Map,
    of: Number,
    default: {},
  },
  ratedTools: [{
    toolId: { type: String, required: true },
    vote: { type: String, enum: ['up', 'down'], required: true }
  }]
});

export default mongoose.models.ArsenalProgress || mongoose.model<IArsenalProgress>('ArsenalProgress', ArsenalProgressSchema);
