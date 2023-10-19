import { useEffect } from "react";
import { I18nextProvider, useTranslation } from "react-i18next";
import "./App.css";
import Landing from "./Landing";
import i18n, { loadLanguage } from "./locale/i18n";

function App() {
  const { i18n: i18nGlobal } = useTranslation();

  const appNameSpace = "app";

  useEffect(() => {
    loadLanguage(i18nGlobal.language, appNameSpace);
  }, [i18nGlobal.language]);

  return (
    <I18nextProvider i18n={i18n} defaultNS={appNameSpace}>
      <Landing />
    </I18nextProvider>
  );
}

export default App;
