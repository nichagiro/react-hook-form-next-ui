/* eslint-disable @typescript-eslint/no-explicit-any */
import { faker } from '@faker-js/faker';

interface iRows {
  id: string;
  service: string;
  topic: string;
  date: string;
  value: number;
  status: string;
  subRows?: any
}

export const fakerRows = (index?: number): iRows[] => Array.from({ length: index ?? 20 }, (_, index) => {

  const data: iRows = {
    service: faker.person.jobArea(),
    topic: faker.lorem.paragraphs(),
    value: faker.number.int({ min: 100, max: 100000 }),
    date: faker.date.anytime().toISOString(),
    status: faker.helpers.arrayElement(["Activo", "Inactivo"]),
    id: (index + 1).toString(),
  }

  return data
})

export const fakerUsers = (index?: number) => Array.from({ length: index ?? 10 }, () => ({
  key: faker.string.nanoid(),
  label: faker.person.firstName()
}))


