import { UpdateSearchParamsForm } from "@/components/UpdateSearchParamsForm";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/Drawer";

export function ModifySearchDrawer() {
  return (
    <Drawer>
      <DrawerTrigger>
        <div className="text-white underline">Modify search</div>
      </DrawerTrigger>
      <DrawerContent>
        <div className="absolute right-4 top-4">
          <DrawerClose>
            <div className="text-3xl">✖︎</div>
          </DrawerClose>
        </div>
        <DrawerHeader>
          <DrawerTitle>Modify Search</DrawerTitle>
          <DrawerDescription>
            <div className="sr-only">Modify search params</div>
          </DrawerDescription>
        </DrawerHeader>
        <UpdateSearchParamsForm />
      </DrawerContent>
    </Drawer>
  );
}
