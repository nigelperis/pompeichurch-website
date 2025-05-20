import { useState, useEffect } from "react";

type Labels = {
  nameEn: string;
  relNameEn: string;
  age: string;
  ward: string;
  death: string;
};

type FormState = {
  englishName: string;
  relationType: string;
  relNameEn: string;
  age: string;
  ward: string;
  dateOfDeath: string;
  imageUrl: string;
};

type ObituaryPreviewProps = {
  labels: Labels;
};

export default function ObituaryPreview({ labels }: ObituaryPreviewProps) {
  const [form, setForm] = useState<FormState>({
    englishName: "",
    relationType: "",
    relNameEn: "",
    age: "",
    ward: "",
    dateOfDeath: "",
    imageUrl: "",
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
      setForm((prev) => ({
        ...prev,
        imageUrl: customEvent.detail?.imageUrl || "",
      }));
    }
    window.addEventListener("obituary-image-preview", handleImagePreview as EventListener);
    return () => window.removeEventListener("obituary-image-preview", handleImagePreview as EventListener);
  }, []);

  return (
    <div className="border border-gray-300 overflow-hidden bg-white w-full transition-all duration-200 ease-in-out">
      <div className="aspect-[4/5] bg-gray-100">
        {form.imageUrl ? (
          <img src={form.imageUrl} alt="Image Preview" className="object-cover w-full h-full" />
        ) : null}
      </div>
      <div className="p-3 font-noto-sans-kannada space-y-1 text-slate-800 text-sm">
        <h3 className="line-clamp-1 text-xl font-bold text-slate-900">
          {form.englishName || labels.nameEn}
        </h3>
        <p className="line-clamp-1 md:text-base text-lg text-slate-700">
          {(form.relationType ? form.relationType + ": " : "") +
            (form.relNameEn || labels.relNameEn)}
        </p>
        <p className="line-clamp-1 md:text-base text-lg text-slate-700">
          {form.age ? `${labels.age}: ${form.age}` : ""}
        </p>
        <p className="line-clamp-1 md:text-base text-lg text-slate-700">
          {form.ward ? `${labels.ward}: ${form.ward}` : ""}
        </p>
        <p className="line-clamp-1 md:text-base text-lg text-slate-700">
          {form.dateOfDeath ? `${labels.death}: ${form.dateOfDeath}` : ""}
        </p>
      </div>
    </div>
  );
}
