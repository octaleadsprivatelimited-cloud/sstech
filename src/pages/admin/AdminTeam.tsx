import { useState, useEffect } from "react";
import { getTeam, addTeamMember, updateTeamMember, deleteTeamMember, uploadImage, TeamMember } from "@/lib/firestore";
import { defaultTeam } from "@/lib/firestore-defaults";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Plus, Save, Trash2, Upload, Pencil } from "lucide-react";

const AdminTeam = () => {
  const [team, setTeamList] = useState<TeamMember[]>([]);
  const [editing, setEditing] = useState<TeamMember | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const load = () => getTeam().then((data) => {
    setTeamList(data.length > 0 ? data : defaultTeam);
  }).catch(console.error).finally(() => setLoaded(true));

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

  if (!loaded) return <div className="flex items-center justify-center py-20"><div className="animate-spin w-6 h-6 border-2 border-electric border-t-transparent rounded-full" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-xl font-bold text-navy">Team Members</h2>
          <p className="text-sm text-muted-foreground mt-0.5">{team.length} member{team.length !== 1 ? "s" : ""}</p>
        </div>
        {!editing && <Button onClick={startNew} size="sm" className="bg-electric hover:bg-electric/90 text-white"><Plus className="w-4 h-4 mr-2" /> Add Member</Button>}
      </div>

      {editing ? (
        <div className="bg-surface-raised rounded-xl border border-border/50 p-5 space-y-4">
          <h3 className="font-heading font-semibold text-sm text-navy">{isNew ? "New Member" : "Edit Member"}</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1.5"><Label>Name</Label><Input value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} /></div>
            <div className="space-y-1.5"><Label>Role</Label><Input value={editing.role} onChange={(e) => setEditing({ ...editing, role: e.target.value })} /></div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1.5"><Label>Order</Label><Input type="number" value={editing.order} onChange={(e) => setEditing({ ...editing, order: parseInt(e.target.value) || 0 })} /></div>
            <div className="space-y-1.5">
              <Label>Photo</Label>
              <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 bg-secondary rounded-lg text-sm font-medium hover:bg-secondary/80 border border-border/50">
                <Upload className="w-4 h-4" /> Upload Photo
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>
              {editing.image && <img src={editing.image} alt="Preview" className="w-14 h-14 object-cover rounded-full border mt-2" />}
            </div>
          </div>
          <div className="flex gap-3">
            <Button onClick={handleSave} disabled={saving} size="sm" className="bg-electric hover:bg-electric/90 text-white"><Save className="w-4 h-4 mr-2" /> {saving ? "Saving..." : "Save"}</Button>
            <Button variant="outline" size="sm" onClick={() => { setEditing(null); setIsNew(false); }}>Cancel</Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {team.map((m) => (
            <div key={m.id || m.name} className="bg-surface-raised rounded-xl p-5 border border-border/50 text-center hover:shadow-sm transition-shadow group">
              <div className="w-16 h-16 rounded-full bg-electric/10 flex items-center justify-center mx-auto mb-3 font-heading font-bold text-lg text-electric overflow-hidden">
                {m.image ? <img src={m.image} className="w-full h-full object-cover" alt={m.name} /> : m.name.split(" ").map(n => n[0]).join("")}
              </div>
              <h3 className="font-semibold text-sm text-navy">{m.name}</h3>
              <p className="text-xs text-muted-foreground mt-0.5">{m.role}</p>
              <div className="flex gap-1.5 justify-center mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="outline" size="sm" onClick={() => { setEditing({ ...m }); setIsNew(false); }} className="h-7 px-2 text-xs"><Pencil className="w-3 h-3" /></Button>
                {m.id && <Button variant="ghost" size="sm" onClick={() => handleDelete(m.id!)} className="h-7 px-2 text-xs text-destructive"><Trash2 className="w-3 h-3" /></Button>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminTeam;
