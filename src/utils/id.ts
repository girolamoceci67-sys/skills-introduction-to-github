/**
 * ID locale non crittografico, sufficiente per entità solo-locali in v1.
 * Da rivedere quando si introdurrà la sync cloud (servirà un ID globalmente univoco,
 * es. UUID v4 reale o ID assegnato dal server).
 */
export function createLocalId(): string {
  const random = Math.random().toString(36).slice(2, 10);
  return `${Date.now().toString(36)}-${random}`;
}
