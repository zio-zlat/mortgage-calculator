import { Typography } from "../../shared/ui/typography/typography";
import styles from "./mortgageResults.module.scss";

type ResultsContentProps = {
  repayments: string;
  total: string
};

export const ResultsContent = ({ repayments, total }: ResultsContentProps) => {
  return (
    <>
      <Typography as="h2" variant="heading" color="white">
        Your results
      </Typography>
      <Typography color="subtle">
        Your results are shown below based on the information you provided. To
        adjust the results, edit the form and click “calculate repayments”
        again.
      </Typography>
      <div className={styles.results_content}>
        <Typography color="subtle">Your monthly repayments</Typography>
        <Typography
          as="span"
          variant="highlight-primary"
          color="accent"
          style={{ marginTop: "4px" }}
        >
          {`£${repayments}`}
        </Typography>
        <hr className={styles.results_content_separator} />
        <Typography color="subtle">Total you'll repay over the term</Typography>
        <Typography as="span" variant="highlight-secondary" color="white">
          {`£${total}`}
        </Typography>
      </div>
    </>
  );
};
