import * as React from "react";
import * as Radix from "@radix-ui/react-select";
import ChevronDown from "~/assets/icons/chevron-down.svg?react";

export interface SelectAssociationRedirectProps {
  associations: Array<{ slug: string; name: string }>;
  placeholder?: string;
  allLabel?: string;
}

export default function SelectAssociationRedirect({
  associations,
  placeholder = "Select Association",
  allLabel = "All",
}: SelectAssociationRedirectProps) {
  const [value, setValue] = React.useState("");
  const [dynamicPlaceholder, setDynamicPlaceholder] =
    React.useState(placeholder);
  const [isKonkani, setIsKonkani] = React.useState(false);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const [triggerWidth, setTriggerWidth] = React.useState(0);

  React.useEffect(() => {
    setIsKonkani(window.location.pathname.startsWith("/kok"));
    setDynamicPlaceholder(placeholder);
  }, [placeholder]);

  React.useLayoutEffect(() => {
    if (triggerRef.current) {
      setTriggerWidth(triggerRef.current.offsetWidth);
    }
  }, []);

  React.useEffect(() => {
    const handleResize = () => {
      if (triggerRef.current) {
        setTriggerWidth(triggerRef.current.offsetWidth);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  React.useEffect(() => {
    if (value) {
      const base = isKonkani ? "/kok" : "";
      const target =
        value === "__all__"
          ? `${base}/events`
          : `${base}/associations/${value}/events`;
      window.location.href = target;
    }
  }, [value, isKonkani]);

  const options = React.useMemo(
    () => [{ slug: "__all__", name: allLabel }, ...associations],
    [associations, allLabel],
  );

  return (
    <div className="w-full max-w-md ml-auto">
      <Radix.Root value={value} onValueChange={setValue}>
        <Radix.Trigger
          ref={triggerRef}
          className="border border-gray-300 px-4 py-2 flex justify-between items-center w-full hover:cursor-pointer"
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
            avoidCollisions={false}
            collisionPadding={0}
            style={{ width: `${triggerWidth}px` }}
            className="mb-2 border border-gray-300 bg-white shadow-lg overflow-hidden"
          >
            <Radix.Viewport className="p-1">
              {options.map((opt) => (
                <Radix.Item
                  key={opt.slug}
                  value={opt.slug}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  <Radix.ItemText>{opt.name}</Radix.ItemText>
                </Radix.Item>
              ))}
            </Radix.Viewport>
          </Radix.Content>
        </Radix.Portal>
      </Radix.Root>
    </div>
  );
}
