var RADIAN = Math.PI / 180;
var MIN_VALUE = 0.0001;
var MAX_VALUE = 1000000;
var TYPES = ["leg", "hypotenuse", "adjacent angle", "opposite angle", "angle",];
var isTriangleParam = function (t) {
    return TYPES.some(function (valid) { return valid === t; });
};
function triangle(value, type, value2, type2) {
    if (value === void 0) { value = 0; }
    if (type === void 0) { type = "leg"; }
    if (value2 === void 0) { value2 = 0; }
    if (type2 === void 0) { type2 = "leg"; }
    if (!isTriangleParam(type) || !isTriangleParam(type2)) {
        console.log("Помилка: некоректний тип параметра");
        return "failed";
    }
    if (value <= 0 || value2 <= 0) {
        console.log("Помилка: значення повинні бути більше 0");
        return "failed";
    }
    var isValid = function (x) {
        if (x <= MIN_VALUE) {
            console.log("\u041F\u043E\u043C\u0438\u043B\u043A\u0430: \u0437\u043D\u0430\u0447\u0435\u043D\u043D\u044F \u0437\u0430\u043D\u0430\u0434\u0442\u043E \u043C\u0430\u043B\u0435 (".concat(x, ")"));
            return false;
        }
        if (x >= MAX_VALUE) {
            console.log("\u041F\u043E\u043C\u0438\u043B\u043A\u0430: \u0437\u043D\u0430\u0447\u0435\u043D\u043D\u044F \u0437\u0430\u043D\u0430\u0434\u0442\u043E \u0432\u0435\u043B\u0438\u043A\u0435 (".concat(x, ")"));
            return false;
        }
        return true;
    };
    var a = 0;
    var b = 0;
    var c = 0;
    var alpha = 0;
    var beta = 0;
    if (type === "leg" && type2 === "leg") {
        a = value;
        b = value2;
        c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
        if (!isValid(c))
            return "failed";
        alpha = Math.atan(a / b) / RADIAN;
        beta = 90 - alpha;
    }
    else if ((type === "leg" && type2 === "hypotenuse") ||
        (type === "hypotenuse" && type2 === "leg")) {
        var leg = type === "leg" ? value : value2;
        var hyp = type === "hypotenuse" ? value : value2;
        if (leg >= hyp) {
            console.log("Помилка: катет не може бути більшим або рівним гіпотенузі");
            return "failed";
        }
        c = hyp;
        a = leg;
        b = Math.sqrt(Math.pow(c, 2) - Math.pow(a, 2));
        if (!isValid(b))
            return "failed";
        alpha = Math.asin(a / c) / RADIAN;
        beta = 90 - alpha;
    }
    else if ((type === "leg" && type2 === "adjacent angle") ||
        (type === "adjacent angle" && type2 === "leg")) {
        var leg = type === "leg" ? value : value2;
        var adjAngle = type === "adjacent angle" ? value : value2;
        if (adjAngle <= 0 || adjAngle >= 90) {
            console.log("Помилка: прилеглий кут повинен бути (0; 90)°");
            return "failed";
        }
        a = leg;
        b = a * Math.tan(adjAngle * RADIAN);
        c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
        if (!isValid(b) || !isValid(c))
            return "failed";
        alpha = 90 - adjAngle;
        beta = adjAngle;
    }
    else if ((type === "leg" && type2 === "opposite angle") ||
        (type === "opposite angle" && type2 === "leg")) {
        var leg = type === "leg" ? value : value2;
        var oppAngle = type === "opposite angle" ? value : value2;
        if (oppAngle <= 0 || oppAngle >= 90) {
            console.log("Помилка: протилежний кут повинен бути (0; 90)°");
            return "failed";
        }
        a = leg;
        c = a / Math.sin(oppAngle * RADIAN);
        b = Math.sqrt(Math.pow(c, 2) - Math.pow(a, 2));
        if (!isValid(b) || !isValid(c))
            return "failed";
        alpha = oppAngle;
        beta = 90 - oppAngle;
    }
    else if ((type === "hypotenuse" && type2 === "angle") ||
        (type === "angle" && type2 === "hypotenuse")) {
        var hyp = type === "hypotenuse" ? value : value2;
        var angle = type === "angle" ? value : value2;
        if (angle <= 0 || angle >= 90) {
            console.log("Помилка: кут повинен бути в межах (0; 90)°");
            return "failed";
        }
        c = hyp;
        a = c * Math.sin(angle * RADIAN);
        b = c * Math.cos(angle * RADIAN);
        if (!isValid(a) || !isValid(b))
            return "failed";
        alpha = angle;
        beta = 90 - angle;
    }
    else {
        console.log("Помилка: непідтримувана комбінація типів");
        return "failed";
    }
    console.log("a = ".concat(a.toFixed(2)) +
        "b = ".concat(b.toFixed(2)) +
        "c = ".concat(c.toFixed(2)) +
        "alpha = ".concat(alpha.toFixed(2), "\u00B0") +
        "beta = ".concat(beta.toFixed(2), "\u00B0"));
    return "success";
}
triangle(3, "leg", 4, "leg");
triangle(5, "hypotenuse", 30, "angle");
triangle(8, "leg", 53.13, "opposite angle");
triangle();
triangle(10, "leg");
triangle(6, "leg", 8, "hypotenuse");
