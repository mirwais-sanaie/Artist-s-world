import { Asterisk } from "lucide-react";

function ErrorText({ children }) {
  return (
    <div className="text-red-600 font-light flex text-sm">
      <Asterisk width={13} height={15} />
      {children}
    </div>
  );
}

export default ErrorText;
