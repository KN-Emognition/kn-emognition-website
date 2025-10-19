const images = import.meta.glob('@/assets/team/img/*', {
  eager: true,
  import: 'default',
}) as Record<string, string>

export function resolveTeamMemberImg(asset: string) {
  const key = Object.keys(images).find((k) => k.endsWith(`/assets/team/img/${asset}`))
  return key ? images[key] : undefined
}
