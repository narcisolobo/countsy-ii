import { useContext } from "react";
import { DrawerContext } from "@/context/DrawerContext";

function useDrawer() {
  const context = useContext(DrawerContext);
  if (!context) {
    throw new Error("useDrawer must be used within a Drawer");
  }
  return context;
}

export { useDrawer };
