import { useTranslation } from "react-i18next";
import { Typography } from "../../shared/ui/typography/typography";
import styles from "./mortgageResults.module.scss";

type ResultsContentProps = {
  repayments: string;
  total: string;
};

export const ResultsContent = ({ repayments, total }: ResultsContentProps) => {
  const { t } = useTranslation("results");

  return (
    <>
      <Typography as="h2" variant="heading" color="white">
        {t("content.heading")}
      </Typography>
      <Typography color="subtle">{t("content.description")}</Typography>
      <div className={styles.results_content}>
        <Typography color="subtle">{t("content.repayments")}</Typography>
        <Typography
          as="span"
          variant="highlight-primary"
          color="accent"
          style={{ marginTop: "4px" }}
        >
          {`${t("content.currency")}${repayments}`}
        </Typography>
        <hr className={styles.results_content_separator} />
        <Typography color="subtle">{t("content.total")}</Typography>
        <Typography as="span" variant="highlight-secondary" color="white">
          {`${t("content.currency")}${total}`}
        </Typography>
      </div>
    </>
  );
};
