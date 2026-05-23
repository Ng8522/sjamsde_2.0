import type { OcuDeploymentHighlight } from "@/lib/ocu-content";
import { ocuDeploymentMetaByNumber } from "@/lib/ocu-deployment-meta";

export type OcuDeployment = OcuDeploymentHighlight & {
  id: string;
  coverImage: string;
  images: string[];
  hasDetail: boolean;
};

const imageModules = import.meta.glob<string>("../assets/ocu/**/*.{jpeg,jpg,JPG}", {
  eager: true,
  query: "?url",
  import: "default",
});

const DEPLOYMENT_FOLDER_RE = /\/(\d+)th Deployment\//i;

function imagesForFolder(folderSegment: string): string[] {
  const needle = `/${folderSegment}/`;
  return Object.entries(imageModules)
    .filter(([path]) => path.replace(/\\/g, "/").includes(needle))
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, url]) => url);
}

function deploymentNumbersFromAssets(): number[] {
  const numbers = new Set<number>();
  for (const path of Object.keys(imageModules)) {
    const normalized = path.replace(/\\/g, "/");
    const match = normalized.match(DEPLOYMENT_FOLDER_RE);
    if (match) numbers.add(Number.parseInt(match[1], 10));
  }
  return [...numbers];
}

function mergeMeta(number: number): OcuDeployment {
  const folder = `${number}th Deployment`;
  const images = imagesForFolder(folder);
  const meta = ocuDeploymentMetaByNumber[number];
  const hasDetail = Boolean(meta?.paragraphs?.length);

  const fallbackParagraphs = [
    `Our Ophthalmic Care Unit (OCU) team carried out its ${number}th deployment, bringing free vision screening and community eye care to those we serve.`,
  ];

  return {
    id: String(number),
    number,
    title: meta?.title ?? `OCU deployment #${number}`,
    location: meta?.location ?? "Selangor",
    peopleScreened: meta?.peopleScreened,
    glassesProvided: meta?.glassesProvided,
    paragraphs: meta?.paragraphs ?? fallbackParagraphs,
    thanks: meta?.thanks ?? [],
    coverImage: images[0] ?? "",
    images,
    hasDetail,
  };
}

function allDeploymentNumbers(): number[] {
  const fromAssets = deploymentNumbersFromAssets();
  const fromMeta = Object.keys(ocuDeploymentMetaByNumber).map((n) => Number.parseInt(n, 10));
  return [...new Set([...fromAssets, ...fromMeta])].sort((a, b) => b - a);
}

/** All deployments, newest first. Grows automatically when folders are added under assets/ocu/. */
export const ocuDeployments: OcuDeployment[] = allDeploymentNumbers()
  .map(mergeMeta)
  .filter((d) => d.images.length > 0 || d.hasDetail);

export function getOcuDeployment(id: string) {
  return ocuDeployments.find((d) => d.id === id);
}

/** Highest deployment number discovered (programme carry-out count). */
export function getOcuDeploymentsCompleted(): number {
  const numbers = allDeploymentNumbers();
  return numbers.length > 0 ? Math.max(...numbers) : 0;
}
