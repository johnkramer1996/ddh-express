export const getStringFromUnknown = (err: unknown): string => {
  return err instanceof Error ? err.message : typeof err === 'string' ? err : ''
}
