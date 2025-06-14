import * as React from "react";
import * as Radix from "@radix-ui/react-select";
import { ChevronDown } from "lucide-react";

export interface SelectWardProps {
  wards: Array<{ name: string; label: string }>;
  placeholder?: string;
}

export default function SelectWard({
  wards,
  placeholder = "Select a Ward…",
}: SelectWardProps) {
  const [value, setValue] = React.useState("");

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
        className="border border-gray-300 px-4 py-2 flex justify-between items-center w-full"
        aria-label={placeholder}
      >
        <Radix.Value placeholder={placeholder} />
        <ChevronDown className="ml-2" />
      </Radix.Trigger>

      <Radix.Portal>
        <Radix.Content
          side="bottom"
          align="start"
          sideOffset={5}
          avoidCollisions
          collisionPadding={8}
          className="mt-1 w-full border border-gray-300 bg-white shadow-lg"
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
