export function parseAIResponse(rawText: string) {
  const questions = [];

  // Split text into individual questions
  const questionBlocks = rawText
    .split(/\*\*\d+\.\s/)
    .filter((block) => block.trim());

  questionBlocks.forEach((block) => {
    // Extract question text
    const questionMatch = block.match(/([^\n]+)/);
    const questionText = questionMatch ? questionMatch[1].trim() : '';

    // Extract options
    const options = [];
    const optionMatches = block.match(/[A-D]\.\s[^\n]+/g);
    if (optionMatches) {
      optionMatches.forEach((option) => {
        const [letter, text] = option.split(/[.)]\s+/); // Split by '. ' to match the new format
        const trimmedText = text.trim().replace(/\*\*$/, ''); // Remove trailing ** if it exists
        const existingOption = options.find(
          (opt) => opt.letter === letter && opt.text === trimmedText,
        );

        if (!existingOption) {
          options.push({
            letter: letter.trim(),
            text: text.trim(),
          });
        }
      });
    }

    // Extract answer
    const answerMatch = block.match(/\*\*\s*([A-D])\.\s*[^\n]*/);

    const answer = answerMatch ? answerMatch[1] : '';

    // Extract explanation
    const explanationMatch = block.match(/\*\*Explanation:\*\*\s([^\n]+)/);
    const explanation = explanationMatch ? explanationMatch[1].trim() : '';

    questions.push({
      question: questionText,
      options,
      correctAnswer: answer,
      explanation,
    });
  });

  return questions;
}
