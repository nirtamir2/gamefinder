"use client";

import * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";
import type { OmitClassName } from "@/components/ui/OmitClassName";

const Drawer = ({
  shouldScaleBackground = true,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) => (
  <DrawerPrimitive.Root
    shouldScaleBackground={shouldScaleBackground}
    {...props}
  />
);
Drawer.displayName = "Drawer";

const DrawerTrigger = DrawerPrimitive.Trigger;

const DrawerPortal = DrawerPrimitive.Portal;

const DrawerClose = DrawerPrimitive.Close;

const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Overlay>,
  OmitClassName<React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>>
>((props, ref) => (
  <DrawerPrimitive.Overlay
    ref={ref}
    className="fixed inset-0 z-50 bg-overlay/80"
    {...props}
  />
));
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName;

const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>,
  OmitClassName<React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>>
>(({ children, ...props }, ref) => (
  <DrawerPortal>
    <DrawerOverlay />
    <DrawerPrimitive.Content
      ref={ref}
      className="fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-3xl border border-transparent bg-background"
      {...props}
    >
      <div className="mx-auto mt-4 h-2 w-[100px] rounded-full bg-transparent" />
      {children}
    </DrawerPrimitive.Content>
  </DrawerPortal>
));
DrawerContent.displayName = "DrawerContent";

const DrawerHeader = (
  props: OmitClassName<React.HTMLAttributes<HTMLDivElement>>,
) => <div className="grid gap-1.5 p-4 text-center sm:text-left" {...props} />;
DrawerHeader.displayName = "DrawerHeader";

const DrawerFooter = (
  props: OmitClassName<React.HTMLAttributes<HTMLDivElement>>,
) => <div className="mt-auto flex flex-col gap-2 p-4" {...props} />;
DrawerFooter.displayName = "DrawerFooter";

const DrawerTitle = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Title>,
  OmitClassName<React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>>
>((props, ref) => (
  <DrawerPrimitive.Title
    ref={ref}
    className="text-center font-semibold leading-none tracking-tight text-white"
    {...props}
  />
));
DrawerTitle.displayName = DrawerPrimitive.Title.displayName;

const DrawerDescription = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Description>,
  OmitClassName<
    React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
  >
>((props, ref) => (
  <DrawerPrimitive.Description
    ref={ref}
    className="text-sm text-secondary-button-text"
    {...props}
  />
));
DrawerDescription.displayName = DrawerPrimitive.Description.displayName;

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
};
