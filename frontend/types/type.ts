export type RegisterType = {
  id: number;
  name: string;
  surname: string;
  email: string;
  password: string;
  confirmPassword: string;
};
export type LoginType = {
  id: number;
  email: string;
  password: string;
  token?: string;
};

export type User = {
  id: number;
  name: string;
  surname: string;
  email: string;
};

export type ModalMode = "create" | "update" | "detail" | "delete";

export interface ModalState<T = unknown> {
  open: boolean;
  mode: ModalMode;
  data?: T;
}

export type TicketStatus = "OPEN" | "IN_PROGRESS" | "CLOSED";

export interface UserType {
  id: number;
  name: string;
  surname: string;
  email: string;
  role: "USER" | "ADMIN";
}

// export interface TicketForm {
//   title: string;
//   description: string;
//   status: TicketStatus;
//   assignedTo: string;
//   createdBy: string; // sisteme giriş yapan kullanıcı
// }

export interface TicketType {
  id: number;
  title: string;
  description: string;
  status: "OPEN" | "IN_PROGRESS" | "CLOSED";

  createdBy: number;
  assignedTo: number | null;

  createdAt: string;
  updatedAt: string;

  creator: UserType;
  assignedAdmin: UserType | null;
}

export interface TicketForm {
  title: string;
  description: string;
  status: "OPEN" | "IN_PROGRESS" | "CLOSED";
  assignedTo: number | null;
}

export type CommentType = {
  id: number;
  text: string;
  ticketId: number;
  userId: number;
  createdAt: string;
  user: User;
  ticket: TicketType;
};
