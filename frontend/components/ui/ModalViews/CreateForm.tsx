"use client";
import { TicketForm, TicketStatus } from "@/types/type";
import InputField from "../InputField";
import Button from "../Button";
import { useEffect } from "react";

interface Props {
  form: TicketForm;
  setForm: React.Dispatch<React.SetStateAction<TicketForm>>;
  onClose: () => void;
  onSubmit: () => void;
}

const CreateForm = ({ form, setForm, onClose, onSubmit }: Props) => {
  useEffect(() => {
    console.log("FORM STATE:", form);
  }, [form]);
  return (
    <div className="flex flex-col gap-3">
      <InputField
        label="Başlık"
        name="title"
        value={form.title}
        type="text"
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />
      <InputField
        label="Açıklama"
        name="description"
        value={form.description}
        type="textarea"
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />
      <InputField
        name="status"
        type="select"
        label="Durum"
        value={form.status}
        onChange={(e) =>
          setForm({
            ...form,
            status: e.target.value as TicketStatus,
          })
        }
        options={[
          { label: "Bekliyor", value: "OPEN" },
          { label: "İşlemde", value: "IN_PROGRESS" },
          { label: "Kapalı", value: "CLOSED" },
        ]}
      />
      <InputField
        name="assignedTo"
        type="select"
        label="Atanan Kişi"
        value={form.assignedTo ? String(form.assignedTo) : ""}
        onChange={(e) =>
          setForm({
            ...form,
            assignedTo: e.target.value ? Number(e.target.value) : null,
          })
        }
        options={[
          { label: "Seçiniz", value: "" },

          // 👇 MANUEL ADMIN LİSTESİ
          { label: "Ahmet Koç", value: "6" },
          { label: "Yaren Yılmaz", value: "7" },
          { label: "Mehmet Koçak", value: "8" },
        ]}
      />
      <div className="flex justify-end gap-2 mt-3">
        <Button text="Kaydet" onClick={onSubmit} />
        <Button
          text="İptal Et"
          className="bg-red-800 hover:bg-red-600"
          onClick={onClose}
        />
      </div>
    </div>
  );
};

export default CreateForm;
