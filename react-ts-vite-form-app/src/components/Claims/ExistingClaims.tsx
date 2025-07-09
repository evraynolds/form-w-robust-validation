import type { ClaimInfo } from "./ClaimsContainer";

type ExistingClaimsProps = {
  claims: ClaimInfo[];
};

// Existing claims are stored in a state variable passd down as a prop and mapped
// to display as a list
const ExistingClaims = ({ claims }: ExistingClaimsProps) => {
  return (
    <section>
      <h2>Existing Claims</h2>
      {claims.map((claim: ClaimInfo, index: number) => (
        <section key={index}>
          <ul>
            <li>
              {claim.date} {claim.category}
            </li>
            <li>{claim.description}</li>
          </ul>
        </section>
      ))}
    </section>
  );
};

export default ExistingClaims;
