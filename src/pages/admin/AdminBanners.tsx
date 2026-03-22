import { useState, useEffect } from "react";
import { getPageBanner, savePageBanner, uploadImage, PageBanner } from "@/lib/firestore";
import { defaultBanners } from "@/lib/firestore-defaults";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Save, Upload, ImageIcon, Eye } from "lucide-react";

const pages = [
  { key: "services", label: "Services" },
  { key: "careers", label: "Careers" },
  { key: "contact", label: "Contact" },
  { key: "about", label: "About" },
];

const AdminBanners = () => {
  const [activeTab, setActiveTab] = useState("services");
  const [data, setData] = useState<Record<string, PageBanner>>({ ...defaultBanners });
  const [saving, setSaving] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    Promise.all(pages.map((p) =>
      getPageBanner(p.key).then((d) => {
        if (d) setData((prev) => ({ ...prev, [p.key]: d }));
      })
    )).finally(() => setLoaded(true));
  }, []);

  const current = data[activeTab] || defaultBanners[activeTab] || { title: "", subtitle: "", bgImage: "" };

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

  if (!loaded) return <div className="flex items-center justify-center py-20"><div className="animate-spin w-6 h-6 border-2 border-electric border-t-transparent rounded-full" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="font-heading text-lg sm:text-xl font-bold text-navy">Page Banners</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Hero banners for each page</p>
        </div>
        <Button onClick={handleSave} disabled={saving} size="sm" className="bg-electric hover:bg-electric/90 text-white self-start"><Save className="w-4 h-4 mr-2" /> {saving ? "Saving..." : "Save"}</Button>
      </div>

      <div className="flex gap-2 flex-wrap">
        {pages.map((p) => (
          <Button key={p.key} variant={activeTab === p.key ? "default" : "outline"} size="sm" onClick={() => setActiveTab(p.key)} className={activeTab === p.key ? "bg-electric text-white" : ""}>
            {p.label}
          </Button>
        ))}
      </div>

      {/* Preview */}
      <div className="relative rounded-xl overflow-hidden h-32 bg-navy">
        {current.bgImage && <img src={current.bgImage} alt="Banner preview" className="absolute inset-0 w-full h-full object-cover opacity-40" />}
        <div className="absolute inset-0 bg-[hsl(220,60%,10%)]/60" />
        <div className="relative z-10 p-5 flex flex-col justify-center h-full">
          <p className="font-heading font-bold text-primary-foreground text-base">{current.title || "Banner Title"}</p>
          <p className="text-xs text-primary-foreground/50 mt-1 max-w-md truncate">{current.subtitle || "Banner subtitle"}</p>
        </div>
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/30 rounded-md px-2 py-1">
          <Eye className="w-3 h-3 text-primary-foreground/60" />
          <span className="text-[10px] text-primary-foreground/60">Preview</span>
        </div>
      </div>

      <div className="bg-surface-raised rounded-xl border border-border/50 p-5 space-y-4">
        <div className="space-y-1.5"><Label>Title</Label><Input value={current.title} onChange={(e) => updateField("title", e.target.value)} /></div>
        <div className="space-y-1.5"><Label>Subtitle</Label><Textarea rows={2} value={current.subtitle} onChange={(e) => updateField("subtitle", e.target.value)} /></div>
        <div className="space-y-1.5">
          <Label>Background Image</Label>
          <div className="flex items-center gap-4">
            <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 bg-secondary rounded-lg text-sm font-medium hover:bg-secondary/80 border border-border/50">
              <Upload className="w-4 h-4" /> Upload
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </label>
            {current.bgImage ? (
              <img src={current.bgImage} alt="Preview" className="w-24 h-16 object-cover rounded-lg border" />
            ) : (
              <div className="w-24 h-16 rounded-lg border border-dashed border-border flex items-center justify-center"><ImageIcon className="w-5 h-5 text-muted-foreground/40" /></div>
            )}
          </div>
          <p className="text-xs text-muted-foreground">Recommended: 1920×600px. Auto-compressed.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminBanners;
