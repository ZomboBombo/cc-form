export default class CcFormOutput {
    #RESET_DELAY = 200

    #form = null
    #triggers = null
    #output = null

    constructor({ triggers, output }) {
        this.#form = document.querySelector('[data-cc-form="form"]')
        this.#triggers = triggers
        this.#output = output
    }

    init() {
        this.#triggers.forEach((trigger) => {
            switch (trigger.getAttribute('type')) {
                case 'submit':
                    trigger.addEventListener('click', this.#onCalculate)
                    break
                case 'reset':
                    trigger.addEventListener('click', this.#onReset)
                    break
            }
        })
    }

    #changeState() {
        return {
            _toActive: () => {
                setTimeout(() => {
                    this.#output.scrollIntoView({ block: 'end' })
                }, 0)

                this.#output.classList.add('is-pending')
                this.#output.classList.add('is-active')
            },

            _toHidden: () => {
                if (this.#form) {
                    this.#form.scrollIntoView({ block: 'start' })
                }

                setTimeout(
                    () => this.#output.classList.remove('is-pending'),
                    this.#RESET_DELAY
                )
                this.#output.classList.remove('is-active')
            },
        }
    }

    #onCalculate = (evt) => {
        evt.preventDefault()
        this.#changeState()._toActive()
    }

    #onReset = () => {
        this.#changeState()._toHidden()
    }
}
