import * as React from "react";
import * as Radix from "@radix-ui/react-select";
import ChevronDown from "~/assets/icons/chevron-down.svg?react";

export interface PsalmSelectorProps {
  psalms: Array<{ title: string }>;
  value: string;
  onValueChange: (value: string) => void;
}

export default function PsalmSelector({
  psalms,
  value,
  onValueChange,
}: PsalmSelectorProps) {
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const [triggerWidth, setTriggerWidth] = React.useState(0);
  const currentPsalm = psalms[Number(value)];

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

  return (
    <Radix.Root value={value} onValueChange={onValueChange}>
      <Radix.Trigger
        ref={triggerRef}
        className="border border-gray-300 px-4 py-2 flex justify-between items-center w-full bg-white hover:cursor-pointer outline-none focus:ring-0"
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
          className="z-50 border border-gray-300 bg-white shadow-lg overflow-hidden"
        >
          <Radix.Viewport className="p-1">
            {psalms.map((psalm, index) => (
              <Radix.Item
                key={index}
                value={index.toString()}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                <Radix.ItemText>{psalm.title}</Radix.ItemText>
              </Radix.Item>
            ))}
          </Radix.Viewport>
        </Radix.Content>
      </Radix.Portal>
    </Radix.Root>
  );
}