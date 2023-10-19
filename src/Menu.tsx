import { useTranslation } from "react-i18next";
import { supportedLanguages } from "./locale/i18n";

export const Menu = () => {
  const { i18n } = useTranslation();

  const onChangeLang = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lang_code = e.target.value;
    console.log("onChangeLang", lang_code);
    i18n.changeLanguage(lang_code);
  };

  return (
    <nav>
      <select defaultValue={i18n.language} onChange={onChangeLang}>
        {Object.values(supportedLanguages).map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </nav>
  );
};
