import { createContext } from "react";

interface DrawerContextValue {
  isOpen: boolean;
  open: () => void;
}

const DrawerContext = createContext<DrawerContextValue | undefined>(undefined);

export { DrawerContext };
