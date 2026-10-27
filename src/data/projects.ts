export type ProjectKey = 'heartauth' | 'resqvoice' | 'psychotherapy'

export const projects: { key: ProjectKey; icon: string; accent: string }[] = [
  { key: 'heartauth', icon: 'pi pi-heart', accent: 'var(--rose)' },
  { key: 'resqvoice', icon: 'pi pi-microphone', accent: 'var(--teal)' },
  { key: 'psychotherapy', icon: 'pi pi-comments', accent: 'var(--violet)' },
]
