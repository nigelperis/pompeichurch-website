import * as React from "react";
import * as Radix from "@radix-ui/react-select";
import ChevronDown from "~/assets/icons/chevron-down.svg?react";

export interface SelectWardProps {
  wards: Array<{ name: string; label: string }>;
  placeholder?: string;
}

export default function SelectWard({
  wards,
  placeholder = "Select Ward…",
}: SelectWardProps) {
  const [value, setValue] = React.useState("");
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

  React.useEffect(() => {
    if (value) {
      const id = `ward-${value.toLowerCase().replace(/\s+/g, "-")}`;
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        setValue("");
      }
    }
  }, [value]);

  return (
    <Radix.Root value={value} onValueChange={setValue}>
      <Radix.Trigger
        ref={triggerRef}
        className="border border-gray-300 px-4 py-2 flex justify-between items-center w-full hover:cursor-pointer"
        aria-label={placeholder}
      >
        <Radix.Value placeholder={placeholder} />
        <ChevronDown width={24} height={24} className="text-slate-600" />
      </Radix.Trigger>

      <Radix.Portal>
        <Radix.Content
          side="top"
          align="start"
          sideOffset={0}
          avoidCollisions
          collisionPadding={0}
          style={{ width: triggerWidth * 1.1 }}
          className="mb-2 border border-gray-300 bg-white shadow-lg overflow-hidden"
        >
          <Radix.Viewport className="p-1">
            {wards.map((w) => (
              <Radix.Item
                key={w.name}
                value={w.name}
                className="px-4 py-2 rounded hover:bg-gray-100 cursor-pointer"
              >
                <Radix.ItemText>{w.label}</Radix.ItemText>
              </Radix.Item>
            ))}
          </Radix.Viewport>
        </Radix.Content>
      </Radix.Portal>
    </Radix.Root>
  );
}
