import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Title */}
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-900">
        About Morning Rituals Soap
      </h1>

      {/* Intro Section */}
      <div className="mb-12 overflow-hidden">
        <div className="float-left mr-6 mb-4">
          <Image
            src="/IMG_5577.jpg"
            alt="Soap mandala"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            width={300}
            height={300}
            className="rounded-full shadow-md border-4 border-blue-50"
            unoptimized
          />
         
        </div>
        <p className="text-xl text-gray-700 leading-relaxed">
          <span className="font-bold text-blue-600">Morning Rituals Soap</span> is 
          more than just a bar of soap—it's a daily ritual that invigorates your senses 
          and starts your day on the right note. Our handmade soaps are not only gentle 
          on your skin but also offer a luxurious and indulgent cleansing experience. 
          Infused with coffee oils, our soaps can enhance blood circulation and provide 
          antioxidant protection—leaving your skin feeling rejuvenated and refreshed. 
          Crafted with care, each bar is made with natural ingredients and a touch of love.
        </p>
      </div>

      <p className="text-2xl font-bold text-center mb-10 text-gray-800">
        Wake up your skin with Morning Rituals Soap!
      </p>

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        {[
          "/IMG_5585.jpg",
          "/IMG_5573.jpg",
          "/IMG_5588.jpg",
          "/IMG_5591.jpg",
        ].map((src, index) => (
          <div key={index} className="relative aspect-square overflow-hidden rounded-xl shadow-sm hover:shadow-lg transition-shadow cursor-pointer">
            <Image
              src={src}
              alt={`Morning Rituals Soap variety ${index + 1}`}
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                unoptimized
            />
          </div>
        ))}
      </div>

      {/* Partnership / Community Section */}
      <div className="text-center border-t border-b py-12 bg-gray-50 rounded-2xl">
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
          Our coffee soap has been a hit at the{" "}
          <a
            href="https://www.charlestoncoffeeexchange.com/"
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 hover:underline font-semibold"
          >
            Charleston Coffee Exchange
          </a>{" "}
          since 2019. We love using their brew in our coffee soap bars.
        </p>
        <div className="relative w-full max-w-[300px] aspect-[3/1] mx-auto">
          <Image
            src="/cce.img.png"
            alt="Charleston Coffee Exchange"
            fill
            className="object-contain rounded-lg"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            unoptimized          />
        </div>
      </div>
    </div>
  );
}