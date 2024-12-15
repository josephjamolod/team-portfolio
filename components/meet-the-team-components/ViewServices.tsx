import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { TabSwitch } from "./TabSwitch";
import { Staff } from "../searchPerson-components/SearchPerson";

export function ViewServices({ staff }: { staff: Staff }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost"> View Services →</Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto space-y-2">
        <SheetHeader>
          <SheetTitle>Services</SheetTitle>
        </SheetHeader>
        <TabSwitch services={staff.services} tools={staff.tools} />
        <SheetFooter>
          <SheetClose asChild></SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
