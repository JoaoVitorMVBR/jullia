import PhotoHeartHero from "@/components/HeroSection";
import MetaphorSection from "@/components/MetaphorSection";
import FloatingIcons from "@/components/FloatingIcons";
const Index = () => {
  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden">
      <FloatingIcons />
      <PhotoHeartHero />
      <MetaphorSection />

      {/* Closing section */}
      <section className="py-24 md:py-32 text-center px-6">
        <p className="font-serif text-gold/60 text-lg md:text-xl italic">
          Feliz dia das mulheres, Amor.
        </p>
        <p className="text-sand/40 text-xs mt-4 font-sans tracking-widest">
          Com carinho ♥
        </p>
      </section>
    </div>
  );
};

export default Index;
