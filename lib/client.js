import benchmark from 'benchmark'
import lodash from 'lodash'
import ReactDOM from 'react-dom'
import userBenchmark from 'react-benchmark-user-benchmark' // eslint-disable-line import/no-unresolved, import/no-extraneous-dependencies

// Hack to make benchmark work via webpack
const Benchmark = benchmark.runInContext({ _: lodash })
window.Benchmark = Benchmark

const bench = new Benchmark({
  defer: true,
  async: true,
  fn(deferred) {
    const container = document.createElement('div')
    ReactDOM.render(userBenchmark(), container, () => {
      deferred.resolve()
    })
  },
  onCycle(e) {
    window.benchmarkProgress(JSON.stringify(e.target))
  },
  onComplete() {
    window.benchmarkComplete(JSON.stringify(bench))
  }
})

bench.run()