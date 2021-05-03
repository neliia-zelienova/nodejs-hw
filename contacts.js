import path from "path";
import fs from "fs/promises";
import { v4 as uuidv4 } from "uuid";

const contactsPath = path.resolve("./db", "./contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.log(err);
  }
}

async function getContactById(contactId) {
  try {
    const data = await listContacts();
    return data.find((item) => item.id === Number(contactId));
  } catch (err) {
    console.log(err);
  }
}

async function removeContact(contactId) {
  const data = await listContacts();
  if (data.find((item) => item.id === Number(contactId))) {
    const newData = data.filter((item) => item.id !== Number(contactId));
    try {
      await fs.writeFile(contactsPath, JSON.stringify(newData));
      return newData;
    } catch (err) {
      console.log(err);
    }
  } else return data;
}
async function addContact(name, email, phone) {
  const data = await listContacts();
  const id = uuidv4();
  data.push({ id, name, email, phone });
  try {
    await fs.writeFile(contactsPath, JSON.stringify(data));
    return data;
  } catch (err) {
    console.log(err);
  }
}
export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
