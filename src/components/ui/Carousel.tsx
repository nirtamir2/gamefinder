"use client";

import * as React from "react";
import clsx from "clsx";
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react";
import type { OmitClassName } from "@/components/ui/OmitClassName";

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

type CarouselProps = {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: "horizontal" | "vertical";
  setApi?: (api: CarouselApi) => void;
};

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
} & CarouselProps;

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }

  return context;
}

const Carousel = React.forwardRef<
  HTMLDivElement,
  OmitClassName<React.HTMLAttributes<HTMLDivElement> & CarouselProps>
>(
  (
    { orientation = "horizontal", opts, setApi, plugins, children, ...props },
    ref,
  ) => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y",
      },
      plugins,
    );
    const [canScrollPrev, setCanScrollPrev] = React.useState(false);
    const [canScrollNext, setCanScrollNext] = React.useState(false);

    const carouselContainerRef = React.useRef<HTMLDivElement | null>(null);

    const onSelect = React.useCallback((api: CarouselApi) => {
      if (!api) {
        return;
      }

      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    }, []);

    const scrollPrev = React.useCallback(() => {
      api?.scrollPrev();
    }, [api]);

    const scrollNext = React.useCallback(() => {
      api?.scrollNext();
    }, [api]);

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowDown" || event.key === "ArrowRight") {
          if (canScrollNext) {
            event.preventDefault();
            scrollNext();
          }
        } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
          if (canScrollPrev) {
            event.preventDefault();
            scrollPrev();
          }
        }
      },
      [scrollPrev, scrollNext, canScrollPrev, canScrollNext],
    );

    React.useEffect(() => {
      if (!api || !setApi) {
        return;
      }

      setApi(api);
    }, [api, setApi]);

    React.useEffect(() => {
      if (!api) {
        return;
      }

      onSelect(api);
      api.on("reInit", onSelect);
      api.on("select", onSelect);

      return () => {
        api?.off("select", onSelect);
      };
    }, [api, onSelect]);

    // Automatically set focus to the carousel container when it mounts
    React.useEffect(() => {
      if (carouselContainerRef.current) {
        carouselContainerRef.current.focus();
      }
    }, []);

    // Memoize the context value to prevent unnecessary re-renders
    const contextValue = React.useMemo(() => ({
      carouselRef,
      api,
      opts,
      orientation: orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
      scrollPrev,
      scrollNext,
      canScrollPrev,
      canScrollNext,
    }), [carouselRef, api, opts, orientation, scrollPrev, scrollNext, canScrollPrev, canScrollNext]);

    return (
      <CarouselContext.Provider value={contextValue}>
        <div
          ref={(node) => {
            carouselContainerRef.current = node;
            if (typeof ref === "function") {
              ref(node);
            } else if (ref) {
              (ref as React.MutableRefObject<HTMLDivElement | null>).current =
                node;
            }
          }}
          className="relative focus:outline-none" // Tailwind class to remove outline
          role="region"
          aria-roledescription="carousel"
          tabIndex={0} // Necessary for focus, but might need to suppress warning if it's still an issue
          onKeyDown={handleKeyDown}
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    );
  },
);
Carousel.displayName = "Carousel";

const CarouselContent = React.forwardRef<
  HTMLDivElement,
  OmitClassName<React.HTMLAttributes<HTMLDivElement>>
>((props, ref) => {
  const { carouselRef, orientation } = useCarousel();

  return (
    <div ref={carouselRef} className="overflow-hidden">
      <div
        ref={ref}
        className={clsx("flex h-dvh", orientation === "vertical" && "flex-col")}
        {...props}
      />
    </div>
  );
});
CarouselContent.displayName = "CarouselContent";

const CarouselItem = React.forwardRef<
  HTMLDivElement,
  OmitClassName<React.HTMLAttributes<HTMLDivElement>>
>((props, ref) => {
  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className="flex min-w-0 shrink-0 grow-0 basis-full items-center"
      {...props}
    />
  );
});
CarouselItem.displayName = "CarouselItem";

const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  OmitClassName<React.ComponentProps<"button">>
>((props, ref) => {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel();

  return (
    <button
      ref={ref}
      type="button"
      className={clsx(
        "size-12 rounded-full bg-button-background text-white transition-colors hover:bg-button-background-brighter disabled:pointer-events-none disabled:opacity-30",
        orientation === "vertical" && "rotate-90",
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      ←<span className="sr-only">Previous slide</span>
    </button>
  );
});
CarouselPrevious.displayName = "CarouselPrevious";

const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  OmitClassName<React.ComponentProps<"button">>
>((props, ref) => {
  const { orientation, scrollNext, canScrollNext } = useCarousel();

  return (
    <button
      ref={ref}
      type="button"
      className={clsx(
        "size-12 rounded-full bg-button-background text-white transition-colors hover:bg-button-background-brighter disabled:pointer-events-none disabled:opacity-30",
        orientation === "vertical" && "rotate-90",
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      →<span className="sr-only">Next slide</span>
    </button>
  );
});
CarouselNext.displayName = "CarouselNext";

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
};
