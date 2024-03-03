import { onlyDigitsWithoutLeadZero } from '../../utils/input-format'

export default class CcFormValidation {
    #form = null
    #inputs = null
    #submit = null
    #reset = null

    constructor({ form }) {
        this.#form = form
        this.#inputs = this.#form?.querySelectorAll('[data-cc-form="input-param"]')
        this.#submit = this.#form?.querySelector('[data-cc-form="action"][type="submit"]')
        this.#reset = this.#form?.querySelector('[data-cc-form="action"][type="reset"]')
    }

    init() {
        this.#inputs.forEach((input) => input.addEventListener('input', this.#onInput))
    }

    #onInput = (evt) => {
        this.#submit.disabled = !this.#form.checkValidity()
        this.#reset.disabled = !this.#form.checkValidity()
        evt.currentTarget.value = onlyDigitsWithoutLeadZero(evt.currentTarget)
    }
}