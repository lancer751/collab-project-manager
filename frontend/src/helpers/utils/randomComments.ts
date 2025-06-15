type Comment = {
    id: string
    user: {
      name: string
      avatar: string
    }
    time: string
    text: string
  }
  
  const NAMES = [
    "Lau Wong", "Carlos Méndez", "Ana Torres", "Miguel Ángel",
    "Laura García", "Diego Ruiz", "Sofía López", "Juan Pérez",
  ]
  const AVATARS = NAMES.map((_, i) => `https://i.pravatar.cc/40?img=${i + 5}`)
  const TEXTS = [
    "¡Listo! Acabo de subir los últimos cambios.",
    "Revisé la documentación y todo se ve bien. 👍",
    "¿Podrías agregar más pruebas para ese componente?",
    "Claro, lo agrego en un momento.",
    "¿Alguien más revisó esto?",
    "Funciona perfecto en mi entorno.",
    "Detecté un pequeño bug, lo corrijo enseguida.",
    "¿Qué opinan de este enfoque?",
  ]
  
  function randomInt(max: number) {
    return Math.floor(Math.random() * max)
  }
  
  function randomAgo() {
    const mins = randomInt(60)
    if (mins === 0) return "hace unos segundos"
    if (mins < 60) return `hace ${mins} min`
    const hrs = Math.floor(mins / 60)
    return `hace ${hrs} h`
  }
  
  export function generateRandomComments(count: number = 5): Comment[] {
    return Array.from({ length: count }).map(() => {
      const idx = randomInt(NAMES.length)
      return {
        id: crypto.randomUUID(),
        user: {
          name: NAMES[idx],
          avatar: AVATARS[idx],
        },
        time: randomAgo(),
        text: TEXTS[randomInt(TEXTS.length)],
      }
    })
  }
  