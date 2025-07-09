import { useState } from "react";

import ClaimsForm from "./ClaimsForm";
import ExistingClaims from "./ExistingClaims";

import "./ClaimsContainer.css";

export type ClaimInfo = {
  date: string;
  category: string;
  description: string;
};

const ClaimsContainer = () => {
  const [claims, setClaims] = useState<ClaimInfo[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  async function postInputToServer(claim: ClaimInfo) {
    setIsSubmitting(true);
    await fetch(`http://localhost:8080/receive`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(claim),
    });
    setIsSubmitting(false);
  }

  function submitClaimFormHandler({ date, category, description }: ClaimInfo) {
    // Here the claims data is extracted from the input elements
    const claimDate: string | undefined = date;
    const claimCategory: string | undefined = category;
    const claimDescription: string | undefined = description;

    const validInput = claimDate && claimCategory && claimDescription;
    if (validInput) {
      setClaims([
        ...claims,
        {
          date: claimDate,
          category: claimCategory,
          description: claimDescription,
        },
      ]);

      // Here is the POST request to the Express backend
      const claim = {
        date: claimDate,
        category: claimCategory,
        description: claimDescription,
      };
      postInputToServer(claim);
    }
  }

  // The claims form and existing claims are separated into their own components for readability and maintainability
  return (
    <section className="claims-handling-form-container">
      <h1>Claims Handling Form</h1>
      {isSubmitting ? (
        <p>Submitting Claim</p>
      ) : (
        <ClaimsForm submitClaimFormHandler={submitClaimFormHandler} />
      )}
      <ExistingClaims claims={claims} />
    </section>
  );
};

export default ClaimsContainer;
