import { IConfig, createOvermind } from 'overmind'
import { createHook } from 'overmind-react'
import { namespaced } from 'overmind/config'

import * as editor from './editor'
import * as dictionary from './dictionary'
import * as app from './app'

export const config = namespaced({
  app,
  editor,
  dictionary,
})

declare module 'overmind' {
  interface Config extends IConfig<typeof config> {}
}

export const useOvermind = createHook<typeof config>()

export const overmind = createOvermind(config, {
  devtools: !!process.env.OVERMIND_DEV_TOOLS,
})
