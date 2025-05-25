import { useState, useEffect } from "react";
import blankImage from "~/assets/static-assets/blank.jpeg";

type Labels = {
  nameEn: string;
  nameKok: string;
  relNameEn: string;
  relNameKok: string;
  age: string;
  ward: string;
  death: string;
  [key: string]: string;
};

type FormState = {
  englishName: string;
  konkaniName: string;
  relationType: string;
  relNameEn: string;
  relNameKok: string;
  age: string;
  ward: string;
  dateOfDeath: string;
  imageUrl: string;
};

type ObituaryPreviewProps = {
  labels: Labels;
  lang: "en" | "kok";
  wards: { key: string, value: string }[];
  relationTypes: { key: string, value: string, label: string }[];
};

export default function ObituaryPreview({ labels, lang, wards, relationTypes }: ObituaryPreviewProps) {
  const [form, setForm] = useState<FormState>({
    englishName: "",
    konkaniName: "",
    relationType: "",
    relNameEn: "",
    relNameKok: "",
    age: "",
    ward: "",
    dateOfDeath: "",
    imageUrl: blankImage.src,
  });

  useEffect(() => {
    function handler(e: Event) {
      const customEvent = e as CustomEvent<FormState>;
      setForm((prev) => ({
        ...prev,
        ...customEvent.detail,
      }));
    }
    window.addEventListener("obituary-form-update", handler as EventListener);
    return () => window.removeEventListener("obituary-form-update", handler as EventListener);
  }, []);

  useEffect(() => {
    function handleImagePreview(e: Event) {
      const customEvent = e as CustomEvent<{ imageUrl: string }>;
      setForm((prev) => ({ ...prev, imageUrl: customEvent.detail?.imageUrl || "", }));
    }
    window.addEventListener("obituary-image-preview", handleImagePreview as EventListener);
    return () => window.removeEventListener("obituary-image-preview", handleImagePreview as EventListener);
  }, []);

  // Lookup for user-friendly label/text
  const relation = relationTypes.find(rt => rt.value === form.relationType);
  const wardObj = wards.find(w => w.value === form.ward);

  // Show localized label if present, else fallback
  const relationLabel = relation
    ? (lang === "kok" && labels[relation.key])
      ? labels[relation.key]
      : relation.label
    : (form.relationType || "");

  const wardLabel = wardObj
    ? labels[wardObj.key] || wardObj.value
    : (form.ward || labels.ward);

  return (
    <div className="bg-white border border-gray-200 overflow-hidden w-[280px] md:w-[250px] flex flex-col transition-transform duration-200 ease-in-out md:h-[490px] m-auto">
      <div className="aspect-[4/5] bg-gray-100">
        {form.imageUrl ? (
          <img src={form.imageUrl} alt="Image Preview" className="object-cover w-full h-full" />
        ) : null}
      </div>
      <div className="p-3 font-noto-sans-kannada space-y-1 text-slate-800 text-sm">
        <h3 className="line-clamp-1 text-xl font-bold text-slate-900">
          {lang === "kok" ? form.konkaniName || labels.nameKok : form.englishName || labels.nameEn}
        </h3>
        <p className="line-clamp-1 md:text-base text-lg text-slate-700">
          {relation && (<>              <strong>{relation.value}:</strong>&nbsp;            </>)}
          {lang === "kok" ? (form.relNameKok || labels.relNameKok) : (form.relNameEn || labels.relNameEn)}
        </p>
        <p className="line-clamp-1 md:text-base text-lg text-slate-700">
          {form.age && (<>      <strong>{labels.age}:</strong>&nbsp;    </>)}  {form.age || labels.age}
        </p>
        <p className="line-clamp-1 md:text-base text-lg text-slate-700">
          {wardObj && (<>      <strong>{labels.ward}:</strong>&nbsp;    </>)}  {wardLabel}
        </p>
        <p className="line-clamp-1 md:text-base text-lg text-slate-700">
          {form.dateOfDeath && (<>      <strong>{labels.death}:</strong>&nbsp;    </>)}  {form.dateOfDeath ? formatDate(form.dateOfDeath) : labels.death}
        </p>
      </div>
    </div>
  );
}

function formatDate(dateStr: string) {
  if (!dateStr) return "";
  const [year, month, day] = dateStr.split("-");
  if (!year || !month || !day) return dateStr;
  return `${day}-${month}-${year}`;
}
