import { useState, useEffect } from "react";
import { getStats, addStat, updateStat, deleteStat, StatItem } from "@/lib/firestore";
import { defaultStats } from "@/lib/firestore-defaults";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Plus, Save, Trash2, Pencil } from "lucide-react";

const AdminStats = () => {
  const [stats, setStats] = useState<StatItem[]>([]);
  const [editing, setEditing] = useState<StatItem | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const load = () => getStats().then((data) => {
    setStats(data.length > 0 ? data : defaultStats);
  }).catch(console.error).finally(() => setLoaded(true));

  useEffect(() => { load(); }, []);

  const startNew = () => { setEditing({ end: 0, suffix: "+", label: "", order: stats.length } as StatItem); setIsNew(true); };

  const handleSave = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      if (isNew) await addStat(editing);
      else if (editing.id) { const { id, ...rest } = editing; await updateStat(id, rest); }
      toast.success("Saved!"); setEditing(null); setIsNew(false); load();
    } catch { toast.error("Failed"); }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete?")) return;
    try { await deleteStat(id); toast.success("Deleted"); load(); } catch { toast.error("Failed"); }
  };

  if (!loaded) return <div className="flex items-center justify-center py-20"><div className="animate-spin w-6 h-6 border-2 border-electric border-t-transparent rounded-full" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="font-heading text-lg sm:text-xl font-bold text-navy">Statistics</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Counter bar on homepage</p>
        </div>
        {!editing && <Button onClick={startNew} size="sm" className="bg-electric hover:bg-electric/90 text-white self-start"><Plus className="w-4 h-4 mr-1" /> Add</Button>}
      </div>

      {/* Preview */}
      <div className="bg-electric rounded-xl p-4 grid grid-cols-4 gap-3">
        {stats.map((s) => (
          <div key={s.id || s.label} className="text-center">
            <p className="text-lg sm:text-2xl font-bold text-white font-heading">{s.end}{s.suffix}</p>
            <p className="text-[10px] sm:text-xs text-white/70">{s.label}</p>
          </div>
        ))}
      </div>

      {editing ? (
        <div className="bg-surface-raised rounded-xl border border-border/50 p-5 space-y-4">
          <h3 className="font-heading font-semibold text-sm text-navy">{isNew ? "New Stat" : "Edit Stat"}</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1.5"><Label>Value</Label><Input type="number" value={editing.end} onChange={(e) => setEditing({ ...editing, end: parseInt(e.target.value) || 0 })} /></div>
            <div className="space-y-1.5"><Label>Suffix</Label><Input value={editing.suffix} onChange={(e) => setEditing({ ...editing, suffix: e.target.value })} placeholder="+ or %" /></div>
            <div className="space-y-1.5"><Label>Order</Label><Input type="number" value={editing.order} onChange={(e) => setEditing({ ...editing, order: parseInt(e.target.value) || 0 })} /></div>
          </div>
          <div className="space-y-1.5"><Label>Label</Label><Input value={editing.label} onChange={(e) => setEditing({ ...editing, label: e.target.value })} placeholder="e.g. Projects Delivered" /></div>
          <div className="flex gap-3">
            <Button onClick={handleSave} disabled={saving} size="sm" className="bg-electric hover:bg-electric/90 text-white"><Save className="w-4 h-4 mr-2" /> {saving ? "Saving..." : "Save"}</Button>
            <Button variant="outline" size="sm" onClick={() => { setEditing(null); setIsNew(false); }}>Cancel</Button>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {stats.map((s) => (
            <div key={s.id || s.label} className="bg-surface-raised rounded-xl p-4 border border-border/50 flex items-center justify-between hover:shadow-sm transition-shadow">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-electric/10 flex items-center justify-center">
                  <span className="font-bold text-electric font-heading text-sm">{s.end}{s.suffix}</span>
                </div>
                <span className="text-sm text-navy font-medium">{s.label}</span>
              </div>
              <div className="flex gap-1.5">
                <Button variant="outline" size="sm" onClick={() => { setEditing({ ...s }); setIsNew(false); }} className="h-8 px-3"><Pencil className="w-3 h-3 mr-1" /> Edit</Button>
                {s.id && <Button variant="ghost" size="sm" onClick={() => handleDelete(s.id!)} className="h-8 px-2 text-destructive hover:text-destructive"><Trash2 className="w-3.5 h-3.5" /></Button>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminStats;
