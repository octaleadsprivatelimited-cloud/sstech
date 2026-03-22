import { useState, useEffect } from "react";
import { getServices, addService, updateService, deleteService, uploadImage, ServiceItem } from "@/lib/firestore";
import { defaultServices } from "@/lib/firestore-defaults";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Plus, Save, Trash2, Upload, X, Pencil, GripVertical, ImageIcon } from "lucide-react";

const emptyService: Omit<ServiceItem, "id"> = { title: "", shortDesc: "", description: "", benefits: [""], image: "", order: 0 };

const AdminServices = () => {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [editing, setEditing] = useState<ServiceItem | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const load = () => getServices().then((data) => {
    setServices(data.length > 0 ? data : defaultServices);
  }).catch(console.error).finally(() => setLoaded(true));

  useEffect(() => { load(); }, []);

  const startNew = () => { setEditing({ ...emptyService, order: services.length } as ServiceItem); setIsNew(true); };
  const startEdit = (s: ServiceItem) => { setEditing({ ...s }); setIsNew(false); };
  const cancel = () => { setEditing(null); setIsNew(false); };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editing) return;
    try {
      const url = await uploadImage(file, "services");
      setEditing({ ...editing, image: url });
      toast.success("Image uploaded");
    } catch { toast.error("Upload failed"); }
  };

  const handleSave = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      if (isNew) { await addService(editing); }
      else if (editing.id) { const { id, ...rest } = editing; await updateService(id, rest); }
      toast.success("Service saved!");
      cancel(); load();
    } catch { toast.error("Save failed"); }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this service?")) return;
    try { await deleteService(id); toast.success("Deleted"); load(); }
    catch { toast.error("Delete failed"); }
  };

  const updateBenefit = (index: number, value: string) => {
    if (!editing) return;
    const benefits = [...editing.benefits];
    benefits[index] = value;
    setEditing({ ...editing, benefits });
  };

  if (!loaded) return <div className="flex items-center justify-center py-20"><div className="animate-spin w-6 h-6 border-2 border-electric border-t-transparent rounded-full" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="font-heading text-lg sm:text-xl font-bold text-navy">Services</h2>
          <p className="text-xs text-muted-foreground mt-0.5">{services.length} service{services.length !== 1 ? "s" : ""}</p>
        </div>
        {!editing && <Button onClick={startNew} size="sm" className="bg-electric hover:bg-electric/90 text-white self-start"><Plus className="w-4 h-4 mr-1" /> Add</Button>}
      </div>

      {editing ? (
        <div className="bg-surface-raised rounded-xl border border-border/50 divide-y divide-border/50">
          <div className="p-5 space-y-4">
            <h3 className="font-heading font-semibold text-sm text-navy">{isNew ? "New Service" : "Edit Service"}</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5"><Label>Title</Label><Input value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} /></div>
              <div className="space-y-1.5"><Label>Short Description</Label><Input value={editing.shortDesc} onChange={(e) => setEditing({ ...editing, shortDesc: e.target.value })} /></div>
            </div>
            <div className="space-y-1.5"><Label>Full Description</Label><Textarea rows={3} value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} /></div>
          </div>
          <div className="p-5 space-y-3">
            <Label>Benefits</Label>
            <div className="space-y-2">
              {editing.benefits.map((b, i) => (
                <div key={i} className="flex gap-2">
                  <Input value={b} onChange={(e) => updateBenefit(i, e.target.value)} placeholder={`Benefit ${i + 1}`} />
                  <Button variant="ghost" size="icon" onClick={() => setEditing({ ...editing, benefits: editing.benefits.filter((_, idx) => idx !== i) })} className="shrink-0 text-muted-foreground hover:text-destructive"><X className="w-4 h-4" /></Button>
                </div>
              ))}
            </div>
            <Button variant="outline" size="sm" onClick={() => setEditing({ ...editing, benefits: [...editing.benefits, ""] })}><Plus className="w-3 h-3 mr-1" /> Add Benefit</Button>
          </div>
          <div className="p-5 space-y-3">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5"><Label>Order</Label><Input type="number" value={editing.order} onChange={(e) => setEditing({ ...editing, order: parseInt(e.target.value) || 0 })} /></div>
              <div className="space-y-1.5">
                <Label>Image</Label>
                <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 bg-secondary rounded-lg text-sm font-medium hover:bg-secondary/80 border border-border/50">
                  <Upload className="w-4 h-4" /> Upload
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
                {editing.image && <img src={editing.image} alt="Preview" className="w-20 h-14 object-cover rounded-lg border mt-2" />}
              </div>
            </div>
          </div>
          <div className="p-5 flex gap-3">
            <Button onClick={handleSave} disabled={saving} size="sm" className="bg-electric hover:bg-electric/90 text-white"><Save className="w-4 h-4 mr-2" /> {saving ? "Saving..." : "Save"}</Button>
            <Button variant="outline" size="sm" onClick={cancel}>Cancel</Button>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {services.map((s) => (
            <div key={s.id || s.title} className="bg-surface-raised rounded-xl p-4 border border-border/50 flex items-center gap-4 hover:shadow-sm transition-shadow">
              <GripVertical className="w-4 h-4 text-muted-foreground/30 shrink-0 hidden sm:block" />
              {s.image ? (
                <img src={s.image} alt={s.title} className="w-14 h-10 object-cover rounded-lg border shrink-0" />
              ) : (
                <div className="w-14 h-10 rounded-lg border border-dashed border-border flex items-center justify-center shrink-0"><ImageIcon className="w-4 h-4 text-muted-foreground/30" /></div>
              )}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm text-navy truncate">{s.title}</h3>
                <p className="text-xs text-muted-foreground truncate">{s.shortDesc || s.description}</p>
                {s.benefits.length > 0 && <p className="text-[10px] text-muted-foreground/60 mt-0.5">{s.benefits.length} benefit{s.benefits.length !== 1 ? "s" : ""}</p>}
              </div>
              <div className="flex gap-1.5 shrink-0">
                <Button variant="outline" size="sm" onClick={() => startEdit(s)} className="h-8 px-3"><Pencil className="w-3 h-3 mr-1" /> Edit</Button>
                {s.id && <Button variant="ghost" size="sm" onClick={() => handleDelete(s.id!)} className="h-8 px-2 text-destructive hover:text-destructive"><Trash2 className="w-3.5 h-3.5" /></Button>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminServices;
