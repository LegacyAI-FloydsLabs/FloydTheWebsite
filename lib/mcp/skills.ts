import { prisma } from '@/lib/db';
import type { SkillData, MCPTool } from './types';

export async function getAllSkills(): Promise<SkillData[]> {
  try {
    const skills = await prisma.skills_cache.findMany({
      orderBy: { skill_name: 'asc' },
    });
    return skills.map(s => ({
      skill_name: s.skill_name,
      content: s.content,
      schema: s.schema as SkillData['schema'],
      metadata: s.metadata as SkillData['metadata'],
    }));
  } catch (error) {
    console.error('Error fetching skills:', error);
    return [];
  }
}

export async function getSkillByName(name: string): Promise<SkillData | null> {
  try {
    const skill = await prisma.skills_cache.findUnique({
      where: { skill_name: name },
    });
    if (!skill) return null;
    return {
      skill_name: skill.skill_name,
      content: skill.content,
      schema: skill.schema as SkillData['schema'],
      metadata: skill.metadata as SkillData['metadata'],
    };
  } catch (error) {
    console.error('Error fetching skill:', error);
    return null;
  }
}

export function skillToMCPTool(skill: SkillData): MCPTool {
  // Extract description from content (first paragraph after # heading)
  const lines = skill.content.split('\n');
  let description = '';
  let foundPurpose = false;
  
  for (const line of lines) {
    if (line.startsWith('## Purpose')) {
      foundPurpose = true;
      continue;
    }
    if (foundPurpose && line.trim() && !line.startsWith('#')) {
      description = line.trim();
      break;
    }
  }
  
  if (!description) {
    // Fallback to quality score line
    const qualityMatch = skill.content.match(/> \*\*Quality Score.*?\*\* — (.+)/);
    description = qualityMatch ? qualityMatch[1] : `Execute the ${skill.skill_name} skill`;
  }

  return {
    name: skill.skill_name,
    description: description.substring(0, 500),
    inputSchema: skill.schema.inputSchema || {
      type: 'object',
      properties: {
        input: { type: 'string', description: 'Input for the skill' },
      },
    },
  };
}

export async function getSkillsAsMCPTools(): Promise<MCPTool[]> {
  const skills = await getAllSkills();
  return skills.map(skillToMCPTool);
}
