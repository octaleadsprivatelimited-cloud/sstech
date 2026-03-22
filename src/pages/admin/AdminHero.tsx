import { useState, useEffect } from "react";
import { getHero, saveHero, uploadImage, HeroData } from "@/lib/firestore";
import { defaultHero } from "@/lib/firestore-defaults";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Save, Upload, Eye, ImageIcon } from "lucide-react";

const AdminHero = () => {
  const [data, setData] = useState<HeroData>(defaultHero);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getHero().then((d) => { if (d) setData(d); }).finally(() => setLoaded(true));
  }, []);

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

  if (!loaded) return <div className="flex items-center justify-center py-20"><div className="animate-spin w-6 h-6 border-2 border-electric border-t-transparent rounded-full" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-xl font-bold text-navy">Hero Section</h2>
          <p className="text-sm text-muted-foreground mt-0.5">Homepage hero content & background image</p>
        </div>
        <Button onClick={handleSave} disabled={saving} size="sm" className="bg-electric hover:bg-electric/90 text-white">
          <Save className="w-4 h-4 mr-2" /> {saving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      {/* Preview */}
      <div className="relative rounded-xl overflow-hidden h-40 bg-navy">
        {data.bgImage && <img src={data.bgImage} alt="Hero preview" className="absolute inset-0 w-full h-full object-cover opacity-40" />}
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(220,60%,10%)]/80 to-transparent" />
        <div className="relative z-10 p-6 flex flex-col justify-center h-full">
          <span className="text-xs text-primary-foreground/60 mb-1">{data.badge}</span>
          <p className="font-heading font-bold text-primary-foreground text-lg">{data.title} <span className="text-electric">{data.highlight}</span> World</p>
          <p className="text-xs text-primary-foreground/50 mt-1 max-w-sm truncate">{data.subtitle}</p>
        </div>
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/30 rounded-md px-2 py-1">
          <Eye className="w-3 h-3 text-primary-foreground/60" />
          <span className="text-[10px] text-primary-foreground/60">Preview</span>
        </div>
      </div>

      <div className="bg-surface-raised rounded-xl border border-border/50 divide-y divide-border/50">
        <div className="p-5 space-y-4">
          <h3 className="font-heading font-semibold text-sm text-navy">Text Content</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Badge Text</Label>
              <Input value={data.badge} onChange={(e) => setData({ ...data, badge: e.target.value })} placeholder="e.g. Stable Innovation" />
            </div>
            <div className="space-y-1.5">
              <Label>Highlighted Word</Label>
              <Input value={data.highlight} onChange={(e) => setData({ ...data, highlight: e.target.value })} placeholder="e.g. Digital-First" />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label>Title</Label>
            <Input value={data.title} onChange={(e) => setData({ ...data, title: e.target.value })} />
          </div>
          <div className="space-y-1.5">
            <Label>Subtitle</Label>
            <Textarea rows={3} value={data.subtitle} onChange={(e) => setData({ ...data, subtitle: e.target.value })} />
          </div>
        </div>

        <div className="p-5 space-y-3">
          <h3 className="font-heading font-semibold text-sm text-navy">Background Image</h3>
          <div className="flex items-center gap-4">
            <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 bg-secondary rounded-lg text-sm font-medium hover:bg-secondary/80 transition-colors border border-border/50">
              <Upload className="w-4 h-4" /> {uploading ? "Uploading..." : "Upload Image"}
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </label>
            {data.bgImage ? (
              <img src={data.bgImage} alt="Preview" className="w-24 h-16 object-cover rounded-lg border" />
            ) : (
              <div className="w-24 h-16 rounded-lg border border-dashed border-border flex items-center justify-center">
                <ImageIcon className="w-5 h-5 text-muted-foreground/40" />
              </div>
            )}
          </div>
          <p className="text-xs text-muted-foreground">Recommended: 1920×1080px. Images are auto-compressed.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminHero;
