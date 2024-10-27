// types/react-vertical-timeline-component.d.ts
declare module "react-vertical-timeline-component" {
  import { ReactNode } from "react";

  interface VerticalTimelineElementProps {
    children?: ReactNode;
    date?: ReactNode; // Allow any ReactNode for date
    icon?: ReactNode; // Ensure icon can accept a ReactNode as well
    contentStyle?: React.CSSProperties;
    contentArrowStyle?: React.CSSProperties;
    iconStyle?: React.CSSProperties;
  }

  interface VerticalTimelineProps {
    children?: ReactNode;
  }

  export const VerticalTimeline: React.ComponentType<VerticalTimelineProps>;
  export const VerticalTimelineElement: React.ComponentType<VerticalTimelineElementProps>;
}
