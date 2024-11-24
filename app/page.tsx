import ChooseUs from "@/components/main-components/chooseUs";
import About from "@/components/main-components/about";
import Services from "@/components/main-components/services";
import TeamMVC from "@/components/main-components/teamMVC";
import Footer from "@/components/main-components/footer";
import { AutoCarousel } from "@/components/main-components/auto-carousel";

export default function Main() {
  return (
    <main className="h-auto overflow-hidden">
      <div>
        <About />
        <AutoCarousel />
        <Services />
        <ChooseUs />
        <TeamMVC />
        <Footer />
      </div>
    </main>
  );
}
