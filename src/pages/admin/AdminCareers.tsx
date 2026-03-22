import { useState, useEffect } from "react";
import { getJobs, addJob, updateJob, deleteJob, getCareerApplications, JobItem, CareerApplication } from "@/lib/firestore";
import { defaultJobs } from "@/lib/firestore-defaults";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Plus, Save, Trash2, Briefcase, Users, Pencil, MapPin, Clock, CircleCheck, CircleX } from "lucide-react";

const AdminCareers = () => {
  const [jobs, setJobsList] = useState<JobItem[]>([]);
  const [applications, setApplications] = useState<CareerApplication[]>([]);
  const [editing, setEditing] = useState<JobItem | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [tab, setTab] = useState<"jobs" | "applications">("jobs");
  const [loaded, setLoaded] = useState(false);

  const loadJobs = () => getJobs().then((data) => {
    setJobsList(data.length > 0 ? data : defaultJobs);
  }).catch(console.error);
  const loadApps = () => getCareerApplications().then(setApplications).catch(console.error);
  useEffect(() => { Promise.all([loadJobs(), loadApps()]).finally(() => setLoaded(true)); }, []);

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

  if (!loaded) return <div className="flex items-center justify-center py-20"><div className="animate-spin w-6 h-6 border-2 border-electric border-t-transparent rounded-full" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-xl font-bold text-navy">Careers</h2>
          <p className="text-sm text-muted-foreground mt-0.5">{jobs.length} job{jobs.length !== 1 ? "s" : ""} · {applications.length} application{applications.length !== 1 ? "s" : ""}</p>
        </div>
      </div>

      <div className="flex gap-2">
        <Button variant={tab === "jobs" ? "default" : "outline"} size="sm" onClick={() => setTab("jobs")} className={tab === "jobs" ? "bg-electric text-white" : ""}>
          <Briefcase className="w-4 h-4 mr-1.5" /> Jobs ({jobs.length})
        </Button>
        <Button variant={tab === "applications" ? "default" : "outline"} size="sm" onClick={() => setTab("applications")} className={tab === "applications" ? "bg-electric text-white" : ""}>
          <Users className="w-4 h-4 mr-1.5" /> Applications ({applications.length})
        </Button>
      </div>

      {tab === "jobs" && (
        <>
          {!editing && <div className="flex justify-end"><Button onClick={startNew} size="sm" className="bg-electric hover:bg-electric/90 text-white"><Plus className="w-4 h-4 mr-2" /> Add Job</Button></div>}
          {editing ? (
            <div className="bg-surface-raised rounded-xl border border-border/50 p-5 space-y-4">
              <h3 className="font-heading font-semibold text-sm text-navy">{isNew ? "New Job" : "Edit Job"}</h3>
              <div className="space-y-1.5"><Label>Title</Label><Input value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} placeholder="e.g. Senior React Developer" /></div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5"><Label>Type</Label><Input value={editing.type} onChange={(e) => setEditing({ ...editing, type: e.target.value })} placeholder="Full-time / Contract" /></div>
                <div className="space-y-1.5"><Label>Location</Label><Input value={editing.location} onChange={(e) => setEditing({ ...editing, location: e.target.value })} placeholder="Hyderabad / Remote" /></div>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="active" checked={editing.active} onChange={(e) => setEditing({ ...editing, active: e.target.checked })} className="w-4 h-4 rounded" />
                <Label htmlFor="active">Active (visible on website)</Label>
              </div>
              <div className="flex gap-3">
                <Button onClick={handleSave} disabled={saving} size="sm" className="bg-electric hover:bg-electric/90 text-white"><Save className="w-4 h-4 mr-2" /> {saving ? "Saving..." : "Save"}</Button>
                <Button variant="outline" size="sm" onClick={() => { setEditing(null); setIsNew(false); }}>Cancel</Button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {jobs.map((j) => (
                <div key={j.id || j.title} className="bg-surface-raised rounded-xl p-4 border border-border/50 flex items-center justify-between hover:shadow-sm transition-shadow">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-electric/10 flex items-center justify-center shrink-0"><Briefcase className="w-4 h-4 text-electric" /></div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-sm text-navy">{j.title}</h3>
                        {j.active ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-medium text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full"><CircleCheck className="w-2.5 h-2.5" /> Active</span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[10px] font-medium text-destructive bg-destructive/10 px-1.5 py-0.5 rounded-full"><CircleX className="w-2.5 h-2.5" /> Inactive</span>
                        )}
                      </div>
                      <div className="flex gap-3 mt-0.5 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{j.type}</span>
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{j.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-1.5">
                    <Button variant="outline" size="sm" onClick={() => { setEditing({ ...j }); setIsNew(false); }} className="h-8 px-3"><Pencil className="w-3 h-3 mr-1" /> Edit</Button>
                    {j.id && <Button variant="ghost" size="sm" onClick={() => handleDelete(j.id!)} className="h-8 px-2 text-destructive hover:text-destructive"><Trash2 className="w-3.5 h-3.5" /></Button>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {tab === "applications" && (
        <div className="space-y-3">
          {applications.map((a) => (
            <div key={a.id} className="bg-surface-raised rounded-xl p-4 border border-border/50">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-violet-500/10 flex items-center justify-center text-xs font-bold text-violet-600">{a.name.split(" ").map(n => n[0]).join("")}</div>
                  <div>
                    <h3 className="font-semibold text-sm text-navy">{a.name}</h3>
                    <p className="text-xs text-muted-foreground">{a.email}</p>
                  </div>
                </div>
                <span className="text-xs font-medium text-electric bg-electric/10 px-2 py-1 rounded-md">{a.role}</span>
              </div>
              {a.message && <p className="text-xs text-muted-foreground mt-2 pt-2 border-t border-border/50">{a.message}</p>}
            </div>
          ))}
          {applications.length === 0 && <div className="text-center py-12 bg-surface-raised rounded-xl border border-border/50"><Users className="w-8 h-8 text-muted-foreground/30 mx-auto mb-2" /><p className="text-sm text-muted-foreground">No applications received yet</p></div>}
        </div>
      )}
    </div>
  );
};

export default AdminCareers;
