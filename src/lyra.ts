import * as lyra from "@lyrasearch/lyra";
import type { PropertiesSchema } from "@lyrasearch/lyra";
import { initDataToPin, keyWordToPin } from "./util";
import type { InitDataItem, FormatInitDataItem } from "./util";

const { create, insert, insertBatch, remove, search: searchResult } = lyra;

/**
 * schema type for init db
 */
export type SchemaType = PropertiesSchema & {
  key: "string";
};

/**
 * init initDB
 */
export type InitDB = (schema: SchemaType) => lyra.Lyra<any>;

/**
 * insert a new record into db.
 */
export type AddNewItem = (db: lyra.Lyra<any>, data: InitDataItem) => void;

/**
 * insert new record into db by batch.
 */
export type AddByBatch = (db: lyra.Lyra<any>, data: Array<InitDataItem>) => Promise<void>;

/**
 * search
 */
export type Search = (db: lyra.Lyra<any>, keyWord: string) => Array<InitDataItem>;

const init: InitDB = (schema: SchemaType) => {
  const { key } = schema;
  if (!key) {
    console.error("need param which is called 'key'.");
    return;
  }
  const db = create({
    schema: { key_PIN: "string", ...schema },
    defaultLanguage: "english"
  }) ;

  return db as any;
};

const add: AddNewItem = (db: lyra.Lyra<any>, data: InitDataItem) => {
  const { key } = data;
  if (!key) {
    console.error("need param which is called 'key'.");
    return;
  }
  const key_PIN = keyWordToPin(key);
  insert(db, { key_PIN, ...data });
};

const addByBatch: AddByBatch = async (db: lyra.Lyra<any>, data: Array<InitDataItem>) => {
  const haveKey = data.every((e) => "key" in e);
  if (!haveKey) {
    console.error("every item need param which is called 'key'.");
    return;
  }
  const formatData = initDataToPin(data);
  await insertBatch(db, [...formatData]);
};

const search: Search = (db: lyra.Lyra<any>, keyWord: string) => {
  let result: Array<FormatInitDataItem> = [];
  const key_PIN = keyWordToPin(keyWord);

  if (key_PIN) {
    // @ts-ignore
    const res = searchResult(db, { term: key_PIN, properties: "*" });
    if (res && res.hits) {
      res?.hits.forEach((e) => delete e.key_PIN);
      result = [...res.hits] as unknown as Array<InitDataItem>;
    }
  }

  return result;
};

function useLyra() {
  return {
    init,
    add,
    addByBatch,
    search,
    remove
  };
}

export { useLyra };
