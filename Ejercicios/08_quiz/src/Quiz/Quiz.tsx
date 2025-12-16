import { useCallback,useRef,useState } from "react"
import QUESTIONS from "../Utils/questions"

export function Quiz(){
    const [selectedAnswer,setSelectedAnswer]=useState<(string|null)[]>([])
    const actualAnswer=useRef<number>(0)
    actualAnswer.current=selectedAnswer.length

    const handleSelectedAnswers=useCallback((answer:string|null)=>{
        setSelectedAnswer(
            (prevAnswers:(string|null)[])=>{
               return [...prevAnswers,answer]
            }
        )
    },[])
    const handleSkipAnswer=useCallback(()=>{
        handleSelectedAnswers(null)
    },[handleSelectedAnswers])


    if (selectedAnswer.length===QUESTIONS.length){
        return(
            <div id="summary">
                <h2>QUIZ RESULTS</h2>
                <p>Summary</p>
            </div>
        )
    }

    return (
        <div>
            <h2 className="text-white z-10">Question</h2>
            <ul>
                {QUESTIONS[actualAnswer.current].answers.map((answer:string)=>(
                    <li key={QUESTIONS[actualAnswer.current].id}>
                        <button className="text-white z-10" onClick={()=>handleSelectedAnswers(answer)}>{answer}</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}