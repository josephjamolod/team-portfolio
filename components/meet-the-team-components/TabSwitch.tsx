import { Services } from "@/app/(public)/meet-the-team/[id]/page";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "../ui/badge";
import Image from "next/image";

interface TabSwitchPropType {
  services: Services[];
  tools: string[];
}

export function TabSwitch({ services, tools }: TabSwitchPropType) {
  return (
    <Tabs defaultValue="account" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Services</TabsTrigger>
        <TabsTrigger value="password">Tools</TabsTrigger>
      </TabsList>
      <TabsContent value="account" className="space-y-2">
        {services.map((service, index) => {
          return (
            <Card key={index}>
              <CardHeader>
                <Badge
                  variant={"outline"}
                  className={`w-fit ${
                    service.isActive && "bg-green-200"
                  } text-black`}
                >
                  {service.isActive ? "active" : "inactive"}
                </Badge>
                <CardTitle className="capitalize">{service.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <CardDescription>{service.description}</CardDescription>
              </CardContent>
              <CardFooter>
                <span className="text-muted-foreground text-sm px-2">
                  Per Hour:
                </span>
                <span className="font-semibold">${service.perHour}</span>
              </CardFooter>
            </Card>
          );
        })}
      </TabsContent>
      <TabsContent className="space-y-2" value="password">
        {tools.map((tool, index) => {
          return (
            <Card
              className="flex items-center justify-center h-full"
              key={index}
            >
              <CardContent className="space-y-2">
                <div className="grid grid-cols-1 place-items-center ">
                  <Image
                    className=" object-cover"
                    height={200}
                    width={200}
                    src={tool}
                    alt="tool"
                  />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </TabsContent>
    </Tabs>
  );
}
