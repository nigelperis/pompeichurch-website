import * as React from "react";
import { cn } from "~/helpers/cn";
import { Locale } from "~/enums/locale";
import PsalmSelector from "./PsalmSelector";

interface PsalmViewerProps {
  psalms: Array<{ title: string; content: string }>;
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
  const currentPsalm = psalms[Number(value)];
  const hasMultiplePsalms = psalms.length > 1;

  return (
    <div className="flex flex-col">
      <div
        className={cn(
          "mt-4 flex flex-col gap-4",
          "md:flex-row md:items-center md:justify-between md:border-b-2 md:border-b-natgeo-yellow md:pb-2",
        )}
      >
        <h2
          className={cn(
            "text-2xl font-bold lg:text-3xl",
            "border-b-2 border-b-natgeo-yellow pb-2",
            "md:border-b-0 md:pb-0",
          )}
        >
          {sectionTitle}
        </h2>

        {hasMultiplePsalms && (
          <div className="w-64">
            <PsalmSelector
              psalms={psalms}
              value={value}
              onValueChange={setValue}
            />
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
