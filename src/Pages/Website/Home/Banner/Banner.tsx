import { Parallax } from "react-parallax"
import { Button } from "@/components/ui/button"
import banner from "../../../../../public/assets/Banner Images/1003.jpg"

const Banner = () => {
  return (
    <Parallax
      className="h-[calc(40vh)] hidden lg:h-auto lg:block"
      blur={{ min: -15, max: 15 }}
      bgImage={banner}
      bgImageAlt="the banner"
      strength={-30}
    >
      <div className="relative flex items-center justify-center min-h-screen">
        {/* Overlay */}
        <div className="absolute inset-0 bg-teal-900/20" />

        {/* Content */}
        <div className="relative z-10 text-center text-white px-4 max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-5xl font-bold mb-4 animate__animated animate__fadeIn animate__delay-1.5s">
            আপনার স্বপ্নের
          </h1>
          <h2 className="text-2xl sm:text-4xl font-semibold mb-4 animate__animated animate__fadeIn animate__delay-1s">
            প্রজেক্ট
          </h2>
          <h3 className="text-xl sm:text-3xl font-light mb-8 animate__animated animate__fadeIn animate__delay-2s">
            শুধু ১ ক্লিকে খুঁজুন
          </h3>

          <Button className="bg-teal-500 hover:bg-teal-600 text-white shadow-lg">
            শুরু করুন
          </Button>
        </div>
      </div>
    </Parallax>
  )
}

export default Banner
