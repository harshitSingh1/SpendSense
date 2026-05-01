import mongoose from 'mongoose';

export interface ITool {
  name: string;
  slug: string;
  tagline: string;
  category: string;
  upvotes: number;
  downvotes: number;
  seoContent?: string;
  affiliateUrl?: string;
  comparison?: {
    features: string[];
    main: { name: string; checks: boolean[] };
    competitors: { name: string; checks: boolean[] }[];
  };
}

const ToolSchema = new mongoose.Schema<ITool>({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  tagline: { type: String, required: true },
  category: { type: String, required: true },
  upvotes: { type: Number, default: 0 },
  downvotes: { type: Number, default: 0 },
  seoContent: { type: String },
  affiliateUrl: { type: String },
  comparison: { type: mongoose.Schema.Types.Mixed }
});

export default mongoose.models.Tool || mongoose.model<ITool>('Tool', ToolSchema);
