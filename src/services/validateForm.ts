const rules: { [key: string]: RegExp } = {
  first_name: /^[A-ZА-Я][A-Za-zА-Яа-я-]*$/,
  second_name: /^[A-ZА-Я][A-Za-zА-Яа-я-]*$/,
  login: /^(?!^\d+$)[A-Za-z0-9_-]{3,20}$/,
  email: /^[A-Za-z0-9_-]+@[A-Za-z]+\.[A-Za-z]+$/,
  password: /^(?=.*[A-Z])(?=.*\d)[A-Za-z0-9]{8,40}$/,
  phone: /^\+?[0-9]{10,15}$/,
  message: /^.+$/,
};

const errorRules: { [key: string]: string } = {
  first_name:
    "латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис)",
  second_name:
    "латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис)",
  login:
    "от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание)",
  email:
    "латиница, может включать цифры и спецсимволы вроде дефиса и подчёркивания, обязательно должна быть «собака» (@) и точка после неё, но перед точкой обязательно должны быть буквы",
  password:
    "от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра",
  phone: "от 10 до 15 символов, состоит из цифр, может начинается с плюса",
  message: "не должно быть пустым",
};

export function validateInput(
  input: HTMLInputElement | HTMLTextAreaElement
): boolean {
  const rule = rules[input.name];
  const errorSpan = input.nextElementSibling as HTMLElement;

  if (rule && !rule.test(input.value.trim())) {
    console.log(`Некорректное значение в поле ${input.name}`);
    errorSpan.textContent = errorRules[input.name];
    return false;
  } else {
    console.log(input.value);
    errorSpan.textContent = "";
    return true;
  }
}

export function getForm(nameForm: string): { [key: string]: string } {
  const form = document.getElementById(nameForm);
  let formData: { [key: string]: string } = {};
  if (form) {
    const inputs = form.querySelectorAll("input");
    inputs?.forEach((input) => {
      const inputElement = input as HTMLInputElement;
      validateInput(inputElement);
      formData = { ...formData, [inputElement.name]: inputElement.value };
    });
    console.log(formData);
  }
  return formData;
}
