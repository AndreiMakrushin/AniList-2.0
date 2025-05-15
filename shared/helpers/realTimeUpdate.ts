export const realTimeUpdate = () => {
    const date = new Date().toLocaleDateString()
    const normalDate = date.split('.')
    const dateNormal = `${normalDate[2]}-${normalDate[1]}-${normalDate[0]}`
    const time = new Date().toLocaleTimeString()
  
    return `${dateNormal} ${time}`
  }