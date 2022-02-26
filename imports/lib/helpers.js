export function googleDriveIdToUrl(id) {
  return `https://drive.google.com/uc?export=download&id=${id}`
}

export function getGoogleDriveIdFromUrl(url) {
  if (!url) return null
  return url.substr(47)
}

export function cloudCmdIdToUrl(id) {
  return `https://media.intergestalt.dev/api/v1/fs/coreo/${id}`
}

export function getCloudCmdIdFromUrl(url) {
  if (!url) return null
  return url.substr(47)
}


export const sceneTemplate = {
  title: "Scene",
  video1Url: googleDriveIdToUrl("timer_example_3s.mp4"),
  video2Url: googleDriveIdToUrl("timer_example_3s.mp4"),
  img1Url: googleDriveIdToUrl("timer_example_3s.png"),
  img2Url: googleDriveIdToUrl("timer_example_3s.png"),
}