import type { RouteRecordRaw } from 'vue-router'
import { blue, gray, yellow } from 'ansis'

export function buildLog(text: string, count?: number) {
  // eslint-disable-next-line no-console
  console.log(`\n${gray('[vite-ssg]')} ${yellow(text)}${count ? blue(` (${count})`) : ''}`)
}

export function getSize(str: string) {
  return `${(str.length / 1024).toFixed(2)} KiB`
}

export function routesToPaths(routes?: Readonly<RouteRecordRaw[]>) {
  if (!routes)
    return ['/']

  const paths: Set<string> = new Set()

  const getPaths = (routes: Readonly<RouteRecordRaw[]>, prefix = '') => {
    // remove trailing slash
    prefix = prefix.replace(/\/$/g, '')
    for (const route of routes) {
      let path = route.path

      // check for leading slash
      if (route.path != null) {
        path = (prefix && !route.path.startsWith('/'))
          ? `${prefix}${route.path ? `/${route.path}` : ''}`
          : route.path

        paths.add(path)
      }
      if (Array.isArray(route.children))
        getPaths(route.children, path)
    }
  }

  getPaths(routes)
  return Array.from(paths)
}
