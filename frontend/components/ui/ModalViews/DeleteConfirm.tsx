"use client";

import Button from "@/components/ui/Button";

interface Props {
  title?: string;
  message?: string;
  onCancel: () => void;
  onConfirm: () => void;
  loading?: boolean;
}

const DeleteConfirm = ({
  title = "",
  message = "Bu işlemi yapmak istediğinize emin misiniz?",
  onCancel,
  onConfirm,
  loading = false,
}: Props) => {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-gray-600">{message}</p>

      <div className="flex justify-end gap-2 mt-3">
        <Button
          text="Sil"
          onClick={onConfirm}
          className="bg-red-800 hover:bg-red-600"
        />
      </div>
    </div>
  );
};

export default DeleteConfirm;
