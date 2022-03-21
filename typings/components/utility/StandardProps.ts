import { ReactNode } from "react";

export default interface StandardProps {
  children?: Element[] | ReactNode | Element | ReactNode[];
}

export interface ClassNameExtension {
  className: string;
}
