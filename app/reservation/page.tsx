import type { Metadata } from "next";
import { Header } from "../../components/interaction";
import { copy, defaultLocale } from "../copy";
import { ReservationWidget } from "./widget";

export const metadata: Metadata = {
  title: copy[defaultLocale].booking.title,
};

export default function ReservationPage() {
  return (
    <>
      <Header onReservationPage />
      <main id="main" className="reservation" tabIndex={-1}>
        <ReservationWidget />
      </main>
    </>
  );
}
