import pinyin from "pinyin";

export type InitDataItem = Record<string, any> & {
  key: string;
};

export type FormatInitDataItem = InitDataItem & {
  key_PIN?: string;
};

function initDataToPin(data: Array<InitDataItem>) {
  const formatData = [] as Array<Record<string, any>>;
  data.forEach((item) =>
    formatData.push({
      ...item,
      key_PIN: pinyin(item.key, {
        style: "normal"
      }).join(" ")
    })
  );

  return formatData;
}

function keyWordToPin(key: string) {
  return pinyin(key, { style: "normal" }).join(" ");
}

export { initDataToPin, keyWordToPin };
