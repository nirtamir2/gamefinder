import { UpdateSearchParamsForm } from "@/components/UpdateSearchParamsForm";
import { Button } from "@/components/ui/Button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/Drawer";

export function DiscoverGamesDrawer() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>Discover Games</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="absolute right-4 top-4">
          <DrawerClose>
            <div className="text-3xl">✖︎</div>
          </DrawerClose>
        </div>
        <DrawerHeader>
          <DrawerTitle>Discover Games</DrawerTitle>
          <DrawerDescription>
            <div className="sr-only">Discover Games</div>
          </DrawerDescription>
        </DrawerHeader>
        <UpdateSearchParamsForm />
      </DrawerContent>
    </Drawer>
  );
}
