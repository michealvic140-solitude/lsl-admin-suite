import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Upload, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export const Route = createFileRoute("/leaderboard")({
  head: () => ({
    meta: [
      { title: "Leaderboard — Lomita Shooters League" },
      { name: "description", content: "See the top shooters and top gangs ranked by season points, wins, and tokens won across the Lomita Shooters League." },
      { property: "og:title", content: "LSL Leaderboard — Top Shooters & Gangs" },
      { property: "og:description", content: "Top shooters and gangs ranked by season points, wins, and tokens won." },
      { property: "og:url", content: "https://lslonlinebetting.lovable.app/leaderboard" },
    ],
    links: [{ rel: "canonical", href: "https://lslonlinebetting.lovable.app/leaderboard" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "LSL Leaderboard",
        description: "Top shooters and gangs in the Lomita Shooters League.",
        url: "https://lslonlinebetting.lovable.app/leaderboard",
      }),
    }],
  }),
  component: Page,
});

function rankIcon(i: number) {
  if (i === 0) return "🥇"; if (i === 1) return "🥈"; if (i === 2) return "🥉";
  return `#${i + 1}`;
}

type Stats = { name: string; top_player?: string; W: number; L: number; D: number; PTS: number; P: number; manual_rank?: number | null };

function Page() {
  const [shooters, setShooters] = useState<Stats[]>([]);
  const [gangs, setGangs] = useState<Stats[]>([]);

  useEffect(() => {
    (async () => {
      const { data: settings } = await supabase
        .from("app_settings")
        .select("leaderboard_gangs_reset_at, leaderboard_shooters_reset_at")
        .eq("id", 1)
        .maybeSingle();
      const gangsReset = (settings as any)?.leaderboard_gangs_reset_at
        ? new Date((settings as any).leaderboard_gangs_reset_at).getTime()
        : 0;
      const shootersReset = (settings as any)?.leaderboard_shooters_reset_at
        ? new Date((settings as any).leaderboard_shooters_reset_at).getTime()
        : 0;
      // Real (non-virtual) finished matches only — virtual rounds never count.
      const { data: matches } = await supabase
        .from("matches")
        .select("home_team_id,away_team_id,home_score,away_score,winner_team_id,status,is_virtual,settled_at,created_at")
        .eq("status", "ended")
        .eq("is_virtual", false);
      const { data: teams } = await supabase.from("teams").select("id,name");
      const { data: players } = await supabase.from("players").select("id,name,team_id");
      const { data: overrides } = await supabase.from("leaderboard_overrides").select("*");

      const teamMap = new Map<string, string>(); (teams ?? []).forEach((t) => teamMap.set(t.id, t.name));
      const teamPlayers = new Map<string, string[]>();
      (players ?? []).forEach((p) => { const a = teamPlayers.get(p.team_id) ?? []; a.push(p.name); teamPlayers.set(p.team_id, a); });

      const gangAgg = new Map<string, Stats>();
      const playerAgg = new Map<string, Stats>();

      (matches ?? []).forEach((m: any) => {
        const ts = new Date(m.settled_at ?? m.created_at ?? 0).getTime();
        const countForGangs = ts >= gangsReset;
        const countForShooters = ts >= shootersReset;
        if (!countForGangs && !countForShooters) return;
        for (const side of ["home", "away"] as const) {
          const tid = side === "home" ? m.home_team_id : m.away_team_id;
          const tname = teamMap.get(tid) || "Team";
          const won = m.winner_team_id === tid;
          const draw = m.winner_team_id == null;
          if (countForGangs) {
            const cur = gangAgg.get(tname) ?? { name: tname, top_player: (teamPlayers.get(tid) ?? [])[0], W: 0, L: 0, D: 0, PTS: 0, P: 0 };
            cur.P += 1;
            if (draw) { cur.D += 1; cur.PTS += 1; }
            else if (won) { cur.W += 1; cur.PTS += 3; }
            else { cur.L += 1; }
            gangAgg.set(tname, cur);
          }
          if (countForShooters) {
            (teamPlayers.get(tid) ?? []).forEach((pname) => {
              const pc = playerAgg.get(pname) ?? { name: pname, W: 0, L: 0, D: 0, PTS: 0, P: 0 };
              pc.P += 1;
              if (draw) { pc.D += 1; pc.PTS += 1; }
              else if (won) { pc.W += 1; pc.PTS += 3; }
              else { pc.L += 1; }
              playerAgg.set(pname, pc);
            });
          }
        }
      });

      // Apply manual overrides + honour hidden entries (admin can remove a team/shooter).
      (overrides ?? []).forEach((o: any) => {
        const target = o.kind === "gang" ? gangAgg : playerAgg;
        if (o.is_hidden) {
          target.delete(o.name);
          return;
        }
        target.set(o.name, {
          name: o.name, top_player: o.top_player ?? undefined,
          W: o.wins, L: o.losses, D: o.draws, P: o.played, PTS: o.points,
          manual_rank: o.manual_rank,
        });
      });

      const sortFn = (a: Stats, b: Stats) => {
        if (a.manual_rank != null && b.manual_rank != null) return a.manual_rank - b.manual_rank;
        if (a.manual_rank != null) return -1;
        if (b.manual_rank != null) return 1;
        return b.PTS - a.PTS || b.W - a.W;
      };
      setGangs(Array.from(gangAgg.values()).sort(sortFn));
      setShooters(Array.from(playerAgg.values()).sort(sortFn));
    })();
  }, []);

  return (
    <Layout>
      <div className="container py-10">
        <LeaderboardBanner />
        <div className="flex items-center gap-2 mb-6">
          <Trophy className="h-7 w-7 text-primary" />
          <h1 className="text-3xl font-bold gradient-gold-text">Leaderboard</h1>
        </div>
        <Tabs defaultValue="gangs">
          <TabsList>
            <TabsTrigger value="gangs">Top Gangs / Factions</TabsTrigger>
            <TabsTrigger value="shooters">Top Shooters</TabsTrigger>
          </TabsList>

          <TabsContent value="gangs" className="mt-4">
            <Card className="glass overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-border bg-card/40">
                  <tr className="text-left text-xs uppercase tracking-widest text-muted-foreground">
                    <Th>Rank</Th><Th>Gang / Faction</Th><Th>Top Player</Th>
                    <Th right>W</Th><Th right>L</Th><Th right>D</Th><Th right>P</Th><Th right>PTS</Th>
                  </tr>
                </thead>
                <tbody>
                  {gangs.length === 0 && <tr><td colSpan={8} className="p-6 text-center text-muted-foreground">No data yet.</td></tr>}
                  {gangs.map((g, i) => (
                    <tr key={g.name} className="border-b border-border/40 hover:bg-primary/5">
                      <Td><span className="text-lg font-bold">{rankIcon(i)}</span></Td>
                      <Td><span className="font-bold">{g.name}</span></Td>
                      <Td><span className="text-muted-foreground">{g.top_player || "—"}</span></Td>
                      <Td right><span className="text-emerald-400 font-bold">{g.W}</span></Td>
                      <Td right><span className="text-destructive font-bold">{g.L}</span></Td>
                      <Td right><span className="text-amber-400 font-bold">{g.D}</span></Td>
                      <Td right>{g.P}</Td>
                      <Td right><span className="font-bold text-primary">{g.PTS}</span></Td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </TabsContent>

          <TabsContent value="shooters" className="mt-4">
            <Card className="glass overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-border bg-card/40">
                  <tr className="text-left text-xs uppercase tracking-widest text-muted-foreground">
                    <Th>Rank</Th><Th>Player</Th>
                    <Th right>Won</Th><Th right>Lost</Th><Th right>Total</Th><Th right>PTS</Th>
                  </tr>
                </thead>
                <tbody>
                  {shooters.length === 0 && <tr><td colSpan={6} className="p-6 text-center text-muted-foreground">No shooters yet.</td></tr>}
                  {shooters.map((p, i) => (
                    <tr key={p.name} className="border-b border-border/40 hover:bg-primary/5">
                      <Td><span className="text-lg font-bold">{rankIcon(i)}</span></Td>
                      <Td><span className="font-bold">{p.name}</span></Td>
                      <Td right><span className="text-emerald-400 font-bold">{p.W}</span></Td>
                      <Td right><span className="text-destructive font-bold">{p.L}</span></Td>
                      <Td right>{p.P}</Td>
                      <Td right><span className="font-bold text-primary">{p.PTS}</span></Td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}

function Th({ children, right }: { children: React.ReactNode; right?: boolean }) { return <th className={`px-4 py-3 ${right ? "text-right" : ""}`}>{children}</th>; }
function Td({ children, right }: { children: React.ReactNode; right?: boolean }) { return <td className={`px-4 py-3 ${right ? "text-right" : ""}`}>{children}</td>; }

function LeaderboardBanner() {
  const { isAdmin } = useAuth();
  const [banner, setBanner] = useState<{ url?: string; description?: string; link?: string }>({});
  const [editing, setEditing] = useState(false);
  const [busy, setBusy] = useState(false);
  const [draftDesc, setDraftDesc] = useState("");
  const [draftLink, setDraftLink] = useState("");
  const [draftUrl, setDraftUrl] = useState("");

  async function load() {
    const { data } = await (supabase.from("app_settings") as any)
      .select("leaderboard_banner_url, leaderboard_banner_description, leaderboard_banner_link")
      .eq("id", 1).maybeSingle();
    const d: any = data || {};
    setBanner({ url: d.leaderboard_banner_url, description: d.leaderboard_banner_description, link: d.leaderboard_banner_link });
    setDraftUrl(d.leaderboard_banner_url ?? "");
    setDraftDesc(d.leaderboard_banner_description ?? "");
    setDraftLink(d.leaderboard_banner_link ?? "");
  }
  useEffect(() => { load(); }, []);

  async function upload(file: File) {
    setBusy(true);
    const path = `leaderboard/${Date.now()}-${file.name}`;
    const { error: ue } = await supabase.storage.from("announcements").upload(path, file, { upsert: true });
    if (ue) { setBusy(false); toast.error(ue.message); return; }
    const { data: { publicUrl } } = supabase.storage.from("announcements").getPublicUrl(path);
    setDraftUrl(publicUrl);
    setBusy(false);
    toast.success("Image uploaded — click Save to publish");
  }

  async function save() {
    setBusy(true);
    const { error } = await (supabase.from("app_settings") as any).update({
      leaderboard_banner_url: draftUrl || null,
      leaderboard_banner_description: draftDesc || null,
      leaderboard_banner_link: draftLink || null,
    }).eq("id", 1);
    setBusy(false);
    if (error) { toast.error(error.message); return; }
    toast.success("Leaderboard banner saved");
    setEditing(false);
    load();
  }

  async function clearBanner() {
    setBusy(true);
    const { error } = await (supabase.from("app_settings") as any).update({
      leaderboard_banner_url: null, leaderboard_banner_description: null, leaderboard_banner_link: null,
    }).eq("id", 1);
    setBusy(false);
    if (error) { toast.error(error.message); return; }
    toast.success("Banner removed");
    setEditing(false); load();
  }

  if (!banner.url && !isAdmin) return null;

  return (
    <div className="mb-6">
      {banner.url && (
        <Card className="glass overflow-hidden border-primary/40">
          {banner.link ? (
            <a href={banner.link} target="_blank" rel="noreferrer">
              <img src={banner.url} alt={banner.description ?? "Leaderboard banner"} className="w-full max-h-[480px] object-cover" />
            </a>
          ) : (
            <img src={banner.url} alt={banner.description ?? "Leaderboard banner"} className="w-full max-h-[480px] object-cover" />
          )}
          {banner.description && (
            <div className="p-4 text-sm leading-relaxed whitespace-pre-wrap">{banner.description}</div>
          )}
        </Card>
      )}
      {isAdmin && (
        <div className="mt-2 flex justify-end">
          {!editing ? (
            <Button size="sm" variant="outline" onClick={() => setEditing(true)}>
              <Upload className="h-3.5 w-3.5 mr-1" />{banner.url ? "Edit banner" : "Add banner"}
            </Button>
          ) : (
            <Card className="glass p-4 w-full space-y-3 border-primary/30">
              <div className="flex items-center justify-between">
                <div className="text-sm font-bold">Leaderboard banner</div>
                <Button size="icon" variant="ghost" onClick={() => setEditing(false)}><X className="h-4 w-4" /></Button>
              </div>
              <div className="space-y-1">
                <label className="text-xs text-muted-foreground">Image</label>
                <Input type="file" accept="image/*" disabled={busy} onChange={(e) => { const f = e.target.files?.[0]; if (f) upload(f); }} />
                {draftUrl && <img src={draftUrl} alt="preview" className="mt-2 w-full max-h-60 object-cover rounded border border-border" />}
              </div>
              <div className="space-y-1">
                <label className="text-xs text-muted-foreground">Description</label>
                <Textarea value={draftDesc} onChange={(e) => setDraftDesc(e.target.value)} rows={4} placeholder="Optional description shown below the image" />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-muted-foreground">Optional link (clicking the image opens this)</label>
                <Input value={draftLink} onChange={(e) => setDraftLink(e.target.value)} placeholder="https://…" />
              </div>
              <div className="flex justify-end gap-2">
                {banner.url && <Button variant="destructive" size="sm" onClick={clearBanner} disabled={busy}>Remove banner</Button>}
                <Button size="sm" onClick={save} disabled={busy || !draftUrl}>Save banner</Button>
              </div>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
