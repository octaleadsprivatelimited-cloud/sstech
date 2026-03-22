import { useState, useEffect } from "react";
import { getAbout, saveAbout, uploadImage, AboutData } from "@/lib/firestore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Save, Upload } from "lucide-react";

const defaultAbout: AboutData = {
  heroTitle: "Our story of stable innovation",
  heroSubtitle: "Founded with the vision of bridging the gap between businesses and technology, Sthanu Setu Technologies has grown into a trusted IT partner for companies across India and beyond.",
  heroBgImage: "",
  vision: "To be the most trusted technology partner for businesses seeking stable, scalable, and innovative digital solutions globally.",
  mission: "To empower businesses with reliable technology solutions that drive growth, efficiency, and competitive advantage in an ever-evolving digital landscape.",
};

const AdminAbout = () => {
  const [data, setData] = useState<AboutData>(defaultAbout);
  const [saving, setSaving] = useState(false);

  useEffect(() => { getAbout().then((d) => d && setData(d)); }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try { const url = await uploadImage(file, "about"); setData({ ...data, heroBgImage: url }); toast.success("Uploaded"); }
    catch { toast.error("Failed"); }
  };

  const handleSave = async () => {
    setSaving(true);
    try { await saveAbout(data); toast.success("Saved!"); }
    catch { toast.error("Failed"); }
    setSaving(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading text-2xl font-bold text-navy">About Page</h2>
        <Button onClick={handleSave} disabled={saving} className="bg-electric hover:bg-electric/90 text-white"><Save className="w-4 h-4 mr-2" /> {saving ? "Saving..." : "Save"}</Button>
      </div>
      <div className="bg-surface-raised rounded-xl p-6 border border-border/50 space-y-5">
        <div><label className="text-sm font-medium text-navy block mb-1.5">Hero Title</label><Input value={data.heroTitle} onChange={(e) => setData({ ...data, heroTitle: e.target.value })} /></div>
        <div><label className="text-sm font-medium text-navy block mb-1.5">Hero Subtitle</label><Textarea rows={3} value={data.heroSubtitle} onChange={(e) => setData({ ...data, heroSubtitle: e.target.value })} /></div>
        <div>
          <label className="text-sm font-medium text-navy block mb-1.5">Hero Background Image</label>
          <div className="flex items-center gap-4">
            <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-secondary rounded-lg text-sm font-medium hover:bg-secondary/80">
              <Upload className="w-4 h-4" /> Upload
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </label>
            {data.heroBgImage && <img src={data.heroBgImage} alt="Preview" className="w-20 h-14 object-cover rounded-lg border" />}
          </div>
        </div>
        <div><label className="text-sm font-medium text-navy block mb-1.5">Vision</label><Textarea rows={3} value={data.vision} onChange={(e) => setData({ ...data, vision: e.target.value })} /></div>
        <div><label className="text-sm font-medium text-navy block mb-1.5">Mission</label><Textarea rows={3} value={data.mission} onChange={(e) => setData({ ...data, mission: e.target.value })} /></div>
      </div>
    </div>
  );
};

export default AdminAbout;
