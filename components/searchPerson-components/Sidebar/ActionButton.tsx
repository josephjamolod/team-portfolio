import emailjs from "@emailjs/browser";
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
import { Staff } from "../SearchPerson";
import { Textarea } from "@/components/ui/textarea";
import AnimatedModal from "./AnimatedModal";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { sendMailSchema } from "@/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

interface ActionButtonProps {
  children: React.ReactNode;
  staff: Staff;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  staff,
  children,
}) => {
  const form = useForm<z.infer<typeof sendMailSchema>>({
    resolver: zodResolver(sendMailSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof sendMailSchema>) => {
    // console.log(data);
    try {
      emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID as string,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID as string,
        {
          from_name: data.email,
          to_name: staff.name,
          from_email: data.email,
          to_email: staff.email,
          message: data.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );
      toast.success("Message Successfuly Sent");
      form.reset();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] dark:bg-secondary">
        <DialogHeader>
          <DialogTitle>Get In Touch</DialogTitle>
          <DialogDescription className="pt-2">
            Send a message to{" "}
            <span className="text-primary ">{staff.email}</span>
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4 pb-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel className="text-primary text-xs px-2">
                        Name
                      </FormLabel>
                      <FormMessage className="text-xs text-red-500" />
                    </div>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        placeholder="Please Enter Your Name"
                        className="text-xs h-10 bg-[#efecff] dark:bg-black focus:outline-none focus:border-[#6652ee]"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel className="text-primary text-xs px-2">
                        Email Address
                      </FormLabel>
                      <FormMessage className="text-xs text-red-500" />
                    </div>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="Please Enter Your Email Address"
                        className="text-xs h-10 bg-[#efecff] dark:bg-black focus:outline-none focus:border-[#6652ee]"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel className="text-primary text-xs px-2">
                        Message
                      </FormLabel>
                      <FormMessage className="text-xs text-red-500" />
                    </div>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Message Here . . ."
                        className="text-xs h-32 bg-[#efecff] dark:bg-black focus:outline-none focus:border-[#6652ee] resize-none "
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <AnimatedModal />
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
