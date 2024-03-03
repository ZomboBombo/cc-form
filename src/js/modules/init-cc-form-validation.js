import CcFormValidation from "./classes/CcFormValidation"

export function initCcFormValidation() {
    const $form = document.querySelector('[data-cc-form="form"]')

    const ccFormValidation = new CcFormValidation({ form: $form})
    ccFormValidation.init()
}