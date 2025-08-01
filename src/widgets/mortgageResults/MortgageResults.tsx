import clsx from "clsx";
import type { TResults } from "../../shared/types/mortgagePage";
import styles from "./mortgageResults.module.scss";
import { ResultsPreview } from "./ResultsPreview";
import { ResultsContent } from "./ResultsContent";
import { numberFormat } from "../../shared/config/utils/utils";
import { memo } from "react";
import type { TLocales } from "../../shared/config/constants/locales";

type MortgageResultsProps = {
  results: TResults;
  locales: TLocales
};

export const MortgageResults = memo(({ results, locales }: MortgageResultsProps) => {
  const resultsHasNull = Object.values(results).some((value) => value === null);

  const repayments = numberFormat(results.monthlyRepayments, locales);
  const total = numberFormat(results.total, locales);

  return (
    <div
      className={clsx(
        styles.results,
        resultsHasNull ? styles.results_preview : ""
      )}
    >
      {resultsHasNull ? (
        <ResultsPreview />
      ) : (
        <ResultsContent repayments={repayments} total={total} />
      )}
    </div>
  );
});
