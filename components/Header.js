import { MessagesSquare } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-10 flex h-[53px] items-center gap-1 border-b bg-background px-4">
      <h1 className="text-xl font-semibold flex items-center gap-1">
        <MessagesSquare />
        DocuChat
      </h1>
    </header>
  );
}
