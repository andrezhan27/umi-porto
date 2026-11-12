"use client";

import { useLanguage } from "../../components/language";
import { restaurant } from "../restaurant";

export function ReservationWidget() {
  const { copy: { booking } } = useLanguage();

  return <iframe src={restaurant.bookingUrl} title={booking.title} />;
}
