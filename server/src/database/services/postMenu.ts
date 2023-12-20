import { createWontonItemFrom, createDipItemFrom } from "@yumtypes/index.js";
import { putRequestItem, batchWriteParams } from "@params/index.js";
import { PutRequestItem } from "@yumtypes/index.js";
import { exeBatchWrite } from ".";

let menu = {
  wontons: [
    {
      id: "2bb776c1-a972-4fd0-a4e6-c4623edcce8e",
      name: "Karlstad",
      desc: "En god friterad wonton med smaker från de värmländska skogarna.",
      ingredients: ["kantarell", "scharlottenlök", "morot", "bladpersilja"],
      price: 9,
      cookingTime: 9,
    },
    {
      id: "55c29993-d964-4a7d-81b6-ebe67a37744d",
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
      id: "f149cf48-a102-4bee-8727-49020044815d",
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
      id: "c6c1ba4d-a001-4fb0-a2b5-02e616d16b89",
      name: "Paris",
      desc: "En god friterad wonton med smaker från det franska köket.",
      ingredients: ["kål", "honung", "chevré", "basilika", "valnötspasta"],
      price: 9,
      cookingTime: 12,
    },
    {
      id: "d61e038d-d58c-46c6-9586-6fbc4ca7812c",
      name: "Oaxaca",
      desc: "En god friterad wonton med smaker från mexicos kryddiga matkultur.",
      ingredients: ["majs", "tomat", "rostade ärtor", "vitlök", "lime"],
      price: 9,
      cookingTime: 11,
    },
  ],
  dip: [
    {
      id: "66608e20-a2e1-4217-9953-51a05d34aa02",
      name: "Sweet Chili",
      desc: "Stark och söt dip från Thailänska höglandet.",
      price: 19,
    },
    {
      id: "55059925-a4d9-40e7-ae75-387a809327d0",
      name: "Sweet n Sour",
      desc: "Klassiska sötsura dipsåsen från Kina.",
      price: 19,
    },
    {
      id: "65f17642-11c1-45f0-a740-507981afd71c",
      name: "Guacamole",
      desc: "Avocado, tomat och kryddor i optimal kombination.",
      price: 19,
    },
    {
      id: "0e354448-9f53-48b0-a07a-f74d315abebf",
      name: "Wonton Standard",
      desc: "Smaksatt olja med soya, chili, vitlök & ingefära.",
      price: 19,
    },
    {
      id: "38561e36-5a50-4806-93df-d836e458ebcf",
      name: "Hot Mango",
      desc: "Kryddstark och söt chunky mangodip.",
      price: 19,
    },
    {
      id: "f7e345c9-3781-494b-a735-3df375fa6c8a",
      name: "Chili Mayo",
      desc: "Egengjord majonäs smaksatt med chili.",
      price: 19,
    },
  ],
};

const generateMenu = (): PutRequestItem[] => {
  const data: PutRequestItem[] = [];
  menu.wontons.forEach((wonton) => {
    let item = createWontonItemFrom(wonton);
    let req = putRequestItem(item);
    data.push(req);
  });
  menu.dip.forEach((dip) => {
    let item = createDipItemFrom(dip);
    let req = putRequestItem(item);
    data.push(req);
  });

  return data;
};

export const writeMenu = async () => {
  let menuItems = generateMenu();
  let params = batchWriteParams(menuItems);
  return await exeBatchWrite(params);
};
