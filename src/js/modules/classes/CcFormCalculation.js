export default class CcFormCalculation {
    #DECIMAL_RADIX = 10
    #WOMEN_COEFF = 161
    #MEN_COEFF = 5

    #fields = null
    #trigger = null
    #output = null

    constructor({ fields, trigger, output }) {
        this.#fields = fields
        this.#trigger = trigger
        this.#output = output
    }

    init() {
        this.#trigger.addEventListener('click', this.#onCalculate)
    }

    #getFieldValues() {
        const { sexFields, paramFields, activityFields } = this.#fields

        const sex = Array.from(sexFields).find((input) => input.checked).value

        const ageVal = Array.from(paramFields).find((input) => input.getAttribute('name') === 'cc-form-param:age').value
        const heightVal = Array.from(paramFields).find((input) => input.getAttribute('name') === 'cc-form-param:height').value
        const weightVal = Array.from(paramFields).find((input) => input.getAttribute('name') === 'cc-form-param:weight').value

        const age = parseInt(ageVal, this.#DECIMAL_RADIX) || 0
        const height = parseInt(heightVal, this.#DECIMAL_RADIX) || 0
        const weight = parseInt(weightVal, this.#DECIMAL_RADIX) || 0

        const activityVal = Array.from(activityFields).find((input) => input.checked).dataset.coeff
        const activity = parseFloat(activityVal, this.#DECIMAL_RADIX) || 0

        return {
            sex,
            params: { age, height, weight },
            activity,
        }
    }

    #getParamsCoeff(params) {
        const { age, height, weight } = params

        const ageCoeff = 5 * age
        const heightCoeff = 6.25 * height
        const weightCoeff = 10 * weight

        return weightCoeff + heightCoeff - ageCoeff
    }

    #calculateDailyNorm() {
        const { sex, params, activity } = this.#getFieldValues()
        const paramsCoeff = this.#getParamsCoeff(params)

        const wSave = sex === 'female'
            ? parseInt(activity * (paramsCoeff - this.#WOMEN_COEFF), this.#DECIMAL_RADIX)
            : parseInt(activity * (paramsCoeff + this.#MEN_COEFF), this.#DECIMAL_RADIX)

        const wLoss = parseInt(wSave - wSave * 0.15, this.#DECIMAL_RADIX)
        const wGain = parseInt(wSave + wSave * 0.15, this.#DECIMAL_RADIX)

        return { wSave, wLoss, wGain }
    }

    #outputDailyNorm({ wSave, wLoss, wGain }) {
        const $wSaveOutput = this.#output.querySelector('[data-output="weight-save"]')
            ?.querySelector('[data-output-val]')
        const $wLossOutput = this.#output.querySelector('[data-output="weight-loss"]')
            ?.querySelector('[data-output-val]')
        const $wGainOutput = this.#output.querySelector('[data-output="weight-gain"]')
            ?.querySelector('[data-output-val]')

        $wSaveOutput.textContent = wSave
        $wLossOutput.textContent = wLoss
        $wGainOutput.textContent = wGain
    }

    #onCalculate = (evt) => {
        evt.preventDefault()

        const { wSave, wLoss, wGain } = this.#calculateDailyNorm()
        this.#outputDailyNorm({ wSave, wLoss, wGain })
    }
}