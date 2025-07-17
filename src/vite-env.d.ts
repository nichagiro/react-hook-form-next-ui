/// <reference types="vite/client" />

interface IRows {
  id: string | number;
  service: string;
  topic: string;
  date: string;
  value: number;
  status: string;
  sub?: IRows[]
}
