import Image from 'next/image';
import textToImage from "../../public/text-image.jpg"
import generationStory from "../../public/generateStory.jpg"
import summarizeContent from "../../public/sumarizeContent.jpg"
import talkWithAi from "../../public/talkWithAi.jpg"

const AboutUs = () => {
  return (
    <div className="shadow-black shadow-lg pl-6 mb-5 rounded-lg overflow-hidden">
      <p className='font-bold text-xl'>About Us</p>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-6">
        <div className="md:w-1/4 grid grid-cols-2 gap-4 py-10 h-full">
          <div className="rounded-full h-[140px] w-[140px] overflow-hidden shadow-lg">
            <Image src={textToImage} alt="Partner 1" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-full h-[140px] w-[140px] overflow-hidden shadow-lg">
            <Image src={generationStory} alt="Partner 2" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-full h-[140px] w-[140px] overflow-hidden shadow-lg">
            <Image src={summarizeContent} alt="Partner 3" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-full h-[140px] w-[140px] overflow-hidden shadow-lg">
            <Image src={talkWithAi} alt="Partner 4" className="w-full h-full object-cover" />
          </div>
        </div>

        
        <div className="md:w-3/4  md:text-left py-10 px-6 text-white">
          <div className=''>
            <h2 className="text-3xl font-bold">ZipGen</h2>
            <p className="mt-4 text-lg">
              ZipGen is an advanced AI-powered platform designed to revolutionize content creation. From generating high-quality stories, images, and videos to summarizing and transforming text, our AI tools empower users to create effortlessly. Whether you're a writer, marketer, or content creator, ZipGen helps bring your ideas to life with speed and accuracy.
            </p>
          </div>
          <div>
            <h3 className="mt-6 text-2xl font-semibold">Our Services</h3>
            <ul className="mt-4 text-lg list-disc list-inside">
              <li><span className="font-bold">Story Generation:</span> Instantly create engaging and unique stories with AI.</li>
              <li><span className="font-bold">Text-to-Image:</span> Convert words into stunning visuals using AI-powered image generation.</li>
              <li><span className="font-bold">Text-to-Video:</span> Transform text into dynamic videos with AI automation.</li>
              <li><span className="font-bold">Content Summarization:</span> Get concise and meaningful summaries of any text in seconds.</li>
            </ul>
            <button className="mt-6 px-5 py-2 bg-accentPurple text-white rounded-lg shadow-lg hover:bg-blue-700 transition">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


export default AboutUs