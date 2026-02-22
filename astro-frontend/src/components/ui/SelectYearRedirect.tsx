import * as React from "react";
import * as Radix from "@radix-ui/react-select";
import ChevronDown from "~/assets/icons/chevron-down.svg?react";

export interface SelectYearRedirectProps {
  years: number[];
  placeholder?: string;
  allYearsLabel?: string;
  selectedYear?: string | number;
}

export default function SelectYearRedirect({
  years,
  placeholder = "Select Year",
  allYearsLabel = "All Years",
  selectedYear,
}: SelectYearRedirectProps) {
  const [value, setValue] = React.useState("");
  const [dynamicPlaceholder, setDynamicPlaceholder] = React.useState(
    selectedYear ? String(selectedYear) : placeholder,
  );
  const [isKonkani, setIsKonkani] = React.useState(false);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const [triggerWidth, setTriggerWidth] = React.useState(0);

  React.useEffect(() => {
    setIsKonkani(window.location.pathname.startsWith("/kok"));
  }, []);

  React.useEffect(() => {
    setDynamicPlaceholder(selectedYear ? String(selectedYear) : placeholder);
  }, [selectedYear, placeholder]);

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
      const basePath = isKonkani
        ? "/kok/pompeichem-falkem"
        : "/pompeichem-falkem";
      const query = value === "__all__" ? "" : `?year=${value}`;
      window.location.href = `${basePath}${query}`;
    }
  }, [value, isKonkani]);

  const options = React.useMemo(() => {
    const sorted = [...years].sort((a, b) => a - b);
    return ["__all__", ...sorted.map(String)];
  }, [years]);

  return (
    <Radix.Root value={value} onValueChange={setValue}>
      <Radix.Trigger
        ref={triggerRef}
        className="border border-gray-300 px-4 py-2 flex justify-between items-center w-[50%] md:w-full md:hover:cursor-pointer"
        aria-label={dynamicPlaceholder}
      >
        <Radix.Value placeholder={dynamicPlaceholder} />
        <ChevronDown width={24} height={24} className="text-slate-700" />
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
            {options.map((opt) => (
              <Radix.Item
                key={opt}
                value={opt}
                className="px-4 py-2 md:hover:bg-gray-100 cursor-pointer"
              >
                <Radix.ItemText>
                  {opt === "__all__" ? allYearsLabel : opt}
                </Radix.ItemText>
              </Radix.Item>
            ))}
          </Radix.Viewport>
        </Radix.Content>
      </Radix.Portal>
    </Radix.Root>
  );
}
