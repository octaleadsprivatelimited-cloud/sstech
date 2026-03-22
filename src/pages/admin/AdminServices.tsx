import { useState, useEffect } from "react";
import { getServices, addService, updateService, deleteService, uploadImage, ServiceItem } from "@/lib/firestore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Plus, Save, Trash2, Upload, X } from "lucide-react";

const emptyService: Omit<ServiceItem, "id"> = { title: "", shortDesc: "", description: "", benefits: [""], image: "", order: 0 };

const AdminServices = () => {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [editing, setEditing] = useState<ServiceItem | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);

  const load = () => getServices().then(setServices).catch(console.error);
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
      cancel();
      load();
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

  const addBenefit = () => {
    if (!editing) return;
    setEditing({ ...editing, benefits: [...editing.benefits, ""] });
  };

  const removeBenefit = (index: number) => {
    if (!editing) return;
    setEditing({ ...editing, benefits: editing.benefits.filter((_, i) => i !== index) });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading text-2xl font-bold text-navy">Services</h2>
        {!editing && <Button onClick={startNew} className="bg-electric hover:bg-electric/90 text-white"><Plus className="w-4 h-4 mr-2" /> Add Service</Button>}
      </div>

      {editing ? (
        <div className="bg-surface-raised rounded-xl p-6 border border-border/50 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-navy block mb-1.5">Title</label>
              <Input value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} />
            </div>
            <div>
              <label className="text-sm font-medium text-navy block mb-1.5">Short Description</label>
              <Input value={editing.shortDesc} onChange={(e) => setEditing({ ...editing, shortDesc: e.target.value })} />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-navy block mb-1.5">Full Description</label>
            <Textarea rows={3} value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} />
          </div>
          <div>
            <label className="text-sm font-medium text-navy block mb-1.5">Benefits</label>
            {editing.benefits.map((b, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <Input value={b} onChange={(e) => updateBenefit(i, e.target.value)} placeholder={`Benefit ${i + 1}`} />
                <Button variant="ghost" size="sm" onClick={() => removeBenefit(i)}><X className="w-4 h-4" /></Button>
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={addBenefit}><Plus className="w-3 h-3 mr-1" /> Add Benefit</Button>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-navy block mb-1.5">Order</label>
              <Input type="number" value={editing.order} onChange={(e) => setEditing({ ...editing, order: parseInt(e.target.value) || 0 })} />
            </div>
            <div>
              <label className="text-sm font-medium text-navy block mb-1.5">Image</label>
              <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-secondary rounded-lg text-sm font-medium hover:bg-secondary/80">
                <Upload className="w-4 h-4" /> Upload
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>
              {editing.image && <img src={editing.image} alt="Preview" className="w-20 h-14 object-cover rounded-lg border mt-2" />}
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <Button onClick={handleSave} disabled={saving} className="bg-electric hover:bg-electric/90 text-white"><Save className="w-4 h-4 mr-2" /> {saving ? "Saving..." : "Save"}</Button>
            <Button variant="outline" onClick={cancel}>Cancel</Button>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {services.map((s) => (
            <div key={s.id} className="bg-surface-raised rounded-xl p-4 border border-border/50 flex items-center gap-4">
              {s.image && <img src={s.image} alt={s.title} className="w-16 h-12 object-cover rounded-lg border" />}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm text-navy truncate">{s.title}</h3>
                <p className="text-xs text-muted-foreground truncate">{s.shortDesc}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <Button variant="outline" size="sm" onClick={() => startEdit(s)}>Edit</Button>
                <Button variant="ghost" size="sm" onClick={() => handleDelete(s.id!)} className="text-destructive"><Trash2 className="w-4 h-4" /></Button>
              </div>
            </div>
          ))}
          {services.length === 0 && <p className="text-sm text-muted-foreground text-center py-8">No services yet. Add your first service.</p>}
        </div>
      )}
    </div>
  );
};

export default AdminServices;
