export function parseMonth(month) {
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