const integer = (num: string | number) => (+(num.toString().replace(/[^\d]/g, ""))).toString()
const decimal = (num: string | number, maximumFractionDigits = 4) => {
    const parts = num.toString().split('.');
    const integerPart = parts[0];
    const decimalPart = parts[1];
    const lastIsDot = num.toString().length > 0 && num.toString().charAt(num.toString().length - 1) === '.';

    const f = (parseInt(integerPart) || 0).toString()
    return f
        .concat(lastIsDot ? '.' : '')
        .concat(decimalPart?.length ? (lastIsDot ? '' : '.') + decimalPart?.substring(0, decimalPart.length < maximumFractionDigits ? decimalPart.length : maximumFractionDigits) : '')
}

// english & number
const enNu = (num: string | number) => num.toString().replace(/[^(\d|a-z|A-Z\.)]/g, "")

const numberFormat = (num: string, decimal = false, maximumFractionDigits = 4) => {
    const parts = num.split('.');
    const integerPart = parts[0];
    const decimalPart = parts[1];
    const lastIsDot = num.length > 0 && num.charAt(num.length - 1) === '.';
    let f = (parseInt(integerPart)).toLocaleString()
    return f
        .concat(lastIsDot ? '.' : '')
        .concat(decimal && decimalPart?.length ? (lastIsDot ? '' : '.') + decimalPart.substring(0, decimalPart.length < maximumFractionDigits ? decimalPart.length : maximumFractionDigits) : '')
}

const numbersToEn = (num: string | number) => {
    let persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g];

    let result = num.toString();
    persianNumbers.forEach((num, i) => {
        result = result.replace(num, i.toString());
    })
    return result;

}

const rulesToJson = (tools: string) => {
    const rules = {}

    tools?.split("|")?.forEach(rule => {
        const [key, value] = rule.split(":")
        rules[key] = rule.includes(":") ? value : true
    })


    return rules
}
export const useInputHandler = (options: {
    tools: string,
    maximumFractionDigits: number
}, model: Ref<string | number>) => {

    const ignore = ref<boolean>(false)
    const show = ref<string>('')
    if (options.maximumFractionDigits === undefined)
        options.maximumFractionDigits = 4
    const rules = options.tools ? rulesToJson(options.tools) : {}

    const changeInput = (target: HTMLInputElement) => {
        let _model = <string | number>''
        let _show = target?.value.toString()
        _show = numbersToEn(_show.toString())
        if (rules.hasOwnProperty("en-nu")) {
            _show = enNu(_show)
            _model = _show
        }

        if (rules.hasOwnProperty("numberFormat")) {
            if (rules.hasOwnProperty("decimal")) {
                _show = decimal(enNu(_show), options.maximumFractionDigits)
                _model = parseFloat(_show)
            } else {
                _show = integer(enNu(_show))
                _model = parseInt(_show)
            }

        } else if (rules.hasOwnProperty("decimal")) {
            _show = decimal(enNu(_show), options.maximumFractionDigits)
            _model = parseFloat(_show)
        } else if (rules.hasOwnProperty("integer")) {
            _show = integer(enNu(_show))
            _model = parseInt(_show)
        }
        if (target?.value?.toString() !== _show?.toString())
            target.value = _show

        if (show.value !== _show)
            show.value = _show
        if (model.value !== _model){
            ignore.value = true
            model.value = _model
        }else
            ignore.value = false

    }


    return {
        ignore,
        model,
        show,
        changeInput
    }
}
