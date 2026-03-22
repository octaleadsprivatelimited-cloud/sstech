import { useState, useEffect } from "react";
import { getStats, addStat, updateStat, deleteStat, StatItem } from "@/lib/firestore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Plus, Save, Trash2 } from "lucide-react";

const AdminStats = () => {
  const [stats, setStats] = useState<StatItem[]>([]);
  const [editing, setEditing] = useState<StatItem | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);

  const load = () => getStats().then(setStats).catch(console.error);
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

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading text-2xl font-bold text-navy">Stats</h2>
        {!editing && <Button onClick={startNew} className="bg-electric hover:bg-electric/90 text-white"><Plus className="w-4 h-4 mr-2" /> Add Stat</Button>}
      </div>

      {editing ? (
        <div className="bg-surface-raised rounded-xl p-6 border border-border/50 space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div><label className="text-sm font-medium text-navy block mb-1.5">Value</label><Input type="number" value={editing.end} onChange={(e) => setEditing({ ...editing, end: parseInt(e.target.value) || 0 })} /></div>
            <div><label className="text-sm font-medium text-navy block mb-1.5">Suffix</label><Input value={editing.suffix} onChange={(e) => setEditing({ ...editing, suffix: e.target.value })} /></div>
            <div><label className="text-sm font-medium text-navy block mb-1.5">Order</label><Input type="number" value={editing.order} onChange={(e) => setEditing({ ...editing, order: parseInt(e.target.value) || 0 })} /></div>
          </div>
          <div><label className="text-sm font-medium text-navy block mb-1.5">Label</label><Input value={editing.label} onChange={(e) => setEditing({ ...editing, label: e.target.value })} /></div>
          <div className="flex gap-3">
            <Button onClick={handleSave} disabled={saving} className="bg-electric hover:bg-electric/90 text-white"><Save className="w-4 h-4 mr-2" /> {saving ? "Saving..." : "Save"}</Button>
            <Button variant="outline" onClick={() => { setEditing(null); setIsNew(false); }}>Cancel</Button>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {stats.map((s) => (
            <div key={s.id} className="bg-surface-raised rounded-xl p-4 border border-border/50 flex items-center justify-between">
              <div><span className="font-bold text-navy text-lg">{s.end}{s.suffix}</span><span className="text-sm text-muted-foreground ml-3">{s.label}</span></div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => { setEditing({ ...s }); setIsNew(false); }}>Edit</Button>
                <Button variant="ghost" size="sm" onClick={() => handleDelete(s.id!)} className="text-destructive"><Trash2 className="w-4 h-4" /></Button>
              </div>
            </div>
          ))}
          {stats.length === 0 && <p className="text-sm text-muted-foreground text-center py-8">No stats. Add your first stat.</p>}
        </div>
      )}
    </div>
  );
};

export default AdminStats;
