import clsx from "clsx";
import type { TResults } from "../../shared/types/mortgagePage";
import styles from "./mortgageResults.module.scss";
import { ResultsPreview } from "./ResultsPreview";
import { ResultsContent } from "./ResultsContent";
import { numberFormat } from "../../shared/config/utils/utils";
import { memo } from "react";
import i18n from "../../app/i18n";

type MortgageResultsProps = {
  results: TResults;
};

export const MortgageResults = memo(({ results }: MortgageResultsProps) => {
  const resultsHasNull = Object.values(results).some((value) => value === null);

  const repayments = numberFormat(results.monthlyRepayments, i18n.language);
  const total = numberFormat(results.total, i18n.language);

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
