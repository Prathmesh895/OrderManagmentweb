import Image from "next/image";
import BG from '/public/lidye-1Shk_PkNkNw-unsplash.jpg';

export default function Home() {
  return (
    <>
      <div className="relative w-full h-screen">
        <Image src={BG} layout="fill" objectFit="cover" className="absolute -z-10"/>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center">
          <h1 className="text-white text-6xl font-extrabold mb-6 drop-shadow-lg">Welcome to Our Food Haven</h1>
          <p className="text-white text-2xl max-w-2xl text-center mb-4 drop-shadow-lg">
            Dive into a world of delicious recipes and mouth-watering meals.
          </p>
          <p className="text-white text-2xl max-w-2xl text-center mb-8 drop-shadow-lg">
            "Good food is the foundation of genuine happiness." – Auguste Escoffier
          </p>
          <p className="text-white text-xl max-w-2xl text-center drop-shadow-lg">
            Satisfy your cravings with our carefully curated dishes and enjoy a delightful culinary experience. From quick bites to gourmet meals, we bring the best of flavors to your table.
          </p>
        </div>
      </div>
    </>
  );
}
