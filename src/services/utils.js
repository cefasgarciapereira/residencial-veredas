export function parseMonthToInt(month) {
    let res = 0;
    switch (month) {
        case "janeiro":
            res = 1;
            break;
        case "fevereiro":
            res = 2;
            break;
        case "março":
            res = 3;
            break;
        case "abril":
            res = 4;
            break;
        case "maio":
            res = 5;
            break;
        case "junho":
            res = 6;
            break;
        case "julho":
            res = 7;
            break;
        case "agosto":
            res = 8;
            break;
        case "setembro":
            res = 9;
            break;
        case "outubro":
            res = 10;
            break;
        case "novembro":
            res = 11;
            break;
        case "dezembro":
            res = 12;
            break;
        default:
            break;
    }

    return res;
}

export function parseMonthToString(month) {
    if (month < 0 || month > 12) {
        throw "Invalid value for month"
    }

    let res = 0;
    switch (month) {
        case 1:
            res = "janeiro";
            break;
        case 2:
            res = "fevereiro";
            break;
        case 3:
            res = "março";
            break;
        case 4:
            res = "abril";
            break;
        case 5:
            res = "maio";
            break;
        case 6:
            res = "junho";
            break;
        case 7:
            res = "julho";
            break;
        case 8:
            res = "agosto";
            break;
        case 9:
            res = "setembro";
            break;
        case 10:
            res = "outubro";
            break;
        case 11:
            res = "novembro";
            break;
        case 12:
            res = "dezembro";
            break;
        default:
            break;
    }

    return res;
}

export function brlStringToFloat(brlString) {
    const cleanedString = brlString.replace("R$", "").trim();
    const numberString = cleanedString.replace(".", "").replace(",", ".");
    return parseFloat(numberString);
}

export function floatToBrlString(value) {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export function getMinimumValueFromArray(arr) {
    let minimum = arr[0]
    arr.forEach(item => {
        if (item < minimum) {
            minimum = item
        }
    })
    return minimum
}

export function getMaximumValueFromArray(arr) {
    let max = arr[0]
    arr.forEach(item => {
        if (item > max) {
            max = item
        }
    })
    return max
}
