export const videoTimer = (time: number) => {
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor((time % 3600) % 60);
  
    if (time >= 3600) {
      const hour = Math.floor(time / 3600);
      return `${hour.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    } else {
      return `${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`;
    }
  };