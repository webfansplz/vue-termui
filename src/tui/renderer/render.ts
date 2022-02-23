import Yoga from 'yoga-layout-prebuilt'
import { DOMElement } from './dom'
import renderNodeToOutput from './renderNodeToOutput'
import { Output } from './Output'

interface Result {
  output: string
  outputHeight: number
  staticOutput: string
}

export function renderRoot(node: DOMElement, terminalWidth: number): Result {
  // console.log('renderRoot', node)
  node.yogaNode!.setWidth(terminalWidth)

  if (node.yogaNode) {
    node.yogaNode.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR)

    const output = new Output({
      width: node.yogaNode.getComputedWidth(),
      height: node.yogaNode.getComputedHeight(),
    })

    renderNodeToOutput(node, output, { skipStaticElements: true })

    let staticOutput

    if (node.staticNode?.yogaNode) {
      staticOutput = new Output({
        width: node.staticNode.yogaNode.getComputedWidth(),
        height: node.staticNode.yogaNode.getComputedHeight(),
      })

      renderNodeToOutput(node.staticNode, staticOutput, {
        skipStaticElements: false,
      })
    }

    const { output: generatedOutput, height: outputHeight } = output.get()

    return {
      output: generatedOutput,
      outputHeight,
      // Newline at the end is needed, because static output doesn't have one, so
      // interactive output will override last line of static output
      staticOutput: staticOutput ? `${staticOutput.get().output}\n` : '',
    }
  }

  return {
    output: '',
    outputHeight: 0,
    staticOutput: '',
  }
}
