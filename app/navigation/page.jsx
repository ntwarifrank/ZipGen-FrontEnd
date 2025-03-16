import Link from 'next/link'

const Nav = () => {
  return (
    <div className='flex flex-row justify-between py-5 text-white'>
        <div className='font-extrabold text-3xl text-accentPurple'>
         ZipGen
        </div>
        <div className='flex flex-row gap-20'>
          <div className='flex flex-row gap-1 pt-5 font-bold'>
            {[{slash:"/", name:"Home"}, 
            {slash:"/generateVoice", name:"Text To Speech"}, {slash:"/talkWithAi", name:"Talk With Ai"}, {slash:"/generateVoice", name:"Text To Image"}, {slash:"/generateVoice", name:"Summarize Content"}].map((item, index) => (
                <div  key={index} className="relative group">
                    <Link href={item.slash} className="relative px-2 py-1 transition duration-300">
                        {item.name}
                    </Link>
                <span className="absolute top-7 left-0 bottom-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
            </div>  
            ))}
          </div>
          <div className='flex flex-row gap-6'>
            <Link href="#">
            <button className='px-2 py-1 bg-black rounded-md font-bold text-white'>Sign In</button>
            </Link>
            <Link href="#">
            <button className='px-2 py-1 rounded-md font-bold bg-accentPurple'>Sign Up</button>
            </Link>
          </div>
        </div>
    </div>
  )
}

export default Nav;