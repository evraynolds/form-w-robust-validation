type ClaimsFormProps = {
  submitClaimFormHandler: (formData: FormData) => Promise<void>;
};

// The claims form takes a submitClaimFormHandler as a prop, when the
// form is suibmitted, this prop function is called in ClaimsContainer
const ClaimsForm = ({ submitClaimFormHandler }: ClaimsFormProps) => {
  return (
    <form action={submitClaimFormHandler} className="claims-form">
      <label htmlFor="claim-date">Claim Date</label>
      <input type="Date" id="claimDate" name="date" required />
      <input type="button" value="Next" />
      <label htmlFor="category">Category</label>
      <input type="text" name="category" required></input>
      <input type="button" value="Next" />
      <label>Description</label>
      <textarea name="description" required />
      <input type="submit" />
    </form>
  );
};

export default ClaimsForm;
