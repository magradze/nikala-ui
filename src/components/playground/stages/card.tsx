import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { ComponentSpec, StageProps } from "@/types";

export const config: ComponentSpec = {
  id: "card",
  name: "Card",
  props: [
    { name: "title", label: "Title", type: "text", default: "Create Project" },
    { name: "description", label: "Description", type: "text", default: "Deploy your new project in one click." },
    { name: "content", label: "Body Content", type: "text", default: "Nikala UI is built natively for SolidJS and Tailwind CSS v4." },
    { name: "buttonText", label: "Button Label", type: "text", default: "Deploy Now" },
    { name: "buttonVariant", label: "Button Variant", type: "select", options: ["default", "outline", "secondary", "destructive"], default: "default" },
  ],
};

export default function CardStage(props: StageProps) {
  return (
    <Card class="w-87.5">
      <CardHeader>
        <CardTitle>{props.values.title}</CardTitle>
        <CardDescription>{props.values.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p class="text-xs text-muted-foreground leading-relaxed">{props.values.content}</p>
      </CardContent>
      <CardFooter class="flex justify-between">
        <Button variant="outline" size="sm">Cancel</Button>
        <Button variant={props.values.buttonVariant} size="sm">
          {props.values.buttonText || "Deploy"}
        </Button>
      </CardFooter>
    </Card>
  );
}