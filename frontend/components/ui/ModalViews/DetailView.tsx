"use client";

import { TicketForm } from "@/types/type";
import InputField from "@/components/ui/InputField";
import Button from "@/components/ui/Button";
import { CommentType } from "@/types/type";
import { useState } from "react";

type Props = {
  form: TicketForm;
  comments: CommentType[];
  onAddComment: (text: string) => void;
};

// Veri tabanından ingilizce geliyor. Burada türkçeye çevrildi
const getStatusStyle = (status?: string) => {
  switch (status) {
    case "OPEN":
      return "bg-blue-100 text-blue-700";
    case "IN_PROGRESS":
      return "bg-yellow-100 text-yellow-700";
    case "CLOSED":
      return "bg-green-100 text-green-700";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

// ✅ SADECE TEXT MAP (CSS YOK)
const statusMap: Record<string, string> = {
  OPEN: "AÇIK",
  IN_PROGRESS: "İŞLEMDE",
  CLOSED: "KAPALI",
};

const DetailView = ({ form, comments, onAddComment }: Props) => {
  const [text, setText] = useState("");

  return (
    <div className="max-h-[400px] overflow-y-auto flex flex-col gap-6">
      {/* TICKET BİLGİLERİ */}
      <div className="bg-gray-50 rounded-xl p-4 space-y-3 border">
        <div>
          <p className="text-xs text-gray-500">Başlık</p>
          <p className="text-gray-700">{form.title}</p>
        </div>

        <div>
          <p className="text-xs text-gray-500">Açıklama</p>
          <p className="text-gray-700">{form.description}</p>
        </div>

        <div className="flex gap-6">
          <div>
            <p className="text-xs text-gray-500">Durum</p>

            <span
              className={`px-2 py-1 rounded text-xs font-medium ${getStatusStyle(
                form.status,
              )}`}
            >
              {/* ✅ SADECE BURASI DEĞİŞTİ */}
              {statusMap[form.status || "OPEN"]}
            </span>
          </div>
        </div>
      </div>

      {/* YORUMLAR */}
      <div className="bg-white border rounded-xl p-4">
        <h1 className="text-sm font-semibold text-gray-800 mb-1">
          💬 Yorumlar
        </h1>

        <div className="py-3 rounded overflow-y-auto">
          {comments.length === 0 ? (
            <p className="text-sm text-gray-500 text-center pb-2">
              Henüz yorum yok
            </p>
          ) : (
            comments.map((c) => (
              <div key={c.id} className="pb-2">
                <p className="text-sm font-semibold">
                  {c.user?.name} {c.user?.surname}
                </p>
                <p className="text-sm">{c.text}</p>
              </div>
            ))
          )}
        </div>

        {/* COMMENT INPUT */}
        <InputField
          name="comment"
          type="textarea"
          placeholder="Yorum yaz..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <div className="flex justify-end mt-3">
          <Button
            text="Gönder"
            onClick={() => {
              if (!text.trim()) return;
              onAddComment(text);
              setText("");
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default DetailView;
