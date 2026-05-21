"use client";
import TransitionsModal from "@/components/ui/TransitionsModal";
import Search from "@/components/ui/Search";
import TableComponent from "@/components/ui/Table";
import { FiPlus } from "react-icons/fi";
import { useEffect, useState } from "react";
import { ModalMode, TicketForm, TicketType } from "@/types/type";
import CreateUpdateForm from "@/components/ui/ModalViews/CreateForm";
import DeleteConfirm from "@/components/ui/ModalViews/DeleteConfirm";
import InputField from "@/components/ui/InputField";
import Button from "@/components/ui/Button";
import {
  addTicketSuccess,
  getTicketsSuccess,
  ticketFail,
  ticketStart,
} from "@/store/slices/ticketSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { axiosClient } from "@/api/axiosClient";
import UpdateForm from "@/components/ui/ModalViews/UpdateForm";
import DeatilView from "@/components/ui/ModalViews/DetailView";
import { getComments, addComment } from "@/store/slices/commentSlice";
import { CommentType } from "@/types/type";

const Tickets = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<ModalMode>("create");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  const tickets = useSelector((state: RootState) => state.tickets.tickets);
  const comments = useSelector((state: RootState) => state.comments.comments);

  const [form, setForm] = useState<TicketForm>({
    title: "",
    description: "",
    status: "OPEN",
    assignedTo: null,
  });

  const fetchTickets = async (searchText = "") => {
    dispatch(ticketStart());
    try {
      const response = await axiosClient.get("/tickets", {
        params: { search: searchText },
      });

      dispatch(getTicketsSuccess(response.data.tickets));
    } catch (error) {
      dispatch(ticketFail("Talepler listelenirken hata oluştu."));
    }
  };

  const createTicket = async () => {
    try {
      dispatch(ticketStart());
      const response = await axiosClient.post("/tickets/createTicket", {
        ...form,
        assignedTo: Number(form.assignedTo),
      });
      const newTicket: TicketType = response.data;

      dispatch(addTicketSuccess(newTicket));
      fetchTickets();
      setModalOpen(false);
    } catch (error) {
      dispatch(ticketFail("Ticket oluşturulamadı"));
    }
  };

  const updateTicketStatus = async () => {
    if (!selectedId) return;

    dispatch(ticketStart());

    try {
      await axiosClient.put(`/tickets/updateTicketState/${selectedId}`, {
        status: form.status,
      });

      fetchTickets();
      setModalOpen(false);
    } catch (error) {
      dispatch(ticketFail("Durum güncellenemedi"));
    }
  };

  const fetchComments = async (ticketId: number) => {
    try {
      const res = await axiosClient.get<{ comments: CommentType[] }>(
        "/comments",
      );
      const filtered: CommentType[] = res.data.comments.filter(
        (c) => c.ticketId === ticketId,
      );
      console.log(comments);
      dispatch(getComments(filtered));
    } catch (err) {
      console.log(err);
    }
  };

  const addCommentTicket = async (text: string) => {
    if (!selectedId) return;
    try {
      const res = await axiosClient.post("/comments/createComment", {
        text,
        ticketId: selectedId,
      });
      console.log(res);
      dispatch(addComment(res.data.fullComment));
    } catch (err) {
      console.log("comment error", err);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchTickets(search);
    }, 400);

    return () => clearTimeout(timeout);
  }, [search]);

  const openCreateModal = () => {
    setForm({
      title: "",
      description: "",
      status: "OPEN",
      assignedTo: null,
    });

    setModalMode("create");
    setModalOpen(true);
  };

  const openUpdateModal = (row: TicketForm & { id: number }) => {
    setSelectedId(row.id);
    setForm({
      title: row.title,
      description: row.description,
      status: row.status,
      assignedTo: row.assignedTo,
    });

    setModalMode("update");
    setModalOpen(true);
  };

  const openDetailModal = (row: TicketForm & { id: number }) => {
    setForm(row);
    setSelectedId(row.id);
    fetchComments(row.id);
    setModalMode("detail");
    setModalOpen(true);
  };

  return (
    <div className="">
      <h1 className="font-semibold text-xl">Talepler</h1>
      <div className="flex items-center justify-between gap-2">
        <Search value={search} onChange={setSearch} />
        <Button
          text="Talep Ekle"
          icon={<FiPlus size={18} />}
          onClick={openCreateModal}
        />
      </div>
      <TransitionsModal
        open={modalOpen}
        title={
          modalMode === "create"
            ? "Talep Ekle"
            : modalMode === "update"
              ? "Talep Güncelle"
              : modalMode === "delete"
                ? "Talep Sil"
                : "Talep Detayı"
        }
        onClose={() => setModalOpen(false)}
      >
        {modalMode === "create" && (
          <CreateUpdateForm
            form={form}
            setForm={setForm}
            onClose={() => setModalOpen(false)}
            onSubmit={createTicket}
          />
        )}
        {modalMode === "update" && (
          <div className="flex flex-col gap-4">
            <UpdateForm form={form} setForm={setForm} />
            <div className="flex justify-end">
              <Button text="Güncelle" onClick={updateTicketStatus} />
            </div>
          </div>
        )}
        {modalMode === "delete" && (
          <DeleteConfirm
            message={`${form.title} talebini silmek istediğinize emin misiniz?`}
            onCancel={() => setModalOpen(false)}
            onConfirm={() => {
              console.log("DELETE:", form);
              setModalOpen(false);
            }}
          />
        )}
        {modalMode === "detail" && (
          <DeatilView
            form={form}
            comments={comments}
            onAddComment={addCommentTicket}
          />
        )}
      </TransitionsModal>
      <TableComponent
        data={tickets}
        onEdit={openUpdateModal}
        onDetail={openDetailModal}
      />
    </div>
  );
};

export default Tickets;
