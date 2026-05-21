"use client";

import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

import { FiEdit } from "react-icons/fi";
import { HiOutlineInformationCircle } from "react-icons/hi2";

import { TicketType } from "@/types/type";

interface Column {
  id:
    | "title"
    | "description"
    | "status"
    | "assignedTo"
    | "createdBy"
    | "actions";

  label: string;
  minWidth?: number;
  align?: "right" | "center" | "left";
}

interface TableProps {
  data: TicketType[];
  onEdit: (row: TicketType) => void;
  onDetail: (row: TicketType) => void;
}

const columns: readonly Column[] = [
  { id: "title", label: "Başlık", minWidth: 220 },
  { id: "description", label: "Açıklama", minWidth: 300 },
  { id: "status", label: "Durum", minWidth: 140 },
  { id: "assignedTo", label: "Atanan Kişi", minWidth: 180 },
  { id: "createdBy", label: "Oluşturan", minWidth: 180 },
  { id: "actions", label: "İşlemler", minWidth: 140, align: "center" },
];

export default function TableComponent({ data, onEdit, onDetail }: TableProps) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(Number(event.target.value));
    setPage(0);
  };

  // Veri tabanından ingilizce olarak geliyor. Burada türkçeye çevrildi.
  const statusMap: Record<string, { label: string; className: string }> = {
    OPEN: {
      label: "AÇIK",
      className: "bg-blue-100 text-blue-700",
    },
    IN_PROGRESS: {
      label: "İŞLEMDE",
      className: "bg-yellow-100 text-yellow-700",
    },
    CLOSED: {
      label: "KAPALI",
      className: "bg-green-100 text-green-700",
    },
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", borderRadius: 3 }}>
      <TableContainer sx={{ maxHeight: 450 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  className="text-sm"
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  Henüz Talep Girilmedi
                </TableCell>
              </TableRow>
            ) : (
              data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow key={row.id ?? crypto.randomUUID()} hover>
                    {columns.map((column) => {
                      if (column.id === "actions") {
                        return (
                          <TableCell key={`${row.id}-actions`} align="center">
                            <div className="flex items-center justify-center gap-3">
                              <HiOutlineInformationCircle
                                size={20}
                                className="text-green-600 cursor-pointer"
                                onClick={() => onDetail(row)}
                              />
                              <FiEdit
                                size={18}
                                className="text-blue-600 cursor-pointer"
                                onClick={() => onEdit(row)}
                              />
                            </div>
                          </TableCell>
                        );
                      }

                      let value: React.ReactNode = "-";

                      switch (column.id) {
                        case "title":
                        case "description":
                          value = row[column.id] ?? "-";
                          break;

                        case "status": {
                          const status = statusMap[row.status];

                          value = (
                            <span
                              className={`px-2 py-1 rounded text-xs font-medium ${
                                status?.className ?? "bg-gray-100 text-gray-700"
                              }`}
                            >
                              {status?.label ?? row.status}
                            </span>
                          );
                          break;
                        }

                        case "assignedTo":
                          value = row.assignedAdmin
                            ? `${row.assignedAdmin.name} ${row.assignedAdmin.surname}`
                            : "-";
                          break;

                        case "createdBy":
                          value =
                            `${row.creator?.name ?? ""} ${row.creator?.surname ?? ""}`.trim() ||
                            "-";
                          break;
                      }

                      return (
                        <TableCell key={column.id} align={column.align}>
                          {value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
