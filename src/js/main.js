import { initCcFormOutput } from './modules/init-cc-form-output'
import { initCcFormCalculation } from './modules/init-cc-form-calculation'
import { initCcFormValidation } from './modules/init-cc-form-validation'

window.addEventListener('DOMContentLoaded', () => {
    initCcFormOutput()
    initCcFormCalculation()
    initCcFormValidation()
})
