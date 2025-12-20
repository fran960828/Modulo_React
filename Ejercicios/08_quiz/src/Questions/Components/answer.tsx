import { useMemo } from "react";

interface IanswerProp {
  answers: string[];
  selectedAnswer: string;
  answerStatus: string;
  onSelect: (answer: string) => void;
}

export function Answer({
  answers,
  selectedAnswer,
  answerStatus,
  onSelect,
}: IanswerProp) {
  const shuffledAnswers = useMemo(
    () => [...answers].sort(() => Math.random() - 0.5),
    [answers]
  );
  return (
    <ul
      id="answers"
      className="list-none m-0 p-0 flex flex-col items-center gap-2"
    >
      {shuffledAnswers.map((answer: string, index: number) => {
        let isSelectedAnswer = selectedAnswer === answer;
        let cssClasses =
          "inline-block w-full font-[Roboto Condensed] text-[0.9rem] px-8 py-4 border-none rounded-3xl bg-[#6cb7f5] cursor:pointer transition-all duration-200 ease-in-out hover:bg-[#9d5af5] hover:text-white focus:bg-[#9d5af5] focus:text-white";

        if (isSelectedAnswer && answerStatus !== "answered") {
          cssClasses = cssClasses + " selected";
        }
        if (
          (answerStatus === "correct" || answerStatus === "wrong") &&
          isSelectedAnswer
        ) {
          cssClasses = cssClasses + " " + answerStatus;
        }
        return (
          <li key={index} className="w-9/10 mx-auto my-0 answer">
            <button
              className={cssClasses}
              onClick={() => onSelect(answer)}
              disabled={answerStatus !== ""}
            >
              {answer}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
