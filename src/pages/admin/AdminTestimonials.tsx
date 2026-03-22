import { useState, useEffect } from "react";
import { getTestimonials, addTestimonial, updateTestimonial, deleteTestimonial, TestimonialItem } from "@/lib/firestore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Plus, Save, Trash2, Star } from "lucide-react";

const AdminTestimonials = () => {
  const [items, setItems] = useState<TestimonialItem[]>([]);
  const [editing, setEditing] = useState<TestimonialItem | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);

  const load = () => getTestimonials().then(setItems).catch(console.error);
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

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading text-2xl font-bold text-navy">Testimonials</h2>
        {!editing && <Button onClick={startNew} className="bg-electric hover:bg-electric/90 text-white"><Plus className="w-4 h-4 mr-2" /> Add</Button>}
      </div>

      {editing ? (
        <div className="bg-surface-raised rounded-xl p-6 border border-border/50 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className="text-sm font-medium text-navy block mb-1.5">Name</label><Input value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} /></div>
            <div><label className="text-sm font-medium text-navy block mb-1.5">Company</label><Input value={editing.company} onChange={(e) => setEditing({ ...editing, company: e.target.value })} /></div>
          </div>
          <div><label className="text-sm font-medium text-navy block mb-1.5">Quote</label><Textarea rows={3} value={editing.quote} onChange={(e) => setEditing({ ...editing, quote: e.target.value })} /></div>
          <div>
            <label className="text-sm font-medium text-navy block mb-1.5">Rating</label>
            <div className="flex gap-1">{[1,2,3,4,5].map((r) => (
              <button key={r} onClick={() => setEditing({ ...editing, rating: r })}><Star className={`w-6 h-6 ${r <= editing.rating ? "fill-gold text-gold" : "text-border"}`} /></button>
            ))}</div>
          </div>
          <div className="flex gap-3">
            <Button onClick={handleSave} disabled={saving} className="bg-electric hover:bg-electric/90 text-white"><Save className="w-4 h-4 mr-2" /> {saving ? "Saving..." : "Save"}</Button>
            <Button variant="outline" onClick={() => { setEditing(null); setIsNew(false); }}>Cancel</Button>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((t) => (
            <div key={t.id} className="bg-surface-raised rounded-xl p-4 border border-border/50 flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-sm text-navy">{t.name}</span>
                  <span className="text-xs text-muted-foreground">— {t.company}</span>
                </div>
                <p className="text-xs text-muted-foreground truncate">"{t.quote}"</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <Button variant="outline" size="sm" onClick={() => { setEditing({ ...t }); setIsNew(false); }}>Edit</Button>
                <Button variant="ghost" size="sm" onClick={() => handleDelete(t.id!)} className="text-destructive"><Trash2 className="w-4 h-4" /></Button>
              </div>
            </div>
          ))}
          {items.length === 0 && <p className="text-sm text-muted-foreground text-center py-8">No testimonials yet.</p>}
        </div>
      )}
    </div>
  );
};

export default AdminTestimonials;
