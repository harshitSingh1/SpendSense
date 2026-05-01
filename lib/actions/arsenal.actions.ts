import { Request } from 'express';
import dbConnect from '../mongodb';
import { requireUser } from '../auth-utils';
import ArsenalProgress from '../models/ArsenalProgress';
import Tool from '../models/Tool';
import { SEED_TOOLS } from '../data/seedTools';

export async function getUserProgress(req: Request) {
  const user = await requireUser(req);
  await dbConnect();

  let progress = await ArsenalProgress.findOne({ userId: (user as any).id }).lean();

  if (!progress) {
    const newProgress = await ArsenalProgress.create({
      userId: (user as any).id,
      financialIq: 0,
      completedModules: [],
      ratedTools: []
    });
    progress = newProgress.toObject();
  } else {
    // Repair incorrect 100-based financialIq
    let correctSum = 0;
    if (progress.moduleScores) {
      Object.values(progress.moduleScores).forEach((score: any) => correctSum += score * 10);
    }
    if (progress.ratedTools) {
      correctSum += progress.ratedTools.length * 10;
    }
    if (progress.financialIq !== correctSum) {
      await ArsenalProgress.updateOne({ _id: progress._id }, { $set: { financialIq: correctSum } });
      progress.financialIq = correctSum;
    }
    // ensure _id is stringified for leaning
    progress._id = progress._id.toString();
    progress.userId = progress.userId.toString();
  }

  return progress;
}

export async function completeModule(req: Request, slug: string, score: number) {
  const user = await requireUser(req);
  await dbConnect();

  let progress = await ArsenalProgress.findOne({ userId: (user as any).id });

  if (!progress) {
    progress = await ArsenalProgress.create({
      userId: (user as any).id,
      financialIq: score * 10,
      completedModules: [slug],
      moduleScores: { [slug]: score },
      ratedTools: []
    });
    return { success: true, progress, addedPoints: score * 10 };
  }

  const previousScore = progress.moduleScores?.get(slug) || 0;
  let addedPoints = 0;

  if (score > previousScore) {
    addedPoints = (score - previousScore) * 10;
    progress.financialIq += addedPoints;
    
    if (!progress.moduleScores) {
      progress.moduleScores = new Map();
    }
    progress.moduleScores.set(slug, score);
    
    if (!progress.completedModules.includes(slug)) {
      progress.completedModules.push(slug);
    }
    
    // Repair incorrect 100-based financialIq
    let correctSum = 0;
    if (progress.moduleScores) {
      Array.from(progress.moduleScores.values()).forEach((s: any) => correctSum += s * 10);
    }
    if (progress.ratedTools) {
      correctSum += progress.ratedTools.length * 10;
    }
    progress.financialIq = correctSum;

    await progress.save();
  } else if (!progress.moduleScores) {
    // Just in case it's an old record without moduleScores map
    progress.moduleScores = new Map();
    progress.moduleScores.set(slug, previousScore); // should be 0 if not set, but wait previousScore is 0. If score > 0, it hits the if.
    await progress.save();
  } else if (!progress.completedModules.includes(slug)) {
    // Mark as complete even if score is 0
    progress.completedModules.push(slug);
    await progress.save();
  }

  return { success: true, progress, addedPoints };
}

export async function getToolBySlug(req: Request, slug: string) {
  await dbConnect();
  
  const tool = await Tool.findOne({ slug }).lean();
  if (!tool) {
    throw new Error('Tool not found');
  }

  let userVote = null;
  try {
    const user = await requireUser(req);
    const userProgress = await ArsenalProgress.findOne({ userId: (user as any).id }).lean();
    if (userProgress && userProgress.ratedTools) {
      const voteObj = userProgress.ratedTools.find((rt: any) => rt.toolId === tool.slug);
      if (voteObj) {
        userVote = voteObj.vote;
      }
    }
  } catch (err) {
    // maybe no user logged in
  }

  return {
    id: tool.slug,
    name: tool.name,
    description: tool.tagline,
    category: tool.category,
    score: tool.upvotes - tool.downvotes,
    seoContent: tool.seoContent,
    userVote
  };
}
export async function getTools(req: Request) {
  await dbConnect();

  const toolCount = await Tool.countDocuments();
  if (toolCount < SEED_TOOLS.length) {
    await Tool.deleteMany({});
    const baseTools = SEED_TOOLS.map(t => ({
      ...t,
      upvotes: Math.floor(Math.random() * 500) + 100
    }));
    await Tool.insertMany(baseTools);
  }

  const tools = await Tool.find().lean();
  
  // also get the current user to merge their votes
  let userProgress = null;
  try {
    const user = await requireUser(req);
    userProgress = await ArsenalProgress.findOne({ userId: (user as any).id }).lean();
  } catch (err) {
    // maybe no user logged in
  }

  const result = tools.map((tool: any) => {
    let userVote = null;
    if (userProgress && userProgress.ratedTools) {
      const voteObj = userProgress.ratedTools.find((rt: any) => rt.toolId === tool.slug);
      if (voteObj) {
        userVote = voteObj.vote;
      }
    }
    return {
      id: tool.slug,
      name: tool.name,
      description: tool.tagline,
      category: tool.category,
      score: tool.upvotes - tool.downvotes,
      seoContent: tool.seoContent,
      affiliateUrl: tool.affiliateUrl,
      comparison: tool.comparison,
      userVote
    };
  });

  return result;
}

export async function rateTool(req: Request, toolSlug: string, voteType: 'up' | 'down') {
  const user = await requireUser(req);
  await dbConnect();

  let progress = await ArsenalProgress.findOne({ userId: (user as any).id });
  const tool = await Tool.findOne({ slug: toolSlug });

  if (!tool) {
    throw new Error('Tool not found');
  }

  if (!progress) {
    progress = await ArsenalProgress.create({
      userId: (user as any).id,
      financialIq: 10,
      completedModules: [],
      ratedTools: [{ toolId: toolSlug, vote: voteType }]
    });

    if (voteType === 'up') tool.upvotes += 1;
    if (voteType === 'down') tool.downvotes += 1;
    await tool.save();

    return { message: 'Tool rated. +10 IQ Points awarded!', pointsAwarded: 10, progress, tool };
  }

  if (!progress.ratedTools) {
    progress.ratedTools = [];
  }

  const existingVoteIndex = progress.ratedTools.findIndex((rt: any) => rt.toolId === toolSlug);

  if (existingVoteIndex === -1) {
    // Has not rated before
    progress.ratedTools.push({ toolId: toolSlug, vote: voteType });
    
    if (voteType === 'up') tool.upvotes += 1;
    if (voteType === 'down') tool.downvotes += 1;
    await tool.save();

    // Repair incorrect 100-based financialIq
    let correctSum = 0;
    if (progress.moduleScores) {
      Array.from(progress.moduleScores.values()).forEach((s: any) => correctSum += s * 10);
    }
    if (progress.ratedTools) {
      correctSum += progress.ratedTools.length * 10;
    }
    progress.financialIq = correctSum;
    await progress.save();
    return { message: 'Tool rated. +10 IQ Points awarded!', pointsAwarded: 10, progress, tool };
  } else {
    // Has rated before
    const previousVote = progress.ratedTools[existingVoteIndex].vote;
    if (previousVote !== voteType) {
      if (previousVote === 'up') tool.upvotes = Math.max(0, tool.upvotes - 1);
      if (previousVote === 'down') tool.downvotes = Math.max(0, tool.downvotes - 1);

      if (voteType === 'up') tool.upvotes += 1;
      if (voteType === 'down') tool.downvotes += 1;
      await tool.save();
    }

    progress.ratedTools[existingVoteIndex].vote = voteType;
    await progress.save();
    return { message: 'Vote updated.', pointsAwarded: 0, progress, tool };
  }
}


