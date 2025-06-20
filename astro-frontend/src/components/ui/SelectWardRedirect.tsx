import * as React from "react";
import * as Radix from "@radix-ui/react-select";
import ChevronDown from "~/assets/icons/chevron-down.svg?react";

export interface SelectWardRedirectProps {
  wards: Array<{ name: string; label: string }>;
  placeholder?: string;
}

export default function SelectWardRedirect({
  wards,
  placeholder = "Select Ward…",
}: SelectWardRedirectProps) {
  const [value, setValue] = React.useState("");
  const [dynamicPlaceholder, setDynamicPlaceholder] = React.useState(placeholder);
  const [isKonkani, setIsKonkani] = React.useState(false);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const [triggerWidth, setTriggerWidth] = React.useState(0);

  React.useEffect(() => {
    setIsKonkani(window.location.pathname.startsWith("/kok"));

    const urlParams = new URLSearchParams(window.location.search);
    const wardParam = urlParams.get("ward");

    if (wardParam) {
      const wardName = wardParam.replace(/-/g, " ");
      const matchingWard = wards.find(
        ward => ward.name.toLowerCase() === wardName.toLowerCase()
      );
      if (matchingWard) {
        setDynamicPlaceholder(matchingWard.label);
      } else {
        setDynamicPlaceholder(wardName.replace(/\b\w/g, l => l.toUpperCase()));
      }
    } else {
      setDynamicPlaceholder(placeholder);
    }
  }, [wards, placeholder]);

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
      const basePath = isKonkani ? "/kok/obituary" : "/obituary";
      const query = value === "__all__" ? "" : `?ward=${value.toLowerCase().replace(/\s+/g, "-")}`;
      window.location.href = `${basePath}${query}`;
    }
  }, [value, isKonkani]);

  const options = React.useMemo(() => [
    { name: "__all__", label: isKonkani ? "ಸಗ್ಳೆಂ" : "All" },
    ...wards,
  ], [isKonkani, wards]);

  return (
    <Radix.Root value={value} onValueChange={setValue}>
      <Radix.Trigger
        ref={triggerRef}
        className="border border-gray-300 px-4 py-2 md:ml-5 flex justify-between items-center w-[50%] md:w-full hover:cursor-pointer"
        aria-label={dynamicPlaceholder}
      >
        <Radix.Value placeholder={dynamicPlaceholder} />
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
            {options.map((w) => (
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
