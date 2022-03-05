export function googleDriveIdToUrl(id) {
  return `https://drive.google.com/uc?export=download&id=${id}`
}

export function cloudCmdIdToUrl(id) {
  return `/videos/${id}`
}

export function getCloudCmdIdFromUrl(url) {
  if (!url) return null
  return url.substr(8)
}


export const sceneTemplate = {
  title: "Scene",
  disabled: false,
  video1Url: cloudCmdIdToUrl("timer_example_3s.mp4"),
  video2Url: cloudCmdIdToUrl("timer_example_3s.mp4"),
  img1Url: cloudCmdIdToUrl("timer_example_3s.png"),
  img2Url: cloudCmdIdToUrl("timer_example_3s.png"),
}