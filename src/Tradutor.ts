import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "actionTitle": "Action",
    }
  },
  pt: {
    translation: {
      "actionTitle": "Ação",
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "pt-br",
    keySeparator: false,
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
