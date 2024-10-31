export class MessageEntity {
  id: number;
  content: string;
  from: string;
  to: string;
  read: boolean;
  createdAt: Date;
}
