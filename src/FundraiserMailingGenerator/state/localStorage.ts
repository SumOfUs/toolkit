// @flow
export function hydrate(key: string, defaultState: any = {}): any {
  const cache = localStorage.getItem(key);
  if (!cache) return defaultState;
  try {
    const localState = JSON.parse(cache);
    return { ...defaultState, ...localState };
  } catch (e) {
    console.log('Error reading saved state', e);
    return defaultState;
  }
}

export function save(key: string, state: any) {
  return localStorage.setItem(key, JSON.stringify(state));
}
