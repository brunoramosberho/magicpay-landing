//
//  MagicShortcuts.swift
//
//  Agrega este archivo a tu TARGET PRINCIPAL (la app), NO a la extensión de teclado.
//  iOS registra el AppShortcutsProvider automáticamente — no hay que llamarlo desde
//  ningún lado ni tocar el Info.plist.
//
//  Habilita abrir "Transferencia Magic" desde Siri, el Botón de Acción y la app Atajos.
//

import AppIntents
import MagicPaySDK

@available(iOS 16.0, *)
struct MagicShortcuts: AppShortcutsProvider {
    static var appShortcuts: [AppShortcut] {
        AppShortcut(
            intent: MagicPayQuickSendIntent(),
            phrases: [
                "Transferencia Magic con \(.applicationName)",
                "Magic Transfer with \(.applicationName)"
            ],
            shortTitle: "Transferencia Magic",
            systemImageName: "paperplane.fill"
        )
    }
}
