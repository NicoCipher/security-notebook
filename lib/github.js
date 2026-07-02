// Thin wrapper around the GitHub Contents API. Every admin save goes
// through here, so every edit becomes a real, visible commit on the repo —
// same as if you'd typed `git commit` yourself.

const API = "https://api.github.com";

function env() {
  const owner = process.env.GH_OWNER;
  const repo = process.env.GH_REPO;
  const branch = process.env.GH_BRANCH || "main";
  const token = process.env.GH_TOKEN;
  if (!owner || !repo || !token) {
    throw new Error(
      "Admin panel isn't configured: missing GH_OWNER, GH_REPO, or GH_TOKEN. See ADMIN_SETUP.md."
    );
  }
  return { owner, repo, branch, token };
}

function headers(token) {
  return {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
}

export async function getFile(path) {
  const { owner, repo, branch, token } = env();
  const res = await fetch(
    `${API}/repos/${owner}/${repo}/contents/${encodeURIComponent(path)}?ref=${branch}`,
    { headers: headers(token), cache: "no-store" }
  );
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`GitHub read failed (${res.status}): ${await res.text()}`);
  const data = await res.json();
  const content = Buffer.from(data.content, "base64").toString("utf8");
  return { content, sha: data.sha };
}

export async function listDir(path) {
  const { owner, repo, branch, token } = env();
  const res = await fetch(
    `${API}/repos/${owner}/${repo}/contents/${encodeURIComponent(path)}?ref=${branch}`,
    { headers: headers(token), cache: "no-store" }
  );
  if (res.status === 404) return [];
  if (!res.ok) throw new Error(`GitHub list failed (${res.status}): ${await res.text()}`);
  return res.json();
}

export async function putFile(path, content, message, sha) {
  const { owner, repo, branch, token } = env();
  const body = {
    message,
    content: Buffer.from(content, "utf8").toString("base64"),
    branch,
  };
  if (sha) body.sha = sha;
  const res = await fetch(`${API}/repos/${owner}/${repo}/contents/${encodeURIComponent(path)}`, {
    method: "PUT",
    headers: { ...headers(token), "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`GitHub write failed (${res.status}): ${await res.text()}`);
  return res.json();
}

export async function deleteFile(path, message, sha) {
  const { owner, repo, branch, token } = env();
  const res = await fetch(`${API}/repos/${owner}/${repo}/contents/${encodeURIComponent(path)}`, {
    method: "DELETE",
    headers: { ...headers(token), "Content-Type": "application/json" },
    body: JSON.stringify({ message, sha, branch }),
  });
  if (!res.ok) throw new Error(`GitHub delete failed (${res.status}): ${await res.text()}`);
  return res.json();
}
