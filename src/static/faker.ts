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
  date: moment(faker.date.anytime()).format("YYYY-MM-DD"),
  hour: moment(faker.date.anytime()).format("YYYY-MM-DD"),
  id: faker.string.nanoid(),
  service: faker.person.jobArea(),
  status: faker.helpers.arrayElement(["Activo", "Todos"]),
  topic: faker.commerce.department()
}))


export const fakerUsers = () => Array.from({ length: 20 }, () => ({
  id: faker.string.nanoid(),
  name: faker.person.firstName()
}))

