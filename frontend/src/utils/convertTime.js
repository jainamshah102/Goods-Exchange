export default function convertTime(createAt) {
  let date = new Date(createAt).getTime()
  let time = (Date.now() - date) / 1000

  /**
   * 1000ms   => 1s
   * 1000 * 60 => 1min
   * 1000 * 60 * 60 => 1hr
   * 1000 * 60 * 60 * 24 => 1d
   * 1000 * 60 * 60 * 24 * 30 => 1m
   */

  if (time < 60) {
    return 'Few sec ago.'
  } else if (time >= 60 && time < 3600) {
    return `${Math.round(time / 60)} mins ago`
  } else if (time >= 3600 && time < 86400) {
    return `${Math.round(time / 3600)} hours ago`
  } else if (time >= 86400 && time < 2592000) {
    return `${Math.round(time / 86400)} days ago`
  } else {
    return new Date(createAt).substring(4, 24)
  }
}
