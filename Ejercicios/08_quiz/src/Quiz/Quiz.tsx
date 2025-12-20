import { useCallback, useState, useRef } from "react";
import QUESTIONS from "../Utils/questions";
import { Questions } from "../Questions/Questions";
import Summary from "./components/Summary";

export function Quiz() {
  const [selectedAnswer, setSelectedAnswer] = useState<(string | null)[]>([]);
  const actualAnswer = useRef<number>(0);
  actualAnswer.current = selectedAnswer.length;

  const handleSelectedAnswers = useCallback((answer: string | null) => {
    setSelectedAnswer((prevAnswers: (string | null)[]) => {
      return [...prevAnswers, answer];
    });
  }, []);
  const handleSkipAnswer = useCallback(() => {
    handleSelectedAnswers(null);
  }, [handleSelectedAnswers]);

  if (selectedAnswer.length === QUESTIONS.length) {
    return <Summary userAnswers={selectedAnswer} />;
  }

  return (
    <div
      id="quiz"
      className="max-w-200 m-auto p-8 bg-linear-180-[#3e2a60]-[#321061] rounded-lg shadow-1px_1px_8px_4px_rgba(12_5_32_0.6) text-center"
    >
      <Questions
        key={actualAnswer.current}
        actualAnswer={actualAnswer.current}
        onSelect={handleSelectedAnswers}
        onSkip={handleSkipAnswer}
      />
    </div>
  );
}
