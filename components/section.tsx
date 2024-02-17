import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import Question from './question';

// Props interface
interface SectionProps {
  sectionIndex: number;
}

const Section: React.FC<SectionProps> = ({ sectionIndex }) => {
  const { control } = useFormContext();
  const { fields: questionFields, append: appendQuestion } = useFieldArray({
    name: `sections[${sectionIndex}].questions`,
    control,
  });

  return (
    <div>
      {/* Iterate over questions */}
      {questionFields.map((field, questionIndex) => (
        <Question key={field.id} questionIndex={questionIndex} sectionIndex={sectionIndex} />
      ))}
      <button type="button" onClick={() => appendQuestion({ question_text: "", question_choices: [{ choice_text: "" }] })}>
        Add Question
      </button>
    </div>
  );
};

export default Section;