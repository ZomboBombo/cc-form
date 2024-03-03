function onlyDigitsWithoutLeadZero(input) {
    const REGEXP = /0+[\d]|\D/g
    return input.value.replace(REGEXP, '')
}

export { onlyDigitsWithoutLeadZero }