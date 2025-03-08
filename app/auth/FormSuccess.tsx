import { CheckCircle } from "lucide-react";

export const FormSuccess = ({ message }: { message: string }) => {
  if (!message) return null;
  return (
    <div className="bg-slate-700 text-secondary-foreground p-3 rounded-md">
      <CheckCircle className="v-4 h-4" />
      <p>{message}</p>
    </div>
  );
};
