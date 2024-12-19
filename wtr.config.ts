import {esbuildPlugin} from "@web/dev-server-esbuild"
import {type TestRunnerConfig} from "@web/test-runner"
import {playwrightLauncher} from "@web/test-runner-playwright"

const config: TestRunnerConfig = {
  nodeResolve: true,
  plugins: [esbuildPlugin({ts: true})],
  files: ["*.test.ts"],
  browsers: [
    playwrightLauncher({product: "chromium"}),
    playwrightLauncher({product: "firefox"}),
    playwrightLauncher({product: "webkit"}),
  ],
  coverage: true,
  coverageConfig: {
    include: ["*.ts"],
    report: true,
    threshold: {
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80,
    },
  },
}

export default config
