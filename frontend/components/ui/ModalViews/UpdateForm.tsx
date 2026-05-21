import React from "react";
import InputField from "@/components/ui/InputField";
import { TicketForm } from "@/types/type";

type Props = {
  form: TicketForm;
  setForm: React.Dispatch<React.SetStateAction<TicketForm>>;
};

// Sadece status durumunu güncellemek için kullanılıyor. Daha sonra kapsamı artırılabilir.
const UpdateForm = ({ form, setForm }: Props) => {
  return (
    <InputField
      name="status"
      label="Durum"
      type="select"
      value={form.status}
      onChange={(e) =>
        setForm({
          ...form,
          status: e.target.value as TicketForm["status"],
        })
      }
      options={[
        { label: "AÇIK", value: "OPEN" },
        { label: "İŞLEMDE", value: "IN_PROGRESS" },
        { label: "KAPALI", value: "CLOSED" },
      ]}
    />
  );
};

export default UpdateForm;
