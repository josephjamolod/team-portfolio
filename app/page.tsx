import ChooseUs from "@/components/main-components/chooseUs";
import Home from "@/components/main-components/home";
import Services from "@/components/main-components/services";
import TeamMVC from "@/components/main-components/teamMVC";

export default function Main() {
  return (
    <main className="h-auto ">
      <div>
        <Home />
        <Services />
        <ChooseUs />
        <TeamMVC />
      </div>
    </main>
  );
}
