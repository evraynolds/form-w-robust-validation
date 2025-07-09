import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { type ClaimInfo } from "./ClaimsContainer";

type ClaimsFormProps = {
  submitClaimFormHandler: (formData: ClaimInfo) => void;
};

const schema = yup
  .object({
    date: yup.string().required("Date is required"),
    category: yup.string().required("Category is required"),
    description: yup.string().required("Description is required"),
  })
  .required();

// The claims form takes a submitClaimFormHandler as a prop, when the
// form is suibmitted, this prop function is called in ClaimsContainer
const ClaimsForm = ({ submitClaimFormHandler }: ClaimsFormProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      date: "",
      category: "",
      description: "",
    },
  });
  const onSubmit: SubmitHandler<ClaimInfo> = (data) => {
    submitClaimFormHandler(data);
  };

  const cat = watch("category");
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      // onSubmit={handleSubmit(onSubmit)}
      // action={submitClaimFormHandler}
      className="claims-form"
    >
      <label htmlFor="claim-date">Claim Date</label>
      <input
        type="Date"
        id="claimDate"
        {...register("date", { required: true })}
        required
      />
      <p>{errors.date?.message}</p>

      <label htmlFor="category">Category</label>
      <input type="text" {...register("category", { required: true })}></input>
      <p>{cat}</p>
      <label>Description</label>
      <textarea
        {...register("description", {
          required: true,
          minLength: {
            value: 5,
            message: "Min length is 5",
          },
        })}
      />
      <p>{errors.description?.message}</p>
      <input type="submit" />
    </form>
  );
};

export default ClaimsForm;
