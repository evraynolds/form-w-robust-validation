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

  async function submitClaimFormHandler(formData: FormData) {
    // Here the claims data is extracted from the input elements
    const claimDate: string | undefined = formData.get("date")?.toString();
    const claimCategory: string | undefined = formData
      .get("category")
      ?.toString();
    const claimDescription: string | undefined = formData
      .get("description")
      ?.toString();

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
    }

    // Here is the POST request to the Express backend
    const claim = { claimDate, claimCategory, claimDescription };
    await fetch(`http://localhost:8080/receive`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(claim),
    });
  }

  // The claims form and existing claims are separated into their own components for readability and maintainability
  return (
    <section className="claims-handling-form-container">
      <h1>Claims Handling Form</h1>
      <ClaimsForm submitClaimFormHandler={submitClaimFormHandler} />
      <ExistingClaims claims={claims} />
    </section>
  );
};

export default ClaimsContainer;
