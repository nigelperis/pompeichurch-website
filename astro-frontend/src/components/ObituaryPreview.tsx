import { useState, useEffect } from "react";

type Labels = {
  nameEn: string;
  nameKok: string;
  relNameEn: string;
  relNameKok: string;
  age: string;
  ward: string;
  death: string;
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
};

export default function ObituaryPreview({ labels, lang }: ObituaryPreviewProps) {
  const [form, setForm] = useState<FormState>({
    englishName: "",
    konkaniName: "",
    relationType: "",
    relNameEn: "",
    relNameKok: "",
    age: "",
    ward: "",
    dateOfDeath: "",
    imageUrl: "/blank.jpeg",
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

  return (
    <div className="bg-white border border-gray-200 overflow-hidden w-[280px] md:w-[250px] flex flex-col transition-transform duration-200 ease-in-out md:h-[490px] m-auto">
      <div className="aspect-[4/5] bg-gray-100">
        {form.imageUrl ? (<img src={form.imageUrl} alt="Image Preview" className="object-cover w-full h-full" />) : null}
      </div>
      <div className="p-3 font-noto-sans-kannada space-y-1 text-slate-800 text-sm">
        <h3 className="line-clamp-1 text-xl font-bold text-slate-900">
          {lang === "kok" ? form.konkaniName || labels.nameKok : form.englishName || labels.nameEn}
        </h3>
        <p className="line-clamp-1 md:text-base text-lg text-slate-700">
          {(form.relationType ? form.relationType + ": " : "") + (lang === "kok" ? form.relNameKok || labels.relNameKok : form.relNameEn || labels.relNameEn)}
        </p>
        <p className="line-clamp-1 md:text-base text-lg text-slate-700">
          {(form.age ? labels.age + ": " : "") + (form.age || labels.age)}
        </p>
        <p className="line-clamp-1 md:text-base text-lg text-slate-700">
          {(form.ward ? labels.ward + ": " : "") + (form.ward || labels.ward)}
        </p>
        <p className="line-clamp-1 md:text-base text-lg text-slate-700">
          {(form.dateOfDeath ? labels.death + ": " : "") + (form.dateOfDeath || labels.death)}
        </p>
      </div>
    </div>
  );
}
