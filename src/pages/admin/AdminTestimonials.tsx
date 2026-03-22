import { useState, useEffect } from "react";
import { getTestimonials, addTestimonial, updateTestimonial, deleteTestimonial, TestimonialItem } from "@/lib/firestore";
import { defaultTestimonials } from "@/lib/firestore-defaults";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Plus, Save, Trash2, Star, Pencil, Quote } from "lucide-react";

const AdminTestimonials = () => {
  const [items, setItems] = useState<TestimonialItem[]>([]);
  const [editing, setEditing] = useState<TestimonialItem | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const load = () => getTestimonials().then((data) => {
    setItems(data.length > 0 ? data : defaultTestimonials);
  }).catch(console.error).finally(() => setLoaded(true));

  useEffect(() => { load(); }, []);

  const startNew = () => { setEditing({ name: "", company: "", quote: "", rating: 5 } as TestimonialItem); setIsNew(true); };

  const handleSave = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      if (isNew) await addTestimonial(editing);
      else if (editing.id) { const { id, ...rest } = editing; await updateTestimonial(id, rest); }
      toast.success("Saved!"); setEditing(null); setIsNew(false); load();
    } catch { toast.error("Failed"); }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete?")) return;
    try { await deleteTestimonial(id); toast.success("Deleted"); load(); } catch { toast.error("Failed"); }
  };

  if (!loaded) return <div className="flex items-center justify-center py-20"><div className="animate-spin w-6 h-6 border-2 border-electric border-t-transparent rounded-full" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="font-heading text-lg sm:text-xl font-bold text-navy">Testimonials</h2>
          <p className="text-xs text-muted-foreground mt-0.5">{items.length} review{items.length !== 1 ? "s" : ""}</p>
        </div>
        {!editing && <Button onClick={startNew} size="sm" className="bg-electric hover:bg-electric/90 text-white self-start"><Plus className="w-4 h-4 mr-1" /> Add</Button>}
      </div>

      {editing ? (
        <div className="bg-surface-raised rounded-xl border border-border/50 p-5 space-y-4">
          <h3 className="font-heading font-semibold text-sm text-navy">{isNew ? "New Testimonial" : "Edit Testimonial"}</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1.5"><Label>Name</Label><Input value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} /></div>
            <div className="space-y-1.5"><Label>Company</Label><Input value={editing.company} onChange={(e) => setEditing({ ...editing, company: e.target.value })} /></div>
          </div>
          <div className="space-y-1.5"><Label>Quote</Label><Textarea rows={3} value={editing.quote} onChange={(e) => setEditing({ ...editing, quote: e.target.value })} /></div>
          <div className="space-y-1.5">
            <Label>Rating</Label>
            <div className="flex gap-1">{[1,2,3,4,5].map((r) => (
              <button key={r} onClick={() => setEditing({ ...editing, rating: r })} className="p-0.5 hover:scale-110 transition-transform">
                <Star className={`w-6 h-6 ${r <= editing.rating ? "fill-gold text-gold" : "text-border"}`} />
              </button>
            ))}</div>
          </div>
          <div className="flex gap-3">
            <Button onClick={handleSave} disabled={saving} size="sm" className="bg-electric hover:bg-electric/90 text-white"><Save className="w-4 h-4 mr-2" /> {saving ? "Saving..." : "Save"}</Button>
            <Button variant="outline" size="sm" onClick={() => { setEditing(null); setIsNew(false); }}>Cancel</Button>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((t) => (
            <div key={t.id || t.name} className="bg-surface-raised rounded-xl p-3 sm:p-4 border border-border/50 hover:shadow-sm transition-shadow">
              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-full bg-electric/10 flex items-center justify-center shrink-0">
                  <Quote className="w-3.5 h-3.5 text-electric" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-1 mb-1">
                    <span className="font-semibold text-xs sm:text-sm text-navy">{t.name}</span>
                    <span className="text-[10px] sm:text-xs text-muted-foreground">— {t.company}</span>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">"{t.quote}"</p>
                  <div className="flex gap-0.5 mt-1.5">{Array.from({ length: t.rating }).map((_, i) => <Star key={i} className="w-3 h-3 fill-gold text-gold" />)}</div>
                </div>
                <div className="flex gap-1 shrink-0">
                  <Button variant="outline" size="sm" onClick={() => { setEditing({ ...t }); setIsNew(false); }} className="h-7 px-2"><Pencil className="w-3 h-3" /></Button>
                  {t.id && <Button variant="ghost" size="sm" onClick={() => handleDelete(t.id!)} className="h-7 px-1.5 text-destructive hover:text-destructive"><Trash2 className="w-3 h-3" /></Button>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminTestimonials;
