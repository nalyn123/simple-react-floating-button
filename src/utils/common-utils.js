export class CommonUtils {
  static getTheme = (rgba) => {
    const match = rgba.match(/\d+\.?\d*/g)
    if (!match || match.length < 3) return false

    const r = Number(match[0])
    const g = Number(match[1])
    const b = Number(match[2])

    const brightness = 0.299 * r + 0.587 * g + 0.114 * b

    return brightness < 128 ? 'dark' : 'light'
  }

  static rangesOverlap = (start1, end1, start2, end2) => {
    return start1 <= end2 && start2 <= end1
  }
}
