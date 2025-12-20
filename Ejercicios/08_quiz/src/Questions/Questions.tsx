import { useState } from "react";
import QUESTIONS from "../Utils/questions";
import { type Iquestion, type Ianswer } from "../Core/Core";
import { ProgressBar } from "./Components/progressBar";
import { Answer } from "./Components/answer";

export function Questions({ actualAnswer, onSelect, onSkip }: Iquestion) {
  const [answer, setAnswer] = useState<Ianswer>({
    isSelected: "",
    isCorrect: null,
  });

  let time = 15000;

  if (answer.isSelected) {
    time = 1000;
  }
  if (answer.isCorrect !== null) {
    time = 2000;
  }

  function handleResultAnswer(answer: string) {
    setAnswer({
      isSelected: answer,
      isCorrect: null,
    });
    setTimeout(() => {
      setAnswer({
        isSelected: answer,
        isCorrect: QUESTIONS[actualAnswer].answers[0] === answer,
      });
      setTimeout(() => {
        onSelect(answer);
      }, 2000);
    }, 1000);
  }
  let status = "";
  if (answer.isSelected && answer.isCorrect !== null) {
    status = answer.isCorrect ? "correct" : "wrong";
  } else if (answer.isSelected) {
    status = "answered";
  }

  return (
    <div id="question">
      <ProgressBar
        key={time}
        timeOut={time}
        onSkip={answer.isSelected === "" ? onSkip : () => {}}
        mode={status}
      />
      <h2 className="font-[Roboto] text-[1.5rem] font-normal mt-2 mb-10 text-[#c1b2dd]">
        {QUESTIONS[actualAnswer].text}
      </h2>
      <Answer
        answers={QUESTIONS[actualAnswer].answers}
        selectedAnswer={answer.isSelected}
        answerStatus={status}
        onSelect={handleResultAnswer}
      />
    </div>
  );
}
