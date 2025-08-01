import { Typography } from "../../shared/ui/typography/typography";

export const ResultsPreview = () => {
  return (
    <>
      <img
        src="src\assets\images\illustration-empty.svg"
        alt=""
        aria-hidden="true"
      />
      <Typography as="h2" variant="heading" color="white">
        Results shown here
      </Typography>
      <Typography color="subtle">
        Complete the form and click “calculate repayments” to see what your
        monthly repayments would be.
      </Typography>
    </>
  );
};
