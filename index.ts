import * as lyra from "@lyrasearch/lyra";
import type { PropertiesSchema } from "@lyrasearch/lyra";
import { initDataToPin, keyWordToPin } from "./util";
import type { InitDataItem, FormatInitDataItem } from "./util";

const { create, insert, insertBatch, remove, search } = lyra;

/**
 * schema type for init db
 */
export type SchemaType = PropertiesSchema & {
  key: string;
};

/**
 * init initDB
 */
export type InitDB = (schema: SchemaType) => Promise<unknown>;

const init: InitDB = (schema: SchemaType) => {
  return new Promise((resolve, reject) => {
    const { key } = schema;
    if (!key) reject(new Error("need param which is called 'key'."));
    try {
      const db = create({
        schema: { ...schema }
      });
      if (db) resolve(db);
    } catch (error) {
      reject(`init db failed, reason: ${error}.`);
    }
  });
};

const add = (db: lyra.Lyra<any>, data: InitDataItem) => {
  const { key } = data;
  if (!key) {
    console.error("need param which is called 'key'.");
    return;
  }

  return new Promise((resolve, reject) => {
    const key_CN = keyWordToPin(key);
    try {
      insert(db, { key_CN, ...data });
      resolve("success");
    } catch (error) {
      reject(`add new item failed, reason: ${error}.`);
    }
  });
};

// export { init, insert, insertBatch, remove };

// async function insertData(db, data) {
//   await insertBatch(db, [...data]);
// }

// function searchResult(db, keyword) {
//   const result = search(db, {
//     term: keyword,
//     properties: "*"
//   });

//   return result;
// }

// const db = initDB();
// const formatData = toPin(data);

// insertData(db, formatData).then(() => {
//   const result = searchResult(db, pinyin("版本", { style: "normal" }).join(" "));
//   console.log("result:", result);
// });
