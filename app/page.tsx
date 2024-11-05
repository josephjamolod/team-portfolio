import ChooseUs from "@/components/main-components/chooseUs";
import About from "@/components/main-components/about";
import Services from "@/components/main-components/services";
import TeamMVC from "@/components/main-components/teamMVC";
import Footer from "@/components/main-components/footer";
import Test from "@/components/main-components/test";

export default function Main() {
  return (
    <main className="h-auto overflow-hidden">
      <div>
        <About />
        <Services />
        <ChooseUs />
        <TeamMVC />
        <Footer />
      </div>
    </main>
  );
}
