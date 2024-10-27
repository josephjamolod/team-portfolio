import Home from "@/components/main-components/home";
import Services from "@/components/main-components/services";

export default function Main() {
  return (
    <main className="h-auto ">
      <div className="  min-h-[800px] ">
        <Home />
        <Services />
      </div>
    </main>
  );
}
