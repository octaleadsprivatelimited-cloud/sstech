import { useState, useEffect } from "react";
import { getPageBanner, savePageBanner, uploadImage, PageBanner } from "@/lib/firestore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Save, Upload } from "lucide-react";

const pages = [
  { key: "services", label: "Services Page" },
  { key: "careers", label: "Careers Page" },
  { key: "contact", label: "Contact Page" },
  { key: "about", label: "About Page" },
];

const AdminBanners = () => {
  const [activeTab, setActiveTab] = useState("services");
  const [data, setData] = useState<Record<string, PageBanner>>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    pages.forEach((p) => {
      getPageBanner(p.key).then((d) => {
        if (d) setData((prev) => ({ ...prev, [p.key]: d }));
      });
    });
  }, []);

  const current = data[activeTab] || { title: "", subtitle: "", bgImage: "" };

  const updateField = (field: keyof PageBanner, value: string) => {
    setData((prev) => ({ ...prev, [activeTab]: { ...current, [field]: value } }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try { const url = await uploadImage(file, `banners/${activeTab}`); updateField("bgImage", url); toast.success("Uploaded"); }
    catch { toast.error("Failed"); }
  };

  const handleSave = async () => {
    setSaving(true);
    try { await savePageBanner(activeTab, current); toast.success("Saved!"); }
    catch { toast.error("Failed"); }
    setSaving(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading text-2xl font-bold text-navy">Page Banners</h2>
        <Button onClick={handleSave} disabled={saving} className="bg-electric hover:bg-electric/90 text-white"><Save className="w-4 h-4 mr-2" /> {saving ? "Saving..." : "Save"}</Button>
      </div>

      <div className="flex gap-2 mb-6 flex-wrap">
        {pages.map((p) => (
          <Button key={p.key} variant={activeTab === p.key ? "default" : "outline"} size="sm" onClick={() => setActiveTab(p.key)} className={activeTab === p.key ? "bg-electric text-white" : ""}>
            {p.label}
          </Button>
        ))}
      </div>

      <div className="bg-surface-raised rounded-xl p-6 border border-border/50 space-y-5">
        <div><label className="text-sm font-medium text-navy block mb-1.5">Title</label><Input value={current.title} onChange={(e) => updateField("title", e.target.value)} /></div>
        <div><label className="text-sm font-medium text-navy block mb-1.5">Subtitle</label><Textarea rows={2} value={current.subtitle} onChange={(e) => updateField("subtitle", e.target.value)} /></div>
        <div>
          <label className="text-sm font-medium text-navy block mb-1.5">Background Image</label>
          <div className="flex items-center gap-4">
            <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-secondary rounded-lg text-sm font-medium hover:bg-secondary/80">
              <Upload className="w-4 h-4" /> Upload
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </label>
            {current.bgImage && <img src={current.bgImage} alt="Preview" className="w-20 h-14 object-cover rounded-lg border" />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminBanners;
