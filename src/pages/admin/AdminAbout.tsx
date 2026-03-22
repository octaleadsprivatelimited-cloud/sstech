import { useState, useEffect } from "react";
import { getAbout, saveAbout, uploadImage, AboutData } from "@/lib/firestore";
import { defaultAbout } from "@/lib/firestore-defaults";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Save, Upload, ImageIcon } from "lucide-react";

const AdminAbout = () => {
  const [data, setData] = useState<AboutData>(defaultAbout);
  const [saving, setSaving] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => { getAbout().then((d) => { if (d) setData(d); }).finally(() => setLoaded(true)); }, []);

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

  if (!loaded) return <div className="flex items-center justify-center py-20"><div className="animate-spin w-6 h-6 border-2 border-electric border-t-transparent rounded-full" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-xl font-bold text-navy">About Page</h2>
          <p className="text-sm text-muted-foreground mt-0.5">Vision, mission & about content</p>
        </div>
        <Button onClick={handleSave} disabled={saving} size="sm" className="bg-electric hover:bg-electric/90 text-white"><Save className="w-4 h-4 mr-2" /> {saving ? "Saving..." : "Save Changes"}</Button>
      </div>

      <div className="bg-surface-raised rounded-xl border border-border/50 divide-y divide-border/50">
        <div className="p-5 space-y-4">
          <h3 className="font-heading font-semibold text-sm text-navy">Hero Section</h3>
          <div className="space-y-1.5"><Label>Title</Label><Input value={data.heroTitle} onChange={(e) => setData({ ...data, heroTitle: e.target.value })} /></div>
          <div className="space-y-1.5"><Label>Subtitle</Label><Textarea rows={3} value={data.heroSubtitle} onChange={(e) => setData({ ...data, heroSubtitle: e.target.value })} /></div>
          <div className="space-y-1.5">
            <Label>Background Image</Label>
            <div className="flex items-center gap-4">
              <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 bg-secondary rounded-lg text-sm font-medium hover:bg-secondary/80 border border-border/50">
                <Upload className="w-4 h-4" /> Upload
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>
              {data.heroBgImage ? (
                <img src={data.heroBgImage} alt="Preview" className="w-24 h-16 object-cover rounded-lg border" />
              ) : (
                <div className="w-24 h-16 rounded-lg border border-dashed border-border flex items-center justify-center"><ImageIcon className="w-5 h-5 text-muted-foreground/40" /></div>
              )}
            </div>
          </div>
        </div>
        <div className="p-5 space-y-4">
          <h3 className="font-heading font-semibold text-sm text-navy">Vision & Mission</h3>
          <div className="space-y-1.5"><Label>Vision</Label><Textarea rows={3} value={data.vision} onChange={(e) => setData({ ...data, vision: e.target.value })} /></div>
          <div className="space-y-1.5"><Label>Mission</Label><Textarea rows={3} value={data.mission} onChange={(e) => setData({ ...data, mission: e.target.value })} /></div>
        </div>
      </div>
    </div>
  );
};

export default AdminAbout;
