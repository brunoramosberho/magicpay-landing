import {redirect} from "next/navigation";
import {routing} from "@/i18n/routing";

export default function WhatsAppFaceIDRootRedirect() {
  redirect(`/${routing.defaultLocale}/help/whatsapp-faceid`);
}


