import { useTranslation } from "react-i18next";
import { Typography } from "../../shared/ui/typography/typography";

export const ResultsPreview = () => {
  const { t } = useTranslation("results");

  return (
    <>
      <img
        src="src\assets\images\illustration-empty.svg"
        alt=""
        aria-hidden="true"
      />
      <Typography as="h2" variant="heading" color="white">
        {t("preview.heading")}
      </Typography>
      <Typography color="subtle">{t("preview.description")}</Typography>
    </>
  );
};
