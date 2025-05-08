const downloadImage = (canvas: HTMLCanvasElement) => {
    const randomNameScreenShotString = "abcdefghijklmnopqrstuvwxyz0123456789"
    const randomNameScreenShot = Array.from({length: 20}, ()=>{
      return randomNameScreenShotString[Math.floor(Math.random() * randomNameScreenShotString.length)]
    }).join('')
    const image = canvas.toDataURL('image/png')
    const link = document.createElement('a')
    link.href = image
    link.download = `${randomNameScreenShot}.png`
    link.click()
  }
 export const useScreenShooter = (el: HTMLVideoElement | null, width: number, height: number) => {
    if (!el) return
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    canvas.getContext('2d')?.drawImage(el, 0, 0)
    downloadImage(canvas)
  }