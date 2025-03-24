export default function HeroSection() {
  return (
    <section
      className="h-96 bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: "url('/images/hero-bg.jpg')",
      }}
    >
      <div className="text-center text-white">
        <h1 className="text-5xl font-bold mb-4">Welcome to GymFit</h1>
        <p className="text-xl mb-6">Transform your body, transform your life.</p>
        <a
          href="/register"
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
        >
          Join Now
        </a>
      </div>
    </section>
  );
}