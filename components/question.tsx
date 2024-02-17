import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

// Props interface
interface QuestionProps {
  sectionIndex: number;
  questionIndex: number;
}

const Question: React.FC<QuestionProps> = ({ questionIndex, sectionIndex }) => {
  const { register, control } = useFormContext(); // Access form methods
  const { fields: choiceFields, append: appendChoice } = useFieldArray({
    name: `sections[${sectionIndex}].questions[${questionIndex}].question_choices`,
    control,
  });

  return (
    <div>
      {/* Question text input */}
      <input
        {...register(`sections[${sectionIndex}].questions[${questionIndex}].question_text`)}
        placeholder="Question Text"
      />
      {/* Choices for the question */}
      {choiceFields.map((field, choiceIndex) => (
        <input
          key={field.id}
          {...register(`sections[${sectionIndex}].questions[${questionIndex}].question_choices[${choiceIndex}].choice_text`)}
          placeholder="Choice Text"
        />
      ))}
      <button type="button" onClick={() => appendChoice({ choice_text: "" })}>
        Add Choice
      </button>
    </div>
  );
};

export default Question;