const display = document.querySelector('#display')
const btns = [...document.querySelectorAll('input[type=button]')]
let digitoIsOperator = false

// Operadores com funcionalidades extras, nem tanto
class OperadoresEspeciais {
    static clear() {
        digitoIsOperator = false
        display.value = '0'
    }

    static del() {
        if (display.value.length > 1) {
            display.value = display.value.toString().slice(0, -1)
        } else {
            display.value = "0"
        }
    }

    static equal() {
        try {
            if (display.value.length == 0) {
                alert('Digite uma expressão')
            } else {
                display.value = eval(display.value.replaceAll(',', '.').replaceAll(' mod ', '%').replaceAll('\u{00F7}', '/').replaceAll('\u{00d7}', '*').replaceAll('²', '**2'))
                display.value = display.value.replaceAll('.', ',').replaceAll('%', ' mod ').replaceAll('/', '÷').replaceAll('*', '\u{00d7}')
            }
        } catch (error) {
            alert('Expressão incompleta')
        }
    }
}

// Filtrando os botões por operadores, números e botões extras

let array_filtro = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9','(',')']

const btns_num = btns.filter((btn) => {
    if (array_filtro.indexOf(btn.value) != -1) {
        return btn
    }
})

array_filtro = ['+', '-', '\u{00d7}', '÷', ',', ' mod ', '\u{03c0}', 'x²']

const btns_op = btns.filter((btn) => {
    if (array_filtro.indexOf(btn.value) != -1) {
        return btn
    }
})

array_filtro = ['C', '\u{232b}', '=']

const btns_utilities = btns.filter((btn) => {
    if (array_filtro.indexOf(btn.value) != -1) {
        return btn
    }
})

// Aplicando funções aos botões

btns_num.forEach((btn) => {
    btn.addEventListener('click', () => {
        digitoIsOperator = false
        if (display.value == "0") display.value = ""
        display.value += btn.value
    })
})

btns_op.forEach((btn) => {
    btn.addEventListener('click', (evt) => {
        if (!digitoIsOperator) {
            digitoIsOperator = true
            if (display.value == "0" && !evt.target.value == ',') display.value = ""
                display.value += btn.value.replaceAll('\u{03c0}', `${Math.PI}`).replaceAll('x²', '²')
        }
    })
})

btns_utilities.forEach((btn) => {
    btn.addEventListener('click', () => {
        if (btn.value == 'C') {
            OperadoresEspeciais.clear()
        } else if (btn.value == '\u{232b}') {
            OperadoresEspeciais.del()
        } else if (btn.value == '=') {
            OperadoresEspeciais.equal()
        }
    })
})