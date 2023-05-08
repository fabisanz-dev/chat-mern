import { Router } from 'express'
import { readdirSync } from 'fs'
import { fileURLToPath } from 'url'
import path from 'path'

const mainRouter = Router()
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PATH_ROUTES = `${__dirname}`

// Remover extension del nombre del archivo
const removeExtension = (filename) => {
  return filename.split('.').shift()
}

// Import de todos los routers del directorio /routes
readdirSync(PATH_ROUTES)
  .filter((file) => {
    const cleanName = removeExtension(file)
    return cleanName !== 'index'
  })
  .forEach((file) => {
    const cleanName = removeExtension(file)
    import(`./${cleanName}.routes.js`) // Agregar la extensión .js
      .then((moduleRouter) => {
        console.log(`Cargando ruta: ${cleanName} ...`)
        mainRouter.use(`/${cleanName}`, moduleRouter.router)
      })
      .catch((err) => {
        console.log(`No se pudo cargar ruta ${cleanName}`, err)
      })
  })

mainRouter.get('/', (req, res) => {
  res.send('Ok')
})

export default mainRouter
