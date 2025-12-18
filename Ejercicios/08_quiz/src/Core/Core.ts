

export interface Iquestions {
    id:string,
    text:string,
    answers:string[]
}
export interface Iquestion {
    actualAnswer:number,
    onSelect:(answer:(string|null))=>void,
    onSkip:()=>void
}
export interface Ianswer {
    isSelected:string,
    isCorrect:boolean|null
}
export interface Iprogress {
    timeOut:number,
    onSkip:()=>void,
    mode:string
}