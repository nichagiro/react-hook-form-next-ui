import { printValue, LocaleObject } from 'yup';

export const mixed: LocaleObject['mixed'] = {
  default: 'Este valor no es válido.',
  required: 'Este campo es obligatorio',
  defined: 'Este campo debe definirse',
  notNull: 'Este campo no puede ser nulo',
  oneOf: 'Este campo debe ser uno de los siguientes valores: ${values}',
  notOneOf: 'Este campo no debe ser uno de los siguientes valores: ${values}',
  notType: ({ type, value, originalValue }) => {
    const isCast = originalValue != null && originalValue !== value;
    let msg =
      `Debe ser un \`${type}\` Tipo, ` +
      `Pero el valor final fue: \`${printValue(value, true)}\`` +
      (isCast
        ? ` (Eche el valor \`${printValue(originalValue, true)}\`).`
        : '.');

    if (value === null) {
      msg +=
        `\n Si "nulo" está destinado a ser un valor vacío, asegúrese de marcar el esquema como` +
        ' `.nullable()`';
    }

    return msg;
  },
};

export const string: LocaleObject['string'] = {
  length: 'Debe ser exactamente ${length} caracteres',
  min: 'Debe ser al menos ${min} caracteres',
  max: 'Debe ser como máximo ${max} caracteres',
  matches: 'Este valor no es válido',
  email: 'Debe ser un correo electrónico válido',
  url: 'Debe ser una URL válida',
  uuid: 'Debe ser un UUID válido',
  trim: 'No debe tener espacios vacios',
  lowercase: 'Debe ser un texto en minúscula',
  uppercase: 'Debe ser un texto en mayúscula',
};

export const number: LocaleObject['number'] = {
  min: 'Debe ser mayor o igual a ${min}',
  max: 'Debe ser menor o igual a ${max}',
  lessThan: 'Debe ser menor que ${less}',
  moreThan: 'Debe ser mayor que ${more}',
  positive: 'Debe ser un número positivo',
  negative: 'Debe ser un número negativo',
  integer: 'Debe ser un entero',
};

export const date: LocaleObject['date'] = {
  min: 'El campo debe ser más tarde que ${min}',
  max: 'El campo debe estar antes de ${max}',
};

export const boolean: LocaleObject['boolean'] = {
  isValue: 'El campo debe ser ${value}',
};

export const object: LocaleObject['object'] = {
  noUnknown:
    'El campo no puede tener claves no especificadas en la forma del objeto',
};

export const array: LocaleObject['array'] = {
  min: 'El campo debe tener al menos ${min} elementos',
  max: 'El campo debe tener menos o igual a los elementos ${max}',
  length: 'Debe tener ${length} elementos',
};
