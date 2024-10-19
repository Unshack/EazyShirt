import { SUPPORT_EMAIL } from "@/lib/constants";
import { orders } from "@wix/ecom";
import { formatDate } from "date-fns";
import Link from "next/link";

interface OrderProps {
  order: orders.Order;
}

export default function Order({ order }: OrderProps) {
  return (
    <div className="w-full space-y-5 border p-5">
      <div className="flex flex-wrap items-center gap-3">
        <span className="font-bold">Order #{order.number}</span>
        {order._createdDate && (
          <span>{formatDate(order._createdDate, "MMM d, yyyy")}</span>
        )}
        <Link
          href={`mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(`Order #${order.number} help`)}&body=${encodeURIComponent(`I need help with order #${order.number}\n\n<Describe your problem>`)}`}
          className="ms-auto text-sm hover:underline"
        >
          Need help?
        </Link>
      </div>
      <div className="flex flex-wrap gap-3 text-sm">
        <div className="basis-96"></div>
      </div>
    </div>
  );
}
