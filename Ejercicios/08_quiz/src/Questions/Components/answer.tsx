import { useRef } from "react"
import QUESTIONS from "../../Utils/questions"
interface IanswerProp {
    answers:string[],
    selectedAnswer:string,
    answerStatus:string,
    onSelect:(answer:string)=>void
}

export function Answer({answers,selectedAnswer,answerStatus,onSelect}:IanswerProp){

    const suffleQuestions=useRef<string[]>([])
    if (!suffleQuestions.current){
        suffleQuestions.current=[...QUESTIONS[actualAnswer].answers].sort(()=>Math.random()-0.5)
    }

    return (
        <ul id="answers" className="list-none m-0 p-0 flex flex-col items-center gap-2">
                    {answer.map((answer:string,index:number)=>(
                        <li key={index} className="w-9/10 mx-auto my-0 answer">
                            <button className="inline-block w-full font-[Roboto Condensed] text-[0.9rem] px-8 py-4 border-none rounded-3xl bg-[#6cb7f5] cursor:pointer transition-all duration-200 ease-in-out hover:bg-[#9d5af5] hover:text-white focus:bg-[#9d5af5] focus:text-white" onClick={()=>onSelect(answer)}>{answer}</button>
                        </li>
                    ))}
                </ul>
    )
}