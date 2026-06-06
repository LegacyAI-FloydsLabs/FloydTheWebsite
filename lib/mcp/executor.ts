import type { SkillData } from './types';
import { prisma } from '@/lib/db';

interface ExecutionResult {
  success: boolean;
  output?: unknown;
  error?: string;
  duration_ms: number;
  tokens_used: number;
}

export async function executeSkill(
  skill: SkillData,
  input: Record<string, unknown>,
  apiKeyId: string
): Promise<ExecutionResult> {
  const startTime = Date.now();
  let tokensUsed = 0;

  try {
    // Build the system prompt from skill content and schema
    const systemPrompt = buildSystemPrompt(skill);
    const userPrompt = buildUserPrompt(skill, input);

    // Call the LLM API
    const response = await fetch('https://apps.abacus.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.ABACUSAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4.1-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        response_format: { type: 'json_object' },
        max_tokens: 4000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`LLM API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    tokensUsed = data.usage?.total_tokens || 0;

    if (!content) {
      throw new Error('No content in LLM response');
    }

    // Parse the JSON response
    let output: unknown;
    try {
      output = JSON.parse(content);
    } catch {
      // If not valid JSON, wrap it
      output = { result: content };
    }

    const duration_ms = Date.now() - startTime;

    // Log the call
    await logCall(apiKeyId, skill.skill_name, input, output, true, null, duration_ms, tokensUsed);

    return {
      success: true,
      output,
      duration_ms,
      tokens_used: tokensUsed,
    };
  } catch (error) {
    const duration_ms = Date.now() - startTime;
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';

    // Log the failed call
    await logCall(apiKeyId, skill.skill_name, input, null, false, errorMessage, duration_ms, tokensUsed);

    return {
      success: false,
      error: errorMessage,
      duration_ms,
      tokens_used: tokensUsed,
    };
  }
}

function buildSystemPrompt(skill: SkillData): string {
  const outputSchema = skill.schema.outputSchema;
  const schemaStr = outputSchema ? JSON.stringify(outputSchema, null, 2) : '';

  return `You are a specialized AI executing the "${skill.skill_name}" skill for the Floyd Labs MCP server.

## Skill Documentation
${skill.content}

## Output Requirements
You MUST respond with valid JSON that matches this schema:
${schemaStr || 'Return a JSON object with your response.'}

## Instructions
1. Analyze the user's input carefully
2. Execute the skill according to the documentation
3. Return ONLY valid JSON matching the output schema
4. Include a "success": true field in your response
5. Include metadata with timestamp and skill_version if specified in the schema

Respond with raw JSON only. Do not include code blocks, markdown, or any other formatting.`;
}

function buildUserPrompt(skill: SkillData, input: Record<string, unknown>): string {
  return `Execute the "${skill.skill_name}" skill with the following input:

${JSON.stringify(input, null, 2)}

Provide the result as valid JSON matching the output schema.`;
}

async function logCall(
  apiKeyId: string,
  skillName: string,
  input: unknown,
  output: unknown,
  success: boolean,
  error: string | null,
  durationMs: number,
  tokensUsed: number
): Promise<void> {
  try {
    await prisma.mcp_call_log.create({
      data: {
        api_key_id: apiKeyId,
        skill_name: skillName,
        input: input as object,
        output: output as object,
        success,
        error,
        duration_ms: durationMs,
        tokens_used: tokensUsed,
      },
    });
  } catch (e) {
    console.error('Error logging MCP call:', e);
  }
}
