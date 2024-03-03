import CcFormOutput from './classes/CcFormOutput'

export function initCcFormOutput() {
    const $triggers = document.querySelectorAll('[data-cc-form="action"]')
    const $output = document.querySelector('[data-cc-form="output"]')

    if (!$triggers || !$output) {
        return
    }

    const ccFormOutput = new CcFormOutput({
        triggers: $triggers,
        output: $output,
    })
    ccFormOutput.init()
}
