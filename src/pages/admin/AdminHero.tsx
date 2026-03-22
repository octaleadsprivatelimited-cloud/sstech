import { useState, useEffect } from "react";
import { getHero, saveHero, uploadImage, HeroData } from "@/lib/firestore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Save, Upload } from "lucide-react";

const defaultHero: HeroData = { badge: "Stable Innovation", title: "Stable Innovation for a", highlight: "Digital-First", subtitle: "We help businesses grow through secure, efficient, and future-ready technology. From consulting to custom software — we deliver results.", bgImage: "" };

const AdminHero = () => {
  const [data, setData] = useState<HeroData>(defaultHero);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => { getHero().then((d) => d && setData(d)); }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadImage(file, "hero");
      setData((prev) => ({ ...prev, bgImage: url }));
      toast.success("Image uploaded");
    } catch { toast.error("Upload failed"); }
    setUploading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    try { await saveHero(data); toast.success("Hero section saved!"); }
    catch { toast.error("Save failed"); }
    setSaving(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading text-2xl font-bold text-navy">Hero Section</h2>
        <Button onClick={handleSave} disabled={saving} className="bg-electric hover:bg-electric/90 text-white">
          <Save className="w-4 h-4 mr-2" /> {saving ? "Saving..." : "Save"}
        </Button>
      </div>
      <div className="bg-surface-raised rounded-xl p-6 border border-border/50 space-y-5">
        <div>
          <label className="text-sm font-medium text-navy block mb-1.5">Badge Text</label>
          <Input value={data.badge} onChange={(e) => setData({ ...data, badge: e.target.value })} />
        </div>
        <div>
          <label className="text-sm font-medium text-navy block mb-1.5">Title</label>
          <Input value={data.title} onChange={(e) => setData({ ...data, title: e.target.value })} />
        </div>
        <div>
          <label className="text-sm font-medium text-navy block mb-1.5">Highlighted Text</label>
          <Input value={data.highlight} onChange={(e) => setData({ ...data, highlight: e.target.value })} />
        </div>
        <div>
          <label className="text-sm font-medium text-navy block mb-1.5">Subtitle</label>
          <Textarea rows={3} value={data.subtitle} onChange={(e) => setData({ ...data, subtitle: e.target.value })} />
        </div>
        <div>
          <label className="text-sm font-medium text-navy block mb-1.5">Background Image</label>
          <div className="flex items-center gap-4">
            <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-secondary rounded-lg text-sm font-medium hover:bg-secondary/80 transition-colors">
              <Upload className="w-4 h-4" /> {uploading ? "Uploading..." : "Upload Image"}
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </label>
            {data.bgImage && <img src={data.bgImage} alt="Preview" className="w-20 h-14 object-cover rounded-lg border" />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHero;
