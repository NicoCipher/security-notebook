import { getFile } from "@/lib/github";
import SkillsEditor from "@/components/admin/SkillsEditor";

export const dynamic = "force-dynamic";

export default async function SkillsPage() {
  const file = await getFile("data/skills.json");
  const skills = file ? JSON.parse(file.content) : [];
  return (
    <div>
      <h1 className="font-display text-2xl text-cream mb-1">Toolbox</h1>
      <p className="text-mute text-sm mb-8">Move these when you actually feel the difference, not on a schedule.</p>
      <SkillsEditor initialSkills={skills} initialSha={file?.sha} />
    </div>
  );
}
