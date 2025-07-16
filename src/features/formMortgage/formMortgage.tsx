import { useState } from "react";
import { RadioGroup } from "../../shared/ui/radioGroup/radioGroup";
import { TextInputField } from "../../shared/ui/textInputField/textInputField";
import styles from "./formMortgage.module.scss";

export const FormMortgage = () => {
  //useState и options будут переданы через пропс, сейчас сделал для теста
  const [selectedRadio, setSelectedRadio] = useState("");

  const options = [
    { label: "Repayment", value: "repayment" },
    { label: "Interest only", value: "interest" },
  ];

  return (
    <form className={styles.formMortgage}>
      <TextInputField
        type="number"
        name="amount"
        label="Mortgage Amount"
        labelVariant="label-sm"
        labelColor="muted"
        affix={{ type: "prefix", content: "£" }}
        className={styles.bigСolumn}
      />
      <TextInputField
        type="number"
        name="term"
        label="Mortgage Term"
        labelVariant="label-sm"
        labelColor="muted"
        affix={{ type: "suffix", content: "years" }}
        className={styles.smallLeftColumn}
      />
      <TextInputField
        type="number"
        name="interestRate"
        label="Interest Rate"
        labelVariant="label-sm"
        labelColor="muted"
        affix={{ type: "suffix", content: "%" }}
        className={styles.smallRightColumn}
      />
      <RadioGroup
        title="Mortgage Type"
        name="mortgageType"
        value={selectedRadio}
        options={options}
        onClickRadio={setSelectedRadio}
        className={styles.bigСolumn}
      />
    </form>
  );
};
