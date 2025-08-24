import { Metadata } from "next";
import { EncoderTester } from "../../../components/EncoderTester";

export const metadata: Metadata = {
  title: "Interactive Chain Editor",
  description:
    "Редактируйте чейн эффектов и получайте NUX совместимый QR код в реальном времени",
};

export default function TestEncoderPage() {
  return <EncoderTester />;
}
