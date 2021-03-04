import lowdb from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import { nanoid } from 'nanoid';

const idlength = 8;
const faverAdapter = new FileSync('server/lowdb/faver.json');

interface FaverShape {
  id?: string,
  url: string,
  name: string,
  mainImg?: string
}

class Faver {
  private db: lowdb.LowdbSync<any>

  constructor() {
    this.db = lowdb(faverAdapter);

    this.init();
  }

  init() {
    this.db.defaults({ favers: [] })
      .write();
  }

  addOne(data: FaverShape) {
    this.db.get('favers')
      // @ts-ignore
      .push({
        ...data,
        id: nanoid(idlength),
      })
      .write();
  }

  removeOne(id: string) {
    this.db.get('favers')
      // @ts-ignore
      .remove({ id })
      .write();
  }

  getAllFavers() {
    return this.db.get('favers').value();
  }
}

const faverInstance = new Faver();

module.exports = {
  faver: faverInstance,
};
