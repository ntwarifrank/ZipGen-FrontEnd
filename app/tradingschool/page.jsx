import Image from "next/image"
import Link from "next/link"
import textToVideo from "../../public/text-video.png"
import textToImage from "../../public/text-image.jpg"
import generationStory from "../../public/generateStory.jpg"
import summarizeContent from "../../public/sumarizeContent.jpg"
import talkWithAi from "../../public/talkWithAi.jpg"

const Trading = () => {
    const TrendingService = [
        {
            image:generationStory,
            title:"Generate Story",
            content: "A leading institution in Rwanda offering high-quality education in sciences, business, and technology.",
            slash:"generateStory"
        },
        {
            image:textToImage,
            title:"Text To Image",
            content: "A leading institution in Rwanda offering high-quality education in sciences, business, and technology.",
            slash:"generateImage"
        },
        {
            image:textToVideo,
            title:"Text To Video",
            content: "A leading institution in Rwanda offering high-quality education in sciences, business, and technology.",
            slash:"generateVideo"
        },
        {
            image:talkWithAi,
            title:"Talk With Ai",
            content: "A leading institution in Rwanda offering high-quality education in sciences, business, and technology.",
            slash:"talkWithAi"
        },
        {
            image:summarizeContent,
            title:"Summarize Content",
            content: "A leading institution in Rwanda offering high-quality education in sciences, business, and technology.",
            slash:"generateContent"
        },
    ]
  return (
    <div className="pb-10">
        <div className='text-center font-bold text-xl py-4'>
            Trending Service       
        </div>
        <div className="w-full flex flex-row flex-wrap gap-8">
           {
               TrendingService.map((item, index) => (
                    <div key={index} className="md:w-[30%] h-[400px] sm:w-[80%] bg-backgroundDark shadow-black shadow-lg rounded-lg overflow-hidden">
                        <div className="h-[55%]">
                            <Image src={item.image} alt="image" className="w-full h-full object-cover" />
                        </div>
                        <div className="p-4 h-[45%]">
                            <h3 className="text-lg font-semibold text-gray-100">{item.title}</h3>
                            <p className="text-sm text-gray-400 mt-2">{item.content}</p>
                            <Link href={item.slash}>
                                <button className="mt-4 px-4 py-2 bg-accentPurple text-white text-sm font-medium rounded-lg transition">
                                    Explore
                                </button>
                            </Link>
                        </div>
                    </div>
               ))
           }
        </div>
    </div>
  )
}

export default Trading;