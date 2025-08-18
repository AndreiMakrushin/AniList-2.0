import { downloadImage } from "~/shared/helpers/downloadImage"
export const useScreenShooter = (el: HTMLVideoElement | null, width: number, height: number) => {
  if (!el) return
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  canvas.getContext('2d')?.drawImage(el, 0, 0)
  downloadImage(canvas)
}