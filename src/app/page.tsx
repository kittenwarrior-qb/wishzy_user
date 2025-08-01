
import {routing} from "@/i18n/routing"
import { redirect } from "next/navigation";

export default function Home() {
  // Mặc định sẽ redirect về /vi nếu đường dẫn không có vd: /test -> /vi/test
  redirect(`/${routing.defaultLocale}`)
}
