type TriangleParamType = | "leg" | "hypotenuse" | "adjacent angle" | "opposite angle" | "angle";

const RADIAN: number = Math.PI / 180;
const MIN_VALUE: number = 0.0001;
const MAX_VALUE: number = 1_000_000;

const TYPES: readonly TriangleParamType[] = ["leg", "hypotenuse", "adjacent angle", "opposite angle", "angle",] as const;

const isTriangleParam = (t: string): t is TriangleParamType =>
  TYPES.some((valid) => valid === t);

function triangle(
  value: number = 0,
  type: TriangleParamType = "leg",
  value2: number = 0,
  type2: TriangleParamType = "leg"
): "success" | "failed" {

  if (!isTriangleParam(type) || !isTriangleParam(type2)) {
    console.log("Помилка: некоректний тип параметра");
    return "failed";
  }

  if (value <= 0 || value2 <= 0) {
    console.log("Помилка: значення повинні бути більше 0");
    return "failed";
  }

  const isValid = (x: number): boolean => {
    if (x <= MIN_VALUE) {
      console.log(`Помилка: значення занадто мале (${x})`);
      return false;
    }
    if (x >= MAX_VALUE) {
      console.log(`Помилка: значення занадто велике (${x})`);
      return false;
    }
    return true;
  };

  let a: number = 0;
  let b: number = 0;
  let c: number = 0;
  let alpha: number = 0;
  let beta: number = 0;

  if (type === "leg" && type2 === "leg") {
    a = value;
    b = value2;
    c = Math.sqrt(a ** 2 + b ** 2);
    if (!isValid(c)) return "failed";
    alpha = Math.atan(a / b) / RADIAN;
    beta = 90 - alpha;
  }

  else if (
    (type === "leg" && type2 === "hypotenuse") ||
    (type === "hypotenuse" && type2 === "leg")
  ) {
    const leg: number = type === "leg" ? value : value2;
    const hyp: number = type === "hypotenuse" ? value : value2;

    if (leg >= hyp) {
      console.log("Помилка: катет не може бути більшим або рівним гіпотенузі");
      return "failed";
    }

    c = hyp;
    a = leg;
    b = Math.sqrt(c ** 2 - a ** 2);
    if (!isValid(b)) return "failed";

    alpha = Math.asin(a / c) / RADIAN;
    beta = 90 - alpha;
  }

  else if (
    (type === "leg" && type2 === "adjacent angle") ||
    (type === "adjacent angle" && type2 === "leg")
  ) {
    const leg: number = type === "leg" ? value : value2;
    const adjAngle: number = type === "adjacent angle" ? value : value2;

    if (adjAngle <= 0 || adjAngle >= 90) {
      console.log("Помилка: прилеглий кут повинен бути (0; 90)°");
      return "failed";
    }

    a = leg;
    b = a * Math.tan(adjAngle * RADIAN);
    c = Math.sqrt(a ** 2 + b ** 2);

    if (!isValid(b) || !isValid(c)) return "failed";

    alpha = 90 - adjAngle;
    beta = adjAngle;
  }

  else if (
    (type === "leg" && type2 === "opposite angle") ||
    (type === "opposite angle" && type2 === "leg")
  ) {
    const leg: number = type === "leg" ? value : value2;
    const oppAngle: number = type === "opposite angle" ? value : value2;

    if (oppAngle <= 0 || oppAngle >= 90) {
      console.log("Помилка: протилежний кут повинен бути (0; 90)°");
      return "failed";
    }

    a = leg;
    c = a / Math.sin(oppAngle * RADIAN);
    b = Math.sqrt(c ** 2 - a ** 2);

    if (!isValid(b) || !isValid(c)) return "failed";

    alpha = oppAngle;
    beta = 90 - oppAngle;
  }

  else if (
    (type === "hypotenuse" && type2 === "angle") ||
    (type === "angle" && type2 === "hypotenuse")
  ) {
    const hyp: number = type === "hypotenuse" ? value : value2;
    const angle: number = type === "angle" ? value : value2;

    if (angle <= 0 || angle >= 90) {
      console.log("Помилка: кут повинен бути в межах (0; 90)°");
      return "failed";
    }

    c = hyp;
    a = c * Math.sin(angle * RADIAN);
    b = c * Math.cos(angle * RADIAN);

    if (!isValid(a) || !isValid(b)) return "failed";

    alpha = angle;
    beta = 90 - angle;
  }

  else {
    console.log("Помилка: непідтримувана комбінація типів");
    return "failed";
  }

  console.log(
    `a = ${a.toFixed(2)}` +
    `b = ${b.toFixed(2)}` +
    `c = ${c.toFixed(2)}` +
    `alpha = ${alpha.toFixed(2)}°` +
    `beta = ${beta.toFixed(2)}°`
  );

  return "success";
}

triangle(3, "leg", 4, "leg");
triangle(5, "hypotenuse", 30, "angle");
triangle(8, "leg", 53.13, "opposite angle");
triangle();                    
triangle(10, "leg");           
triangle(6, "leg", 8, "hypotenuse");  
