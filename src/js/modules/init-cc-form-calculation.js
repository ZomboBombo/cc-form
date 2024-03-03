import CcFormCalculation from './classes/CcFormCalculation'

export function initCcFormCalculation() {
    const $form = document.querySelector('[data-cc-form="form"]')
    const $sexInputs = $form?.querySelectorAll('[data-cc-form="input-sex"]')
    const $paramInputs = $form?.querySelectorAll('[data-cc-form="input-param"]')
    const $activityInputs = $form?.querySelectorAll('[data-cc-form="input-activity"]')
    const $submitAction = $form?.querySelector('[data-cc-form="action"][type="submit"]')
    const $output = $form?.querySelector('[data-cc-form="output"]')

    if (
        !$sexInputs
        || !$paramInputs
        || !$activityInputs
        || !$submitAction
        || !$output
    ) {
        return
    }

    const ccFormFields = {
        sexFields: $sexInputs,
        paramFields: $paramInputs,
        activityFields: $activityInputs,
    }

    const ccFormCalculation = new CcFormCalculation({
        fields: ccFormFields,
        trigger: $submitAction,
        output: $output,
    })
    ccFormCalculation.init()
}
