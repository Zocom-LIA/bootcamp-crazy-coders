import { Handler, middyfy } from "@lib/middywrapper.js";
import { failedResponse, createResponse } from "@util/response.js";
import middyAppKeyObj from "@lib/middyAppKeyObj.js";
import { createMenuItemFrom, createPriceListFrom } from "@yumtypes/index.js";
import { createPutRequestParams } from "@params/index.js";
import { execPutRequest } from "@database/services/index.js";

let menu = {
  wontons: [
    {
      name: "Karlstad",
      desc: "En god friterad wonton med smaker från de värmländska skogarna.",
      ingredients: ["kantarell", "scharlottenlök", "morot", "bladpersilja"],
      price: 9,
      cookingTime: 9,
    },
    {
      name: "Bangkok",
      desc: "En god friterad wonton med smaker från Bangkoks gator.",
      ingredients: [
        "morot",
        "salladslök",
        "chili",
        "kokos",
        "lime",
        "koriander",
      ],
      price: 9,
      cookingTime: 10,
    },
    {
      name: "Ho Chi Minh",
      desc: "En god friterad wonton med smaker från vietnams matkultur.",
      ingredients: [
        "kål",
        "morot",
        "salladslök",
        "chili",
        "vitlök",
        "ingefära",
        "tofu",
      ],
      price: 9,
      cookingTime: 8,
    },
    {
      name: "Paris",
      desc: "En god friterad wonton med smaker från det franska köket.",
      ingredients: ["kål", "honung", "chevré", "basilika", "valnötspasta"],
      price: 9,
      cookingTime: 12,
    },
    {
      name: "Oaxaca",
      desc: "En god friterad wonton med smaker från mexicos kryddiga matkultur.",
      ingredients: ["majs", "tomat", "rostade ärtor", "vitlök", "lime"],
      price: 9,
      cookingTime: 11,
    },
  ],
  dip: [
    {
      name: "Sweet Chili",
      desc: "Stark och söt dip från Thailänska höglandet.",
      price: 19,
    },
    {
      name: "Sweet n Sour",
      desc: "Klassiska sötsura dipsåsen från Kina.",
      price: 19,
    },
    {
      name: "Guacamole",
      desc: "Avocado, tomat och kryddor i optimal kombination.",
      price: 19,
    },
    {
      name: "Wonton Standard",
      desc: "Smaksatt olja med soya, chili, vitlök & ingefära.",
      price: 19,
    },
    {
      name: "Hot Mango",
      desc: "Kryddstark och söt chunky mangodip.",
      price: 19,
    },
    {
      name: "Chili Mayo",
      desc: "Egengjord majonäs smaksatt med chili.",
      price: 19,
    },
  ],
};

const writeMenu = async () => {
  let priceList = createPriceListFrom(menu);
  let menuItem = createMenuItemFrom(menu, priceList);
  let params = createPutRequestParams(menuItem);
  return execPutRequest(params);
};

const table: Handler<void, void, void> = async (_) => {
  try {
    let dbResponse = await writeMenu();
    return createResponse(dbResponse.statusCode, {
      message: dbResponse.statusMessage,
    });
  } catch (error) {
    return failedResponse(error);
  }
};

const handler = middyfy(table, null, middyAppKeyObj());
export { handler };
