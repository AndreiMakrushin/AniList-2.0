export const downloadImage = (canvas: HTMLCanvasElement) => {
    const randomNameScreenShotString = "abcdefghijklmnopqrstuvwxyz0123456789"
    const randomNameScreenShot = Array.from({ length: 20 }, () => {
        return randomNameScreenShotString[Math.floor(Math.random() * randomNameScreenShotString.length)]
    }).join('')
    const image = canvas.toDataURL('image/png')
    const link = document.createElement('a')
    link.href = image
    link.download = `${randomNameScreenShot}.png`
    link.click()
}