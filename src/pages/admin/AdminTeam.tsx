import { useState, useEffect } from "react";
import { getTeam, addTeamMember, updateTeamMember, deleteTeamMember, uploadImage, TeamMember } from "@/lib/firestore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Plus, Save, Trash2, Upload } from "lucide-react";

const AdminTeam = () => {
  const [team, setTeamList] = useState<TeamMember[]>([]);
  const [editing, setEditing] = useState<TeamMember | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);

  const load = () => getTeam().then(setTeamList).catch(console.error);
  useEffect(() => { load(); }, []);

  const startNew = () => { setEditing({ name: "", role: "", image: "", order: team.length } as TeamMember); setIsNew(true); };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editing) return;
    try { const url = await uploadImage(file, "team"); setEditing({ ...editing, image: url }); toast.success("Uploaded"); }
    catch { toast.error("Failed"); }
  };

  const handleSave = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      if (isNew) await addTeamMember(editing);
      else if (editing.id) { const { id, ...rest } = editing; await updateTeamMember(id, rest); }
      toast.success("Saved!"); setEditing(null); setIsNew(false); load();
    } catch { toast.error("Failed"); }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete?")) return;
    try { await deleteTeamMember(id); toast.success("Deleted"); load(); } catch { toast.error("Failed"); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading text-2xl font-bold text-navy">Team Members</h2>
        {!editing && <Button onClick={startNew} className="bg-electric hover:bg-electric/90 text-white"><Plus className="w-4 h-4 mr-2" /> Add</Button>}
      </div>

      {editing ? (
        <div className="bg-surface-raised rounded-xl p-6 border border-border/50 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className="text-sm font-medium text-navy block mb-1.5">Name</label><Input value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} /></div>
            <div><label className="text-sm font-medium text-navy block mb-1.5">Role</label><Input value={editing.role} onChange={(e) => setEditing({ ...editing, role: e.target.value })} /></div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className="text-sm font-medium text-navy block mb-1.5">Order</label><Input type="number" value={editing.order} onChange={(e) => setEditing({ ...editing, order: parseInt(e.target.value) || 0 })} /></div>
            <div>
              <label className="text-sm font-medium text-navy block mb-1.5">Photo</label>
              <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-secondary rounded-lg text-sm font-medium hover:bg-secondary/80">
                <Upload className="w-4 h-4" /> Upload
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>
              {editing.image && <img src={editing.image} alt="Preview" className="w-14 h-14 object-cover rounded-full border mt-2" />}
            </div>
          </div>
          <div className="flex gap-3">
            <Button onClick={handleSave} disabled={saving} className="bg-electric hover:bg-electric/90 text-white"><Save className="w-4 h-4 mr-2" /> {saving ? "Saving..." : "Save"}</Button>
            <Button variant="outline" onClick={() => { setEditing(null); setIsNew(false); }}>Cancel</Button>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {team.map((m) => (
            <div key={m.id} className="bg-surface-raised rounded-xl p-4 border border-border/50 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-electric/10 flex items-center justify-center font-heading font-bold text-sm text-electric overflow-hidden">
                {m.image ? <img src={m.image} className="w-full h-full object-cover" /> : m.name.split(" ").map(n => n[0]).join("")}
              </div>
              <div className="flex-1"><h3 className="font-semibold text-sm text-navy">{m.name}</h3><p className="text-xs text-muted-foreground">{m.role}</p></div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => { setEditing({ ...m }); setIsNew(false); }}>Edit</Button>
                <Button variant="ghost" size="sm" onClick={() => handleDelete(m.id!)} className="text-destructive"><Trash2 className="w-4 h-4" /></Button>
              </div>
            </div>
          ))}
          {team.length === 0 && <p className="text-sm text-muted-foreground text-center py-8">No team members yet.</p>}
        </div>
      )}
    </div>
  );
};

export default AdminTeam;
