import {type DevServerConfig} from "@web/dev-server"
import {esbuildPlugin} from "@web/dev-server-esbuild"

export default {
  nodeResolve: true,
  plugins: [esbuildPlugin({ts: true})],
  watch: true,
} satisfies DevServerConfig
