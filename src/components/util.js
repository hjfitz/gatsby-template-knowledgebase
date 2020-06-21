export const normalise = (path) => `/${path.split('/').filter(Boolean).join('/')}`
