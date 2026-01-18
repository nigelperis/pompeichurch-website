import * as React from "react";
import * as Radix from "@radix-ui/react-select";
import ChevronDown from "~/assets/icons/chevron-down.svg?react";
import { cn } from "~/helpers/cn";
import { Locale } from "~/enums/locale";

type Psalm = {
  title: string;
  content: string;
};

interface PsalmViewerProps {
  psalms: Psalm[];
  lang: string;
  sectionTitle: string;
  backgroundImage: string;
}

export default function PsalmViewer({
  psalms,
  lang,
  sectionTitle,
  backgroundImage,
}: PsalmViewerProps) {
  const [value, setValue] = React.useState("0");
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const [triggerWidth, setTriggerWidth] = React.useState(0);

  React.useLayoutEffect(() => {
    if (triggerRef.current) {
      setTriggerWidth(triggerRef.current.getBoundingClientRect().width);
    }
  }, []);

  React.useEffect(() => {
    const handleResize = () => {
      if (triggerRef.current) {
        setTriggerWidth(triggerRef.current.getBoundingClientRect().width);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const currentPsalm = psalms[Number(value)];
  const hasMultiplePsalms = psalms.length > 1;

  return (
    <div className="flex flex-col">
      <div className="mt-4 flex flex-row items-center justify-between gap-4 border-b-2 border-b-natgeo-yellow pb-2">
        <h2 className="text-2xl font-bold lg:text-3xl">
          {sectionTitle}
        </h2>

        {hasMultiplePsalms && (
          <div className="w-64">
            <Radix.Root value={value} onValueChange={setValue}>
              <Radix.Trigger
                ref={triggerRef}
                className="flex w-full cursor-pointer items-center justify-between border border-gray-300 bg-white px-4 py-2 hover:bg-gray-50"
                aria-label="Select Psalm"
              >
                <Radix.Value>{currentPsalm.title}</Radix.Value>
                <ChevronDown width={24} height={24} className="text-slate-700" />
              </Radix.Trigger>

              <Radix.Portal>
                <Radix.Content
                  position="popper"
                  side="bottom"
                  align="end"
                  sideOffset={0}
                  avoidCollisions={false}
                  style={{ width: triggerWidth }}
                  className="z-50 overflow-hidden border border-gray-300 bg-white shadow-lg"
                >
                  <Radix.Viewport className="p-1">
                    {psalms.map((psalm, index) => (
                      <Radix.Item
                        key={index}
                        value={index.toString()}
                        className="cursor-pointer px-4 py-2 text-gray-700 outline-none hover:bg-gray-100 focus:bg-gray-100"
                      >
                        <Radix.ItemText>{psalm.title}</Radix.ItemText>
                      </Radix.Item>
                    ))}
                  </Radix.Viewport>
                </Radix.Content>
              </Radix.Portal>
            </Radix.Root>
          </div>
        )}
      </div>
      <div
        className="mt-4 h-96 overflow-y-auto bg-opacity-90 bg-cover bg-center p-3"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="bg-opacity-80">
          <h3
            className={cn("text-center font-extrabold sm:text-xl", {
              "font-bold": lang === Locale.KOK,
            })}
          >
            {currentPsalm.title}
          </h3>
          <br />
          <div
            className="text-center leading-relaxed"
            dangerouslySetInnerHTML={{ __html: currentPsalm.content }}
          />
        </div>
      </div>
    </div>
  );
}
