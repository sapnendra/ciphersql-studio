const OpenAI = require('openai');

let openai;

const getOpenAIClient = () => {
  if (!openai) {
    openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }
  return openai;
};

// @desc  Generate AI hint for a query
// @route POST /api/hint
const getHint = async (req, res, next) => {
  try {
    const { question, userQuery, schema } = req.body;

    if (!question || !schema) {
      return res.status(400).json({
        success: false,
        message: 'question and schema are required.',
      });
    }

    const prompt = `You are a SQL teaching assistant helping students learn SQL.

Provide a helpful, concise hint to guide the student toward the correct answer.

IMPORTANT RULES:
- DO NOT provide the full solution or the exact SQL query.
- DO NOT show exact column filters or exact WHERE clauses.
- DO explain the relevant SQL concept they need to use.
- Keep the hint to 2-4 sentences.
- Be encouraging and educational.

Assignment Question:
${question}

Student's Current Query:
${userQuery || 'No query written yet.'}

Database Schema:
${schema}

Provide a helpful hint:`;

    const client = getOpenAIClient();

    const response = await client.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content:
            'You are a helpful SQL tutor. You guide students without giving them direct answers.',
        },
        { role: 'user', content: prompt },
      ],
      max_tokens: 200,
      temperature: 0.7,
    });

    const hint = response.choices[0].message.content.trim();

    res.status(200).json({
      success: true,
      hint,
    });
  } catch (err) {
    // Handle OpenAI API errors gracefully
    if (err.status === 401 || err.status === 429) {
      const fallbackHints = [
        'Consider what columns you need and what condition would filter the rows correctly. Study the sample data to understand the table structure.',
        'Think about which SQL clause helps you filter rows and which helps you select specific columns. Look at the sample data for clues.',
        'Review the question carefully — what table do you need to query, and do you need all columns or just specific ones?',
        'Consider using a WHERE clause to filter rows. Look at the data types in the sample table to choose the right comparison.',
      ];
      const hint = fallbackHints[Math.floor(Math.random() * fallbackHints.length)];
      return res.status(200).json({ success: true, hint, fallback: true });
    }
    next(err);
  }
};

module.exports = { getHint };
