import Nav from "./navigation/page";
import Homepage from "./homepage/page";
import storyGeneration from "../public/storygeneration.jpg"
import textToVideo from "../public/text-video.png"
import textToImage from "../public/text-image.jpg"
import Image from "next/image";
import Trading from "./tradingschool/page";
import AboutUs from "./aboutus/page";
import Footer from "./footer/page";

export default function Home() {
  const AIServiceBenefits = [
    {
      image: storyGeneration,
      title: "Effortless Story Generation",
      description: "Create compelling and unique stories instantly with AI-powered writing assistance.",
    },
    {
      image: textToImage,
      title: "Transform Text into Images",
      description: "Turn your words into stunning visuals with AI-generated images that bring ideas to life.",
    },
    {
      image: textToVideo,
      title: "Convert Text into Videos",
      description: "Generate professional-looking videos from text input with AI-driven automation.",
    }
  ];
  
  return (
   <div className="">
      <div className="">

          <div className="px-20">
              <Nav></Nav>
              <Homepage></Homepage>
          </div>
      </div>
      <div className="mx-auto w-[85%] py-5 flex flex-row flex-wrap gap-4 rounded-lg my-4">
            {AIServiceBenefits.map((item, index) => (
              <div key={index} className="md:w-[32%] sm:w-[80%] flex flex-row px-2 rounded-lg shadow-lg shadow-black">
                <div className="w-[30%]">  
                  <Image src={item.image} alt="image" className="w-full h-[70%] mt-4 rounded-lg object-cover" />
                </div>
                <div className="w-[70%] px-3 py-2">
                  <div className="font-bold text-gray-100">{item.title}</div>
                  <div className="text-gray-400 py-3">{item.description}</div>
                </div>
              </div>
            ))}
     </div>

      <div className="px-20">
        <Trading></Trading>
      </div>
      <div className="px-20">
        <AboutUs></AboutUs>
      </div>
      <div className="w-[90%] mx-auto">
        <Footer></Footer>
      </div>
   </div>
  );
}
