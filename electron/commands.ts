import dayjs from "dayjs";

export const makeDump = () =>
  `mongodump.exe --uri "mongodb://localhost:27017/malynkadb?connect=direct" --out D:\\malynka_резервні_копії\\malynka_db_dump_${dayjs().format('DD.MM.YYYY_HH-mm-ss')}`;