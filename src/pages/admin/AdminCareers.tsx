import { useState, useEffect } from "react";
import { getJobs, addJob, updateJob, deleteJob, getCareerApplications, JobItem, CareerApplication } from "@/lib/firestore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Plus, Save, Trash2, Briefcase, Users } from "lucide-react";

const AdminCareers = () => {
  const [jobs, setJobsList] = useState<JobItem[]>([]);
  const [applications, setApplications] = useState<CareerApplication[]>([]);
  const [editing, setEditing] = useState<JobItem | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [tab, setTab] = useState<"jobs" | "applications">("jobs");

  const loadJobs = () => getJobs().then(setJobsList).catch(console.error);
  const loadApps = () => getCareerApplications().then(setApplications).catch(console.error);
  useEffect(() => { loadJobs(); loadApps(); }, []);

  const startNew = () => { setEditing({ title: "", type: "Full-time", location: "", active: true } as JobItem); setIsNew(true); };

  const handleSave = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      if (isNew) await addJob(editing);
      else if (editing.id) { const { id, ...rest } = editing; await updateJob(id, rest); }
      toast.success("Saved!"); setEditing(null); setIsNew(false); loadJobs();
    } catch { toast.error("Failed"); }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete?")) return;
    try { await deleteJob(id); toast.success("Deleted"); loadJobs(); } catch { toast.error("Failed"); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading text-2xl font-bold text-navy">Careers</h2>
      </div>

      <div className="flex gap-2 mb-6">
        <Button variant={tab === "jobs" ? "default" : "outline"} size="sm" onClick={() => setTab("jobs")} className={tab === "jobs" ? "bg-electric text-white" : ""}>
          <Briefcase className="w-4 h-4 mr-1" /> Jobs ({jobs.length})
        </Button>
        <Button variant={tab === "applications" ? "default" : "outline"} size="sm" onClick={() => setTab("applications")} className={tab === "applications" ? "bg-electric text-white" : ""}>
          <Users className="w-4 h-4 mr-1" /> Applications ({applications.length})
        </Button>
      </div>

      {tab === "jobs" && (
        <>
          {!editing && <Button onClick={startNew} className="bg-electric hover:bg-electric/90 text-white mb-4"><Plus className="w-4 h-4 mr-2" /> Add Job</Button>}
          {editing ? (
            <div className="bg-surface-raised rounded-xl p-6 border border-border/50 space-y-4">
              <div><label className="text-sm font-medium text-navy block mb-1.5">Title</label><Input value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} /></div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div><label className="text-sm font-medium text-navy block mb-1.5">Type</label><Input value={editing.type} onChange={(e) => setEditing({ ...editing, type: e.target.value })} /></div>
                <div><label className="text-sm font-medium text-navy block mb-1.5">Location</label><Input value={editing.location} onChange={(e) => setEditing({ ...editing, location: e.target.value })} /></div>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" checked={editing.active} onChange={(e) => setEditing({ ...editing, active: e.target.checked })} className="w-4 h-4" />
                <span className="text-sm font-medium text-navy">Active</span>
              </div>
              <div className="flex gap-3">
                <Button onClick={handleSave} disabled={saving} className="bg-electric hover:bg-electric/90 text-white"><Save className="w-4 h-4 mr-2" /> {saving ? "Saving..." : "Save"}</Button>
                <Button variant="outline" onClick={() => { setEditing(null); setIsNew(false); }}>Cancel</Button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {jobs.map((j) => (
                <div key={j.id} className="bg-surface-raised rounded-xl p-4 border border-border/50 flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-sm text-navy">{j.title}</h3>
                    <p className="text-xs text-muted-foreground">{j.type} · {j.location} {!j.active && <span className="text-destructive ml-2">(Inactive)</span>}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => { setEditing({ ...j }); setIsNew(false); }}>Edit</Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(j.id!)} className="text-destructive"><Trash2 className="w-4 h-4" /></Button>
                  </div>
                </div>
              ))}
              {jobs.length === 0 && <p className="text-sm text-muted-foreground text-center py-8">No jobs posted yet.</p>}
            </div>
          )}
        </>
      )}

      {tab === "applications" && (
        <div className="space-y-3">
          {applications.map((a) => (
            <div key={a.id} className="bg-surface-raised rounded-xl p-4 border border-border/50">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-sm text-navy">{a.name}</h3>
                <span className="text-xs text-muted-foreground">{a.role}</span>
              </div>
              <p className="text-xs text-muted-foreground">{a.email}</p>
              {a.message && <p className="text-xs text-muted-foreground mt-1 border-t pt-1">{a.message}</p>}
            </div>
          ))}
          {applications.length === 0 && <p className="text-sm text-muted-foreground text-center py-8">No applications received yet.</p>}
        </div>
      )}
    </div>
  );
};

export default AdminCareers;
