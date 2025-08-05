import RadioButtons from "@/components/RadioButtons/RadioButtons";
import CreateSeasonForm from "@/components/forms/CreateSeasonForm/CreateSeasonForm";

export default async function CreateSeason() {
  return (
    <div className="wrapper">
      <RadioButtons activeSection="season" />
      <CreateSeasonForm />
    </div>
  );
}
