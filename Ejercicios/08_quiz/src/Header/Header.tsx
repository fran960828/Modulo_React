import logo from '../assets/quiz-logo.png'

export default function Header(){
    return (
        <header className='my-8 mx-0 flex flex-col items-center gap-4'>
            <img src={logo} alt="logo" className='w-12 h-12 filter drop-shadow-[0_0_4px_rgba(0,0,0,0.6)] ' />
            <h1 className='font-[Roboto Condensed] font-bold text-[2.5rem] tracking-[0.6rem] m-0 uppercase bg-linear-to-r from-[#e781fb] from-40% to-[#8e76fa] to-60% bg-clip-text text-transparent'>REACTQUIZ</h1>
        </header>     
    )
}