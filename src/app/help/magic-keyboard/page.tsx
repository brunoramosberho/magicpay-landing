import {redirect} from "next/navigation";
import {routing} from "@/i18n/routing";

export default function MagicKeyboardHelpRootRedirect() {
  redirect(`/${routing.defaultLocale}/help/magic-keyboard`);
}


