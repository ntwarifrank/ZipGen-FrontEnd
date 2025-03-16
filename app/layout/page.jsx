"use client"
import Link from "next/link"

const Layout = ({children}) => {
  return (
    <div className="flex flex-row h-screen  bg-backgroundDark">
        <div className="w-[20%] ">
            <div className="font-bold text-2xl text-center py-2">
                <p className="text-accentPurple">ZipGen</p>
            </div>
            <div>
               <div className="mt-20">
                {
                    [{slash:"zipGen", name:"ZipGen"},{slash:"generateVoice", name:"Text To Speech"}, {slash:"textToVideo", name:"Text To Video"},{slash:"talkWithAi", name:"Talk With Ai"}, {slash:"samarize", name:"Sumarize Content"}, {slash:"generateStory", name:"Generate Story"}].map((item, index) => (
                        <div key={index} className="relative link pl-10 py-2 font-bold hover:text-gray-500">
                            <Link href={item.slash} className="relative">{item.name}</Link>
                            <div  className="absolute h-0.5 w-0 top-20 tarnsition-all bg-white link-hover:w-[50%] duration-0.6"></div>
                        </div>
                    ))
                }
               </div>
            </div>
        </div>
        <div className="w-[80%] min-h-screen bg-backgroundDark shadow-lg shadow-gray-300">
            {children}
        </div>
    </div>
  )
}

export default Layout;