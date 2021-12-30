export function googleDriveIdToUrl(id) {
  return `https://drive.google.com/uc?export=download&id=${id}`
}

export function getGoogleDriveIdFromUrl(url) {
  if (!url) return null
  return url.substr(47)
}
