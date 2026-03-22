import { useState, useEffect } from "react";
import { getContactInfo, saveContactInfo, getContactSubmissions, ContactInfo, ContactSubmission } from "@/lib/firestore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Save, Mail, MessageSquare } from "lucide-react";

const defaultContact: ContactInfo = { email: "info@sthanusetu.com", phone: "+91 76758 43214", address: "Hyderabad, Telangana, India", whatsapp: "917675843214", linkedin: "", twitter: "", github: "" };

const AdminContact = () => {
  const [data, setData] = useState<ContactInfo>(defaultContact);
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [saving, setSaving] = useState(false);
  const [tab, setTab] = useState<"info" | "submissions">("info");

  useEffect(() => {
    getContactInfo().then((d) => d && setData(d));
    getContactSubmissions().then(setSubmissions);
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try { await saveContactInfo(data); toast.success("Saved!"); }
    catch { toast.error("Failed"); }
    setSaving(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading text-2xl font-bold text-navy">Contact</h2>
      </div>

      <div className="flex gap-2 mb-6">
        <Button variant={tab === "info" ? "default" : "outline"} size="sm" onClick={() => setTab("info")} className={tab === "info" ? "bg-electric text-white" : ""}>
          <Mail className="w-4 h-4 mr-1" /> Contact Info
        </Button>
        <Button variant={tab === "submissions" ? "default" : "outline"} size="sm" onClick={() => setTab("submissions")} className={tab === "submissions" ? "bg-electric text-white" : ""}>
          <MessageSquare className="w-4 h-4 mr-1" /> Submissions ({submissions.length})
        </Button>
      </div>

      {tab === "info" && (
        <div className="bg-surface-raised rounded-xl p-6 border border-border/50 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className="text-sm font-medium text-navy block mb-1.5">Email</label><Input value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} /></div>
            <div><label className="text-sm font-medium text-navy block mb-1.5">Phone</label><Input value={data.phone} onChange={(e) => setData({ ...data, phone: e.target.value })} /></div>
          </div>
          <div><label className="text-sm font-medium text-navy block mb-1.5">Address</label><Input value={data.address} onChange={(e) => setData({ ...data, address: e.target.value })} /></div>
          <div><label className="text-sm font-medium text-navy block mb-1.5">WhatsApp Number (with country code, no +)</label><Input value={data.whatsapp} onChange={(e) => setData({ ...data, whatsapp: e.target.value })} /></div>
          <div className="grid sm:grid-cols-3 gap-4">
            <div><label className="text-sm font-medium text-navy block mb-1.5">LinkedIn URL</label><Input value={data.linkedin} onChange={(e) => setData({ ...data, linkedin: e.target.value })} /></div>
            <div><label className="text-sm font-medium text-navy block mb-1.5">Twitter URL</label><Input value={data.twitter} onChange={(e) => setData({ ...data, twitter: e.target.value })} /></div>
            <div><label className="text-sm font-medium text-navy block mb-1.5">GitHub URL</label><Input value={data.github} onChange={(e) => setData({ ...data, github: e.target.value })} /></div>
          </div>
          <Button onClick={handleSave} disabled={saving} className="bg-electric hover:bg-electric/90 text-white"><Save className="w-4 h-4 mr-2" /> {saving ? "Saving..." : "Save"}</Button>
        </div>
      )}

      {tab === "submissions" && (
        <div className="space-y-3">
          {submissions.map((s) => (
            <div key={s.id} className="bg-surface-raised rounded-xl p-4 border border-border/50">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-semibold text-sm text-navy">{s.name}</h3>
                <span className="text-xs text-muted-foreground">{s.email}</span>
              </div>
              {s.phone && <p className="text-xs text-muted-foreground">{s.phone}</p>}
              <p className="text-xs text-muted-foreground mt-1 border-t pt-1">{s.message}</p>
            </div>
          ))}
          {submissions.length === 0 && <p className="text-sm text-muted-foreground text-center py-8">No submissions yet.</p>}
        </div>
      )}
    </div>
  );
};

export default AdminContact;
