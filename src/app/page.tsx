import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-16">
      {/* Hero Section */}
      <section className="bg-[#f5f3ea] grid grid-cols-1 md:grid-cols-2 gap-8 p-6 sm:p-10 md:p-12 rounded-2xl shadow-sm items-center">
        <div className="space-y-6">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 leading-tight">
            Morning Rituals Soap: Handcrafted for Our Community.
          </h1>
          <h3 className="text-lg md:text-xl mb-6 text-gray-700">
            Partner with a fellow local business to elevate your customer experience 
            with natural handmade coffee-powered quality. Exclusively serving DC, Maryland and Virginia.
          </h3>
          <Link 
            href="/contact" 
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow-md"
          >
            Connect with Our Local Team
          </Link>
        </div>
        <div className="flex justify-center md:justify-end">
          <div className="relative w-full max-w-[350px] aspect-square">
            <Image
              src="/IMG_5573.jpg"
              alt="Coffee shop interior"
              fill
              className="rounded-2xl object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 40vw"
              unoptimized
            />
          </div>
        </div>
      </section>

      {/* Value Section */}
      <section className="bg-[#eaf7f5] grid grid-cols-1 md:grid-cols-2 gap-8 p-6 sm:p-10 md:p-12 rounded-2xl shadow-sm items-center">
        <div className="order-2 md:order-1 flex justify-center md:justify-start">
          <div className="relative w-full max-w-[350px] aspect-square">
            <Image
              src="/IMG_7606.jpg"
              alt="Soap bar with natural elements"
              fill
              className="rounded-2xl object-cover"
              sizes="(max-width: 768px) 100vw, 40vw"
              unoptimized
            />
          </div>
        </div>
        <div className="order-1 md:order-2">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Quality That Supports Your Brand.</h2>
          <ul className="space-y-4 text-lg text-gray-700">
            <li>🌿 <strong>Natural & Nourishing:</strong> Natural Ingredients your customers trust. No harsh chemicals, just pure oils.</li>
            <li>☕ <strong>Coffee-Powered Quality:</strong> Features antioxidant-rich coffee infused oil for a unique retail benefit.</li>
            <li>🤝 <strong>Truly Local Partnership:</strong> Personal delivery and display support—we’re right here in your community.</li>
          </ul>
        </div>
      </section>

      {/* Profit & Service Section */}
      <section className="bg-[#f0eaff] grid grid-cols-1 md:grid-cols-2 gap-8 p-6 sm:p-10 md:p-12 rounded-2xl shadow-sm items-center">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Wholesale Success, Simplified.</h2>
          <ul className="list-disc list-inside space-y-3 text-lg text-gray-700">
            <li><strong>Competitive Pricing:</strong> Wholesale rates that respect your margins.</li>
            <li><strong>Excellent Mark-up:</strong> Potential for a 100% standard retail mark-up.</li>
            <li><strong>Dedicated Local Service:</strong> Seamless inventory and display support for your team.</li>
          </ul>
        </div>
        <div className="flex justify-center md:justify-end">
          <div className="relative w-full max-w-[300px] aspect-[3/4]">
            <Image
              src="/IMG_7598.jpg"
              alt="Soap display"
              fill
              className="rounded-2xl object-cover"
              sizes="(max-width: 768px) 100vw, 30vw"
              unoptimized
            />
          </div>
        </div>
      </section>

      {/* Final CTA Block */}
      <section className="bg-[#ffeae7] text-center p-12 rounded-2xl shadow-sm">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Ready to Start a Local Partnership?</h2>
        <p className="text-lg mb-6 text-gray-700">Fill out a quick form to request a personalized quote today.</p>
        <Link 
          href="/contact" 
          className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition inline-block shadow-md"
        >
          Request a Quote
        </Link>
      </section>
    </div>
  );
}