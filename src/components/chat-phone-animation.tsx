'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { DM_Sans } from 'next/font/google'
import Image from 'next/image'

const dmSans = DM_Sans({ subsets: ['latin'], weight: ['400', '500', '600', '700'], display: 'swap' })

const PRIMARY = '#306FF6'

const chatMessages = [
    { text: 'Hey! 👋', isOutgoing: false },
    { text: 'Could you send me $25?', isOutgoing: false },
    { text: 'Sure, one second.', isOutgoing: true },
]

const iosRow1 = 'qwertyuiop'.split('')
const iosRow2 = 'asdfghjkl'.split('')
const iosRow3 = 'zxcvbnm'.split('')

const magicNumKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', 'del']
const amountSteps = ['$2', '$25']

function TypingDots() {
    return (
        <div className="flex gap-[4px] px-[14px] py-[10px]">
            {[0, 1, 2].map((i) => (
                <motion.div
                    key={i}
                    className="w-[7px] h-[7px] rounded-full bg-gray-400"
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }}
                />
            ))}
        </div>
    )
}

function FaceIDIcon() {
    return (
        <svg viewBox="0 0 64 64" fill="none" className="w-16 h-16 mx-auto" stroke="#007AFF" strokeWidth="2.5" strokeLinecap="round">
            <path d="M16 5H9a4 4 0 00-4 4v7" />
            <path d="M48 5h7a4 4 0 014 4v7" />
            <path d="M16 59H9a4 4 0 01-4-4v-7" />
            <path d="M48 59h7a4 4 0 004-4v-7" />
            <path d="M24 22v5" strokeWidth="3" />
            <path d="M40 22v5" strokeWidth="3" />
            <path d="M32 32v5" strokeWidth="2" />
            <path d="M24 43c2.5 3.5 13.5 3.5 16 0" strokeWidth="2" />
        </svg>
    )
}

function FaceIDCheck() {
    return (
        <svg viewBox="0 0 64 64" fill="none" className="w-16 h-16 mx-auto" stroke="#34C759" strokeWidth="2.5" strokeLinecap="round">
            <path d="M16 5H9a4 4 0 00-4 4v7" />
            <path d="M48 5h7a4 4 0 014 4v7" />
            <path d="M16 59H9a4 4 0 01-4-4v-7" />
            <path d="M48 59h7a4 4 0 004-4v-7" />
            <path d="M19 32l9 9 17-17" strokeWidth="3.5" strokeLinejoin="round" />
        </svg>
    )
}

function TapCircle() {
    return (
        <motion.span
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, transition: { duration: 0.12 } }}
            exit={{ scale: 1.4, opacity: 0, transition: { duration: 0.35, ease: 'easeOut' } }}
            className="absolute inset-0 m-auto w-9 h-9 rounded-full bg-black/[0.14] pointer-events-none z-50"
            style={{ boxShadow: '0 0 0 1px rgba(0,0,0,0.08)' }}
        />
    )
}

export function ChatPhoneAnimation() {
    const [runKey, setRunKey] = useState(0)
    const handleReplay = useCallback(() => setRunKey(k => k + 1), [])

    return (
        <div className="flex flex-col items-center gap-4">
            <ChatAnimationInner key={runKey} onReplay={handleReplay} />
        </div>
    )
}

function ChatAnimationInner({ onReplay }: { onReplay: () => void }) {
    const [visibleMessages, setVisibleMessages] = useState(0)
    const [showTyping, setShowTyping] = useState(false)

    const [keyboardVisible, setKeyboardVisible] = useState(false)
    const [keyboardType, setKeyboardType] = useState<'ios' | 'magic'>('ios')
    const [globePulsing, setGlobePulsing] = useState(false)
    const [showSwitcher, setShowSwitcher] = useState(false)
    const [switcherHighlight, setSwitcherHighlight] = useState(false)

    const [amountIndex, setAmountIndex] = useState(-1)
    const [activeKey, setActiveKey] = useState<string | null>(null)
    const [sendPressed, setSendPressed] = useState(false)

    const [faceIdPhase, setFaceIdPhase] = useState<'hidden' | 'scanning' | 'success'>('hidden')
    const [showPaymentLink, setShowPaymentLink] = useState(false)
    const [showReplay, setShowReplay] = useState(false)
    const [tapTarget, setTapTarget] = useState<string | null>(null)
    const [showHeartReaction, setShowHeartReaction] = useState(false)

    useEffect(() => {
        const t: ReturnType<typeof setTimeout>[] = []

        t.push(setTimeout(() => setKeyboardVisible(true), 300))

        t.push(setTimeout(() => setShowTyping(true), 600))
        t.push(setTimeout(() => { setShowTyping(false); setVisibleMessages(1) }, 1500))
        t.push(setTimeout(() => setShowTyping(true), 2200))
        t.push(setTimeout(() => { setShowTyping(false); setVisibleMessages(2) }, 3200))
        t.push(setTimeout(() => setVisibleMessages(3), 4000))

        t.push(setTimeout(() => setGlobePulsing(true), 4900))
        t.push(setTimeout(() => { setTapTarget('globe'); setGlobePulsing(false); setShowSwitcher(true) }, 5500))
        t.push(setTimeout(() => setTapTarget(null), 5900))
        t.push(setTimeout(() => { setTapTarget('magic'); setSwitcherHighlight(true) }, 6200))
        t.push(setTimeout(() => {
            setTapTarget(null)
            setShowSwitcher(false)
            setSwitcherHighlight(false)
            setKeyboardType('magic')
        }, 6700))

        t.push(setTimeout(() => { setTapTarget('key-2'); setAmountIndex(0); setActiveKey('2') }, 7400))
        t.push(setTimeout(() => { setTapTarget(null); setActiveKey(null) }, 7700))
        t.push(setTimeout(() => { setTapTarget('key-5'); setAmountIndex(1); setActiveKey('5') }, 8200))
        t.push(setTimeout(() => { setTapTarget(null); setActiveKey(null) }, 8500))

        t.push(setTimeout(() => { setTapTarget('send'); setSendPressed(true) }, 9200))
        t.push(setTimeout(() => { setTapTarget(null); setSendPressed(false) }, 9400))

        t.push(setTimeout(() => setFaceIdPhase('scanning'), 9800))
        t.push(setTimeout(() => setFaceIdPhase('success'), 10400))
        t.push(setTimeout(() => { setShowPaymentLink(true); setKeyboardType('ios') }, 10800))
        t.push(setTimeout(() => setFaceIdPhase('hidden'), 11000))

        t.push(setTimeout(() => setShowHeartReaction(true), 11800))

        t.push(setTimeout(() => setShowReplay(true), 12800))

        return () => t.forEach(clearTimeout)
    }, [])

    const currentAmount = amountIndex >= 0 ? amountSteps[amountIndex] : ''

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                data-chat-demo
                className={`${dmSans.className} relative w-[320px] sm:w-[360px] md:w-[400px] rounded-3xl overflow-hidden bg-white select-none`}
                style={{
                    boxShadow: '0 25px 80px -12px rgba(0,0,0,0.12), 0 8px 24px -8px rgba(0,0,0,0.06)',
                }}
            >
                {/* Header */}
                <div className="text-center py-3 border-b border-gray-100/80">
                    <div className="w-10 h-10 mx-auto rounded-full bg-gradient-to-br from-[#A8D4FF] to-[#306FF6] flex items-center justify-center mb-1">
                        <span className="text-white text-sm font-semibold">JM</span>
                    </div>
                    <p className="text-sm font-semibold text-black">Jonathan Moore</p>
                    <p className="text-[11px] text-gray-400">iMessage</p>
                </div>

                {/* Messages */}
                <div className="px-3.5 pt-2.5 pb-2 min-h-[160px] flex flex-col justify-end gap-1">
                    <AnimatePresence mode="popLayout">
                        {chatMessages.slice(0, visibleMessages).map((msg, i) => (
                            <motion.div
                                key={`msg-${i}`}
                                layout
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                                className={`flex ${msg.isOutgoing ? 'justify-end' : 'justify-start'}`}
                            >
                                <div className={`px-3.5 py-2 text-[15px] leading-5 max-w-[80%] ${
                                    msg.isOutgoing
                                        ? 'bg-[#007AFF] text-white rounded-[18px] rounded-br-[6px]'
                                        : 'bg-[#E9E9EB] text-black rounded-[18px] rounded-bl-[6px]'
                                }`}>
                                    {msg.text}
                                </div>
                            </motion.div>
                        ))}

                        {showTyping && (
                            <motion.div
                                key="typing"
                                layout
                                initial={{ opacity: 0, y: 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
                                className="flex justify-start"
                            >
                                <div className="bg-[#E9E9EB] rounded-[18px] rounded-bl-[6px]">
                                    <TypingDots />
                                </div>
                            </motion.div>
                        )}

                        {showPaymentLink && (
                            <motion.div
                                key="payment-link"
                                layout
                                initial={{ opacity: 0, y: 16, scale: 0.97 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                className="flex justify-end"
                            >
                                <div className="relative max-w-[88%]">
                                    <div className="bg-[#007AFF] text-white px-3.5 py-2.5 rounded-[18px] rounded-br-[6px] text-[14px] leading-[19px] mb-[3px]">
                                        Good news! Your $25 is ready to be claimed.
                                        <br /><br />
                                        Tap the link to collect it now:
                                    </div>
                                    <div className="rounded-2xl overflow-hidden border border-gray-200/60 shadow-sm">
                                        <div className="relative h-[90px] flex items-center justify-center"
                                            style={{ background: 'linear-gradient(135deg, #6B7BF7 0%, #A5B4FC 50%, #C7D2FE 100%)' }}>
                                            <div className="bg-white/85 backdrop-blur-sm rounded-xl px-5 py-2 shadow-sm">
                                                <span className="text-[26px] font-semibold" style={{ color: PRIMARY }}>$25</span>
                                            </div>
                                        </div>
                                        <div className="bg-white px-3 py-2.5">
                                            <p className="text-[12px] text-gray-600 leading-[16px]">
                                                Receive MX$ 25 via magicPay.<br />
                                                Click to claim your payment.
                                            </p>
                                            <div className="flex items-center gap-1.5 mt-2 pt-2 border-t border-gray-100">
                                                <Image src="/icon.svg" alt="" width={18} height={18} className="rounded" />
                                                <div className="leading-none">
                                                    <p className="text-[11px] font-semibold text-gray-800">magicPay</p>
                                                    <p className="text-[10px] text-gray-400">mgcpay.me/claim/aB3cD</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <AnimatePresence>
                                        {showHeartReaction && (
                                            <motion.div
                                                initial={{ scale: 0, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                transition={{ type: 'spring', damping: 12, stiffness: 300 }}
                                                className="absolute -bottom-2.5 -left-2.5 z-10"
                                            >
                                                <div
                                                    className="w-[30px] h-[30px] rounded-full bg-white flex items-center justify-center"
                                                    style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.12), 0 0 0 0.5px rgba(0,0,0,0.04)' }}
                                                >
                                                    <motion.span
                                                        initial={{ scale: 0 }}
                                                        animate={{ scale: [0, 1.3, 1] }}
                                                        transition={{ duration: 0.4, delay: 0.08, ease: [0.34, 1.56, 0.64, 1] }}
                                                        className="text-[16px] leading-none"
                                                    >
                                                        ❤️
                                                    </motion.span>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Input bar */}
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white border-t border-gray-100/60">
                    <div className="w-7 h-7 rounded-full bg-[#E9E9EB] flex items-center justify-center shrink-0">
                        <svg className="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                            <path d="M12 5v14M5 12h14" />
                        </svg>
                    </div>
                    <div className="flex-1 h-8 rounded-full border border-gray-200 flex items-center px-3">
                        <span className="text-[13px] text-gray-400">Message...</span>
                    </div>
                </div>

                {/* Keyboard area */}
                <AnimatePresence mode="wait">
                    {keyboardVisible && keyboardType === 'ios' && (
                        <motion.div
                            key="ios-kb"
                            className="relative"
                            initial={{ y: 40, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 20, opacity: 0 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        >
                            <div className="bg-[#D1D3D9]">
                                {/* Predictive text bar */}
                                <div className="flex items-stretch h-[36px] mx-[3px] mb-[2px]">
                                    <div className="flex-1 flex items-center justify-center text-[15px] text-black/80">
                                        &ldquo;The&rdquo;
                                    </div>
                                    <div className="w-px bg-[#B8BCC2] my-[8px]" />
                                    <div className="flex-1 flex items-center justify-center text-[15px] text-black/80">
                                        the
                                    </div>
                                    <div className="w-px bg-[#B8BCC2] my-[8px]" />
                                    <div className="flex-1 flex items-center justify-center text-[15px] text-black/80">
                                        to
                                    </div>
                                </div>

                                <div className="px-[3px] flex flex-col gap-[10px] pb-[6px]">
                                    {/* Row 1: q-p */}
                                    <div className="flex gap-[5px]">
                                        {iosRow1.map(k => (
                                            <div key={k} className="flex-1 h-[42px] bg-white rounded-[7px] flex items-center justify-center text-[20px] text-black" style={{ boxShadow: '0 1px 0 #878B90' }}>{k}</div>
                                        ))}
                                    </div>
                                    {/* Row 2: a-l */}
                                    <div className="flex gap-[5px] px-[14px]">
                                        {iosRow2.map(k => (
                                            <div key={k} className="flex-1 h-[42px] bg-white rounded-[7px] flex items-center justify-center text-[20px] text-black" style={{ boxShadow: '0 1px 0 #878B90' }}>{k}</div>
                                        ))}
                                    </div>
                                    {/* Row 3: shift + z-m + delete */}
                                    <div className="flex gap-[5px]">
                                        <div className="w-[40px] h-[42px] bg-[#ACB2BC] rounded-[7px] flex items-center justify-center" style={{ boxShadow: '0 1px 0 #878B90' }}>
                                            <svg className="w-[17px] h-[17px] text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M12 19V5M5 12l7-7 7 7" />
                                            </svg>
                                        </div>
                                        {iosRow3.map(k => (
                                            <div key={k} className="flex-1 h-[42px] bg-white rounded-[7px] flex items-center justify-center text-[20px] text-black" style={{ boxShadow: '0 1px 0 #878B90' }}>{k}</div>
                                        ))}
                                        <div className="w-[40px] h-[42px] bg-[#ACB2BC] rounded-[7px] flex items-center justify-center" style={{ boxShadow: '0 1px 0 #878B90' }}>
                                            <svg className="w-[20px] h-[20px] text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M12 9.75L14.25 12m0 0l2.25 2.25M14.25 12l2.25-2.25M14.25 12L12 14.25m-2.58 4.92l-6.374-6.375a1.125 1.125 0 010-1.59L9.42 4.83c.21-.211.497-.33.795-.33H19.5a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25h-9.284c-.298 0-.585-.119-.795-.33z" />
                                            </svg>
                                        </div>
                                    </div>
                                    {/* Row 4: ABC + space + return (blue) */}
                                    <div className="flex gap-[5px]">
                                        <div className="w-[50px] h-[42px] bg-[#ACB2BC] rounded-[7px] flex items-center justify-center text-[15px] text-black" style={{ boxShadow: '0 1px 0 #878B90' }}>
                                            ABC
                                        </div>
                                        <div className="flex-1 h-[42px] bg-white rounded-[7px] flex items-center justify-center" style={{ boxShadow: '0 1px 0 #878B90' }} />
                                        <div className="w-[78px] h-[42px] bg-[#007AFF] rounded-[7px] flex items-center justify-center" style={{ boxShadow: '0 1px 0 #006ADB' }}>
                                            <svg className="w-[20px] h-[20px] text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M9 4l-5 5 5 5" />
                                                <path d="M4 9h10a5 5 0 015 5v2" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Globe + mic below keyboard */}
                                <div className="flex items-center justify-between px-[16px] pt-[4px] pb-[8px]">
                                    <motion.div
                                        className="relative"
                                        animate={globePulsing ? {
                                            scale: [1, 1.2, 1],
                                        } : {}}
                                        transition={{ duration: 0.5, repeat: globePulsing ? 2 : 0 }}
                                    >
                                        <svg className="w-[22px] h-[22px]" viewBox="0 0 24 24" fill="none" stroke={globePulsing ? '#007AFF' : '#8E8E93'} strokeWidth="1.5">
                                            <circle cx="12" cy="12" r="10" />
                                            <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
                                        </svg>
                                        <AnimatePresence>{tapTarget === 'globe' && <TapCircle />}</AnimatePresence>
                                    </motion.div>
                                    <svg className="w-[20px] h-[22px]" viewBox="0 0 24 34" fill="#8E8E93">
                                        <path d="M12 1a5 5 0 015 5v10a5 5 0 01-10 0V6a5 5 0 015-5zM4 14v2a8 8 0 0016 0v-2h2v2a10 10 0 01-9 9.95V30h5v2H6v-2h5v-4.05A10 10 0 012 16v-2h2z" />
                                    </svg>
                                </div>
                            </div>

                            {/* Keyboard switcher popup */}
                            <AnimatePresence>
                                {showSwitcher && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 8, scale: 0.92 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 5, scale: 0.95 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute bottom-[16px] left-[4px] z-10 bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-200/50 py-1.5 min-w-[190px]"
                                    >
                                        <div className="flex items-center justify-between px-3.5 py-2">
                                            <span className="text-[15px]">English (US)</span>
                                            <svg className="w-4 h-4 text-[#007AFF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <div className="h-px bg-gray-200/80 mx-3" />
                                        <motion.div
                                            animate={switcherHighlight ? { backgroundColor: 'rgba(48,111,246,0.1)' } : { backgroundColor: 'rgba(0,0,0,0)' }}
                                            transition={{ duration: 0.2 }}
                                            className="relative flex items-center gap-2.5 px-3.5 py-2 mx-1 rounded-lg overflow-hidden"
                                        >
                                            <div className="w-5 h-5 rounded-[4px] bg-gradient-to-br from-[#306FF6] to-[#5B8DF8] flex items-center justify-center">
                                                <span className="text-white text-[9px] font-bold">M</span>
                                            </div>
                                            <span className="text-[15px] font-medium">Magic</span>
                                            <AnimatePresence>{tapTarget === 'magic' && <TapCircle />}</AnimatePresence>
                                        </motion.div>
                                        <div className="h-px bg-gray-200/80 mx-3" />
                                        <div className="px-3.5 py-2">
                                            <span className="text-[15px] text-[#007AFF]">Keyboard Settings…</span>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    )}

                    {keyboardVisible && keyboardType === 'magic' && (
                        <motion.div
                            key="magic-kb"
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1, transition: { type: 'spring', damping: 25, stiffness: 200 } }}
                            exit={{ y: 20, opacity: 0, transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] } }}
                        >
                            <div className="flex items-center justify-between px-3.5 py-[5px] border-t border-gray-100 bg-white">
                                <span className="text-[10px] font-semibold text-[#202329]/60">Jonathan Moore</span>
                                <span className="text-[9px] font-semibold text-[#202329]/60">Main Account</span>
                            </div>

                            <div className="bg-[#F2F2F2] pb-3.5">
                                {/* Amount toolbar */}
                                <div className="relative h-11 mx-1">
                                    <svg className="absolute left-2 top-[16px] w-3 h-3 text-[#202329]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M15 19l-7-7 7-7" />
                                    </svg>
                                    <svg className="absolute left-6 top-[16px] w-4 h-3" viewBox="0 0 20 14" fill="none" stroke="#202329" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="1" y="1" width="18" height="12" rx="2" />
                                        <line x1="5" y1="4" x2="5.01" y2="4" /><line x1="10" y1="4" x2="10.01" y2="4" /><line x1="15" y1="4" x2="15.01" y2="4" />
                                        <line x1="5" y1="7" x2="5.01" y2="7" /><line x1="10" y1="7" x2="10.01" y2="7" /><line x1="15" y1="7" x2="15.01" y2="7" />
                                        <line x1="7" y1="10" x2="13" y2="10" />
                                    </svg>

                                    <div
                                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-[7px] py-[5px] rounded-[5px] border border-white/80 bg-[#fafafa]/70 min-w-[60px] text-center"
                                        style={{ boxShadow: '0 2px 20px rgba(0,0,0,0.08)', backdropFilter: 'blur(12px)' }}
                                    >
                                        <AnimatePresence mode="wait">
                                            <motion.span
                                                key={currentAmount}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 0.1 }}
                                                className="text-[20px] font-semibold tabular-nums leading-none block"
                                                style={{ color: PRIMARY }}
                                            >
                                                {currentAmount || '\u00A0'}
                                            </motion.span>
                                        </AnimatePresence>
                                    </div>

                                    <div className="absolute right-1.5 top-[14px] flex items-center gap-0.5">
                                        <span className="text-[11px] font-semibold text-[#202329]">MXN</span>
                                        <svg className="w-2 h-2 text-[#202329]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M6 9l6 6 6-6" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Numpad */}
                                <div className="grid grid-cols-3 gap-1 mx-1 mt-px">
                                    {magicNumKeys.map((key) => (
                                        <motion.div
                                            key={key}
                                            animate={{
                                                scale: activeKey === key ? 0.92 : 1,
                                                backgroundColor: activeKey === key ? '#e0e0e0' : '#ffffff',
                                            }}
                                            transition={{ duration: 0.1 }}
                                            className="relative h-[36px] rounded-[6px] flex items-center justify-center text-[17px] text-[#202329] overflow-hidden"
                                            style={{ boxShadow: '0 1px 0 rgba(0,0,0,0.06)' }}
                                        >
                                            {key === 'del' ? (
                                                <svg className="w-[16px] h-[16px] text-[#202329]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M12 9.75L14.25 12m0 0l2.25 2.25M14.25 12l2.25-2.25M14.25 12L12 14.25m-2.58 4.92l-6.374-6.375a1.125 1.125 0 010-1.59L9.42 4.83c.21-.211.497-.33.795-.33H19.5a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25h-9.284c-.298 0-.585-.119-.795-.33z" />
                                                </svg>
                                            ) : key}
                                            <AnimatePresence>{tapTarget === `key-${key}` && <TapCircle />}</AnimatePresence>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Send button */}
                                <motion.div
                                    animate={{ scale: sendPressed ? 0.95 : 1 }}
                                    transition={{ duration: 0.1 }}
                                    className="relative mx-[5px] mt-1 h-[36px] rounded-[8px] flex items-center justify-center gap-[5px] text-[13px] font-semibold overflow-hidden"
                                    style={{ backgroundColor: PRIMARY, color: '#fff' }}
                                >
                                    <svg className="w-[12px] h-[12px]" viewBox="0 0 16 16" fill="none">
                                        <rect width="16" height="16" rx="3" fill="rgba(255,255,255,0.2)" />
                                        <path d="M4.5 8L7 10.5L11.5 5.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    Send
                                    <AnimatePresence>{tapTarget === 'send' && <TapCircle />}</AnimatePresence>
                                </motion.div>

                                {/* Globe + mic */}
                                <div className="flex items-center justify-between mx-5 mt-2">
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="#6f7592" strokeWidth="1.5">
                                        <circle cx="12" cy="12" r="10" />
                                        <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
                                    </svg>
                                    <svg className="w-3 h-[18px]" viewBox="0 0 24 34" fill="#6f7592">
                                        <path d="M12 1a5 5 0 015 5v10a5 5 0 01-10 0V6a5 5 0 015-5zM4 14v2a8 8 0 0016 0v-2h2v2a10 10 0 01-9 9.95V30h5v2H6v-2h5v-4.05A10 10 0 012 16v-2h2z" />
                                    </svg>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Face ID overlay */}
                <AnimatePresence>
                    {faceIdPhase !== 'hidden' && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="absolute inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-20 rounded-3xl"
                        >
                            <motion.div
                                initial={{ scale: 0.92, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.95, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="bg-white rounded-2xl p-6 w-[220px] text-center shadow-xl"
                            >
                                <AnimatePresence mode="wait">
                                    {faceIdPhase === 'scanning' && (
                                        <motion.div key="scan" exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.2 }}>
                                            <motion.div
                                                animate={{ scale: [1, 1.04, 1] }}
                                                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                                                className="mb-3"
                                            >
                                                <FaceIDIcon />
                                            </motion.div>
                                            <p className="text-[15px] font-semibold text-black">Confirm with Face ID</p>
                                            <p className="text-[13px] text-gray-500 mt-1">Send $25 via magicPay</p>
                                        </motion.div>
                                    )}
                                    {faceIdPhase === 'success' && (
                                        <motion.div
                                            key="success"
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ type: 'spring', damping: 15, stiffness: 200 }}
                                        >
                                            <div className="mb-3">
                                                <FaceIDCheck />
                                            </div>
                                            <p className="text-[15px] font-semibold text-[#34C759]">Payment Sent!</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            <AnimatePresence>
                {showReplay && (
                    <motion.button
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                        onClick={onReplay}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700 text-[13px] font-medium transition-colors cursor-pointer"
                    >
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M1 4v6h6" />
                            <path d="M3.51 15a9 9 0 102.13-9.36L1 10" />
                        </svg>
                        Replay
                    </motion.button>
                )}
            </AnimatePresence>
        </>
    )
}
