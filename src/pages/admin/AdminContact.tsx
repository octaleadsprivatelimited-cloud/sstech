import { useState, useEffect } from "react";
import { getContactInfo, saveContactInfo, getContactSubmissions, ContactInfo, ContactSubmission } from "@/lib/firestore";
import { defaultContact } from "@/lib/firestore-defaults";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Save, Mail, MessageSquare, Phone, MapPin } from "lucide-react";

const AdminContact = () => {
  const [data, setData] = useState<ContactInfo>(defaultContact);
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [saving, setSaving] = useState(false);
  const [tab, setTab] = useState<"info" | "submissions">("info");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    Promise.all([
      getContactInfo().then((d) => d && setData(d)),
      getContactSubmissions().then(setSubmissions),
    ]).finally(() => setLoaded(true));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try { await saveContactInfo(data); toast.success("Saved!"); }
    catch { toast.error("Failed"); }
    setSaving(false);
  };

  if (!loaded) return <div className="flex items-center justify-center py-20"><div className="animate-spin w-6 h-6 border-2 border-electric border-t-transparent rounded-full" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-xl font-bold text-navy">Contact</h2>
          <p className="text-sm text-muted-foreground mt-0.5">Contact info & form submissions</p>
        </div>
      </div>

      <div className="flex gap-2">
        <Button variant={tab === "info" ? "default" : "outline"} size="sm" onClick={() => setTab("info")} className={tab === "info" ? "bg-electric text-white" : ""}>
          <Mail className="w-4 h-4 mr-1.5" /> Contact Info
        </Button>
        <Button variant={tab === "submissions" ? "default" : "outline"} size="sm" onClick={() => setTab("submissions")} className={tab === "submissions" ? "bg-electric text-white" : ""}>
          <MessageSquare className="w-4 h-4 mr-1.5" /> Messages ({submissions.length})
        </Button>
      </div>

      {tab === "info" && (
        <div className="bg-surface-raised rounded-xl border border-border/50 divide-y divide-border/50">
          <div className="p-5 space-y-4">
            <h3 className="font-heading font-semibold text-sm text-navy">Primary Contact</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5"><Label>Email</Label><Input value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} /></div>
              <div className="space-y-1.5"><Label>Phone</Label><Input value={data.phone} onChange={(e) => setData({ ...data, phone: e.target.value })} /></div>
            </div>
            <div className="space-y-1.5"><Label>Address</Label><Input value={data.address} onChange={(e) => setData({ ...data, address: e.target.value })} /></div>
            <div className="space-y-1.5"><Label>WhatsApp (with country code, no +)</Label><Input value={data.whatsapp} onChange={(e) => setData({ ...data, whatsapp: e.target.value })} placeholder="917675843214" /></div>
          </div>
          <div className="p-5 space-y-4">
            <h3 className="font-heading font-semibold text-sm text-navy">Social Links</h3>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="space-y-1.5"><Label>LinkedIn URL</Label><Input value={data.linkedin} onChange={(e) => setData({ ...data, linkedin: e.target.value })} /></div>
              <div className="space-y-1.5"><Label>Twitter URL</Label><Input value={data.twitter} onChange={(e) => setData({ ...data, twitter: e.target.value })} /></div>
              <div className="space-y-1.5"><Label>GitHub URL</Label><Input value={data.github} onChange={(e) => setData({ ...data, github: e.target.value })} /></div>
            </div>
          </div>
          <div className="p-5">
            <Button onClick={handleSave} disabled={saving} size="sm" className="bg-electric hover:bg-electric/90 text-white"><Save className="w-4 h-4 mr-2" /> {saving ? "Saving..." : "Save Changes"}</Button>
          </div>
        </div>
      )}

      {tab === "submissions" && (
        <div className="space-y-3">
          {submissions.map((s) => (
            <div key={s.id} className="bg-surface-raised rounded-xl p-4 border border-border/50">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center text-xs font-bold text-orange-600">{s.name.split(" ").map(n => n[0]).join("")}</div>
                  <div>
                    <h3 className="font-semibold text-sm text-navy">{s.name}</h3>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{s.email}</span>
                      {s.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{s.phone}</span>}
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-2 pt-2 border-t border-border/50">{s.message}</p>
            </div>
          ))}
          {submissions.length === 0 && <div className="text-center py-12 bg-surface-raised rounded-xl border border-border/50"><MessageSquare className="w-8 h-8 text-muted-foreground/30 mx-auto mb-2" /><p className="text-sm text-muted-foreground">No messages received yet</p></div>}
        </div>
      )}
    </div>
  );
};

export default AdminContact;
