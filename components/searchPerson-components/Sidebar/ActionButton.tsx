import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Staff } from "../SearchPerson";
import { Textarea } from "@/components/ui/textarea";
import AnimatedModal from "./AnimatedModal";

interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
  staff: Staff;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  icon,
  label,
  staff,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full py-6" variant="default">
          {icon}
          <span>{label}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Get In Touch</DialogTitle>
          <DialogDescription>
            Send a message to{" "}
            <span className="text-primary">{staff.email}</span>
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              type="text"
              id="name"
              className="col-span-3 focus-visible:ring-[#9b61d1] focus-visible:ring-[2px]"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              type="email"
              id="email"
              className="col-span-3 focus-visible:ring-[#9b61d1] focus-visible:ring-[2px]"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="message" className="text-right">
              Message
            </Label>
            <Textarea typeof="text" id="message" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <AnimatedModal />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
