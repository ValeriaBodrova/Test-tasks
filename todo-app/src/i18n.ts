import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "Todo App": "Todo App",
      "Add a new todo": "Add a new todo",
      "Add": "Add",
      "Uncompleted": "Uncompleted",
      "Completed": "Completed",
      "Save": "Save",
      "Edit": "Edit",
      "Delete": "Delete",
      "Todo text is required": "Todo text is required"
    }
  },
  // Інші мови
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", 
    interpolation: {
      escapeValue: false 
    }
  });

export default i18n;
