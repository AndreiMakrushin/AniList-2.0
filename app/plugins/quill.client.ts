import Quill from 'quill'

export default defineNuxtPlugin(() => {
  return {
    provide: {
      quill: Quill
    }
  }
})