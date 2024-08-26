import { faker } from '@faker-js/faker';
import moment from 'moment';

interface iRows {
  id: string;
  service: string;
  topic: string;
  date: string;
  hour: string;
  status: string;
}

export const fakerRows = (): iRows[] => Array.from({ length: 20 }, () => ({
  service: faker.person.jobArea(),
  topic: faker.commerce.department(),
  hour: moment(faker.date.anytime()).format("YYYY-MM-DD"),
  date: moment(faker.date.anytime()).format("YYYY-MM-DD"),
  status: faker.helpers.arrayElement(["Activo", "Todos"]),
  id: faker.string.nanoid(),
}))


export const fakerUsers = () => Array.from({ length: 20 }, () => ({
  key: faker.string.nanoid(),
  label: faker.person.firstName()
}))

