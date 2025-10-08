"use client"

import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import { InfiniteSlider } from '@/components/ui/infinite-slider'
import { SPEI, Bizum, Blik, FasterPayments, Pix, SEPA, UPI } from '@/components/logos'
import { cn } from '@/lib/utils'
import LottiePlayer from '@/components/ui/lottie-player'
import { AnimatedBeamDemo, BrandCustomizableThumbnail } from '@/components/brand-customizable-thumbnail'
import { CustomizableCodexAnimation } from '@/components/ui/customizable-codex-animation'
import DisplayCards from '@/components/ui/display-cards'

export default function Features() {
    return (
        <section className="pt-16 pb-8 md:pt-32 md:pb-16">
            <div className="@container mx-auto max-w-7xl px-6">
                <div className="text-center">
                    <h2 className="text-balance text-3xl sm:text-5xl md:text-7xl lg:text-8xl leading-[1.1] md:leading-[1.0]"
                        style={{ 
                            fontFamily: "'Apercu Pro', ui-sans-serif, system-ui, sans-serif", 
                            fontWeight: 450,
                        }}>
                        Features
                    </h2>
                </div>
                <div className="mx-auto mt-8 grid w-full grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:mt-16">
                    <Card className="group overflow-hidden p-0 rounded-[1.6875em]" style={{
                        boxShadow: '0 0.125em 2em rgba(0, 0, 0, 0.08), 0 0.125em 2em color(display-p3 0.000 0.000 0.000 / 0.08)',
                        border: '1px solid transparent',
                        backgroundImage: 'linear-gradient(#FFFFFF, #FFFFFF), linear-gradient(0deg, #FFFFFF 0%, rgba(255, 255, 255, 0.2) 50%, #FFFFFF 100%)',
                        backgroundOrigin: 'border-box',
                        backgroundClip: 'padding-box, border-box'
                    }}>
                        <div className="aspect-[4/3] w-full relative bg-[#fafafa] overflow-hidden">
                            <Image
                                src="/placeholder-1.png"
                                alt="Feature placeholder"
                                fill
                                className="object-cover opacity-10"
                                unoptimized
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="relative w-full h-full [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]">
                                    <div
                                        role="presentation"
                                        className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_0.0625em,transparent_0.0625em),linear-gradient(to_bottom,#ffffff_0.0625em,transparent_0.0625em)] bg-[size:2em_2em]"></div>
                                </div>
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <AnimatedBeamDemo />
                            </div>
                        </div>

                        <CardContent className="text-center px-4 sm:px-6 md:px-12 lg:px-20 pt-[0.5em] pb-[2.5em]">
                            <h3 className="text-xl sm:text-2xl font-normal leading-snug mb-3">Pay without leaving chat</h3>
                            <p className="text-sm sm:text-base mt-0">Open the bank’s Magic keyboard inside WhatsApp, Instagram, Telegram or Messages and send a payment link directly in the conversation.</p>
                        </CardContent>
                    </Card>

                    <Card className="group overflow-hidden p-0 rounded-[1.6875em]" style={{
                        boxShadow: '0 0.125em 2em rgba(0, 0, 0, 0.08), 0 0.125em 2em color(display-p3 0.000 0.000 0.000 / 0.08)',
                        border: '1px solid transparent',
                        backgroundImage: 'linear-gradient(#FFFFFF, #FFFFFF), linear-gradient(0deg, #FFFFFF 0%, rgba(255, 255, 255, 0.2) 50%, #FFFFFF 100%)',
                        backgroundOrigin: 'border-box',
                        backgroundClip: 'padding-box, border-box'
                    }}>
                        <div className="aspect-[4/3] w-full relative bg-[#fafafa] overflow-hidden">
                            <Image
                                src="/placeholder-1.png"
                                alt="Feature placeholder"
                                fill
                                className="object-cover opacity-10"
                                unoptimized
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="relative w-full h-full flex items-center justify-center [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]">
                                    <div
                                        role="presentation"
                                        className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#ffffff_0.0625em,transparent_0.0625em),linear-gradient(to_bottom,#ffffff_0.0625em,transparent_0.0625em)] bg-[size:2em_2em]"></div>
                                    <LottiePlayer
                                        src="/lottie-tap-to-card.json"
                                        loop
                                        autoplay
                                        ariaLabel="Tap To Send animation"
                                        className="w-[85%] h-[85%]"
                                    />
                                </div>
                            </div>
                        </div>

                        <CardContent className="text-center px-4 sm:px-6 md:px-12 lg:px-20 pt-[0.5em] pb-[2.5em]">
                            <h3 className="text-xl sm:text-2xl font-normal leading-snug mb-3">Tap To Send & QR — in-person, instant</h3>
                            <p className="text-sm sm:text-base mt-0">Generate a Tap or QR from your bank app and transfer to any nearby device.</p>
                        </CardContent>
                    </Card>

                    <Card className="group overflow-hidden p-0 rounded-[1.6875em]" style={{
                        boxShadow: '0 0.125em 2em rgba(0, 0, 0, 0.08), 0 0.125em 2em color(display-p3 0.000 0.000 0.000 / 0.08)',
                        border: '1px solid transparent',
                        backgroundImage: 'linear-gradient(#FFFFFF, #FFFFFF), linear-gradient(0deg, #FFFFFF 0%, rgba(255, 255, 255, 0.2) 50%, #FFFFFF 100%)',
                        backgroundOrigin: 'border-box',
                        backgroundClip: 'padding-box, border-box'
                    }}>
                        <div className="aspect-[4/3] w-full relative bg-[#fafafa] overflow-hidden">
                            <Image
                                src="/placeholder-1.png"
                                alt="Feature placeholder"
                                fill
                                className="object-cover opacity-10"
                                unoptimized
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="relative w-full h-full [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]">
                                    <div
                                        role="presentation"
                                        className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_0.0625em,transparent_0.0625em),linear-gradient(to_bottom,#ffffff_0.0625em,transparent_0.0625em)] bg-[size:2em_2em]"></div>
                                </div>
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center scale-95 translate-x-0 translate-y-0 md:scale-75 md:-translate-x-8 md:-translate-y-8">
                                <DisplayCards cards={[
                                    {
                                        imageSrc: "/text-field-3.png",
                                        imageAlt: "Instant claim feature - step 1",
                                        animateY: [0, -30],
                                        zIndex: 0,
                                        animationDelay: 0,
                                        className: "[grid-area:stack]",
                                    },
                                    {
                                        imageSrc: "/text-field-2.png",
                                        imageAlt: "Instant claim feature - step 2",
                                        animateY: [0, -30],
                                        zIndex: 1,
                                        animationDelay: 0.1,
                                        className: "[grid-area:stack] translate-x-20 translate-y-12",
                                    },
                                    {
                                        imageSrc: "/text-field.png",
                                        imageAlt: "Instant claim feature - step 3",
                                        borderColor: "#306FF6",
                                        animateY: [0, -30],
                                        zIndex: 2,
                                        animationDelay: 0.2,
                                        className: "[grid-area:stack] translate-x-40 translate-y-24",
                                    },
                                ]} />
                            </div>
                        </div>

                        <CardContent className="text-center px-4 sm:px-6 md:px-12 lg:px-20 pt-[0.5em] pb-[2.5em]">
                            <h3 className="text-xl sm:text-2xl font-normal leading-snug mb-3">Instant claim — enter once</h3>
                            <p className="text-sm sm:text-base mt-0">Recipients save bank details on first claim; subsequent claims are one click and settle fast.</p>
                        </CardContent>
                    </Card>

                    <Card className="group overflow-hidden p-0 rounded-[1.6875em]" style={{
                        boxShadow: '0 0.125em 2em rgba(0, 0, 0, 0.08), 0 0.125em 2em color(display-p3 0.000 0.000 0.000 / 0.08)',
                        border: '1px solid transparent',
                        backgroundImage: 'linear-gradient(#FFFFFF, #FFFFFF), linear-gradient(0deg, #FFFFFF 0%, rgba(255, 255, 255, 0.2) 50%, #FFFFFF 100%)',
                        backgroundOrigin: 'border-box',
                        backgroundClip: 'padding-box, border-box'
                    }}>
                        <div className="aspect-[4/3] w-full relative bg-[#fafafa] overflow-hidden">
                            <Image
                                src="/placeholder-1.png"
                                alt="Feature placeholder"
                                fill
                                className="object-cover opacity-10"
                                unoptimized
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="relative w-full h-full flex items-center justify-center [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]">
                                    <div
                                        role="presentation"
                                        className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#ffffff_0.0625em,transparent_0.0625em),linear-gradient(to_bottom,#ffffff_0.0625em,transparent_0.0625em)] bg-[size:2em_2em]"></div>
                                </div>
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <BrandCustomizableThumbnail />
                            </div>
                        </div>

                        <CardContent className="text-center px-[2em] md:px-[8em] pt-[0.5em] pb-[2.5em]">
                            <h3 className="text-[1.5em] font-normal leading-none mb-3">Brand-customizable</h3>
                            <p className="text-base mt-0">UI adapts to your bank's colors and tone while keeping Magic's UX patterns and trust signals. Available SDKs: iOS, Android, and React Native.</p>
                        </CardContent>
                    </Card>

                    <Card className="group overflow-hidden p-0 rounded-[1.6875em]" style={{
                        boxShadow: '0 0.125em 2em rgba(0, 0, 0, 0.08), 0 0.125em 2em color(display-p3 0.000 0.000 0.000 / 0.08)',
                        border: '1px solid transparent',
                        backgroundImage: 'linear-gradient(#FFFFFF, #FFFFFF), linear-gradient(0deg, #FFFFFF 0%, rgba(255, 255, 255, 0.2) 50%, #FFFFFF 100%)',
                        backgroundOrigin: 'border-box',
                        backgroundClip: 'padding-box, border-box'
                    }}>
                        <div className="aspect-[4/3] w-full relative bg-[#fafafa] overflow-hidden">
                            <Image
                                src="/placeholder-1.png"
                                alt="Feature placeholder"
                                fill
                                className="object-cover opacity-10"
                                unoptimized
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="relative w-full h-full [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]">
                                    <div
                                        role="presentation"
                                        className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_0.0625em,transparent_0.0625em),linear-gradient(to_bottom,#ffffff_0.0625em,transparent_0.0625em)] bg-[size:2em_2em]"></div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="relative w-full items-center justify-between space-y-6">
                                    <div>
                                        <InfiniteSlider
                                            gap={24}
                                            speed={20}
                                            speedOnHover={10}>
                                            <IntegrationCard>
                                                <SPEI />
                                            </IntegrationCard>
                                            <IntegrationCard>
                                                <Bizum />
                                            </IntegrationCard>
                                            <IntegrationCard>
                                                <Blik />
                                            </IntegrationCard>
                                            <IntegrationCard>
                                                <FasterPayments />
                                            </IntegrationCard>
                                            <IntegrationCard>
                                                <Pix />
                                            </IntegrationCard>
                                            <IntegrationCard>
                                                <SEPA />
                                            </IntegrationCard>
                                            <IntegrationCard>
                                                <UPI />
                                            </IntegrationCard>
                                        </InfiniteSlider>
                                    </div>

                                    <div>
                                        <InfiniteSlider
                                            gap={24}
                                            speed={20}
                                            speedOnHover={10}
                                            reverse>
                                            <IntegrationCard>
                                                <Pix />
                                            </IntegrationCard>
                                            <IntegrationCard>
                                                <SEPA />
                                            </IntegrationCard>
                                            <IntegrationCard>
                                                <UPI />
                                            </IntegrationCard>
                                            <IntegrationCard>
                                                <SPEI />
                                            </IntegrationCard>
                                            <IntegrationCard>
                                                <Bizum />
                                            </IntegrationCard>
                                            <IntegrationCard>
                                                <Blik />
                                            </IntegrationCard>
                                            <IntegrationCard>
                                                <FasterPayments />
                                            </IntegrationCard>
                                        </InfiniteSlider>
                                    </div>
                                    <div>
                                        <InfiniteSlider
                                            gap={24}
                                            speed={20}
                                            speedOnHover={10}>
                                            <IntegrationCard>
                                                <UPI />
                                            </IntegrationCard>
                                            <IntegrationCard>
                                                <Blik />
                                            </IntegrationCard>
                                            <IntegrationCard>
                                                <SEPA />
                                            </IntegrationCard>
                                            <IntegrationCard>
                                                <FasterPayments />
                                            </IntegrationCard>
                                            <IntegrationCard>
                                                <SPEI />
                                            </IntegrationCard>
                                            <IntegrationCard>
                                                <Pix />
                                            </IntegrationCard>
                                            <IntegrationCard>
                                                <Bizum />
                                            </IntegrationCard>
                                        </InfiniteSlider>
                                    </div>
                                    <div className="absolute top-[calc(50%-0.75rem)] left-1/2 -translate-x-1/2 -translate-y-1/2 flex size-fit justify-center gap-2">
                                        <IntegrationCard
                                            className="size-[5.5rem] sm:size-[6.5rem] md:size-[7.98rem] bg-white/90 rounded-[2rem] shadow-2xl"
                                            isCenter={true}>
                                            <Image
                                                src="/icon.svg"
                                                alt="Magic Icon"
                                                width={64}
                                                height={64}
                                                className="size-[2.75rem] sm:size-[3.25rem] md:size-[3.99rem]"
                                            />
                                        </IntegrationCard>
                                    </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <CardContent className="text-center px-4 sm:px-6 md:px-12 lg:px-20 pt-[0.5em] pb-[2.5em]">
                            <h3 className="text-xl sm:text-2xl font-normal leading-snug mb-3">Local rails, global reach</h3>
                            <p className="text-sm sm:text-base mt-0">Settles via the fastest local rail (SPEI, SEPA Instant, Pix, RTP / FedNow, Faster Payments, UPI, Bizum, Blik, etc.).</p>
                        </CardContent>
                    </Card>

                    <Card className="group overflow-hidden p-0 rounded-[1.6875em]" style={{
                        boxShadow: '0 0.125em 2em rgba(0, 0, 0, 0.08), 0 0.125em 2em color(display-p3 0.000 0.000 0.000 / 0.08)',
                        border: '1px solid transparent',
                        backgroundImage: 'linear-gradient(#FFFFFF, #FFFFFF), linear-gradient(0deg, #FFFFFF 0%, rgba(255, 255, 255, 0.2) 50%, #FFFFFF 100%)',
                        backgroundOrigin: 'border-box',
                        backgroundClip: 'padding-box, border-box'
                    }}>
                        <div className="aspect-[4/3] w-full relative bg-[#fafafa] overflow-hidden">
                            <Image
                                src="/placeholder-1.png"
                                alt="Feature placeholder"
                                fill
                                className="object-cover opacity-10"
                                unoptimized
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="relative w-full h-full flex items-center justify-center [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]">
                                    <div
                                        role="presentation"
                                        className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_0.0625em,transparent_0.0625em),linear-gradient(to_bottom,#ffffff_0.0625em,transparent_0.0625em)] bg-[size:2em_2em]"></div>
                                    <CustomizableCodexAnimation 
                                                // Binary characters only
                                                characters={['0', '1']}
                                                particleCount={150}
                                                
                                                // Back to faster upward motion
                                                baseSpeed={1.2}
                                                speedVariation={0.6}
                                                wobbleAmount={0.1}
                                                rotationEnabled={false}
                                                
                                                // 20px font size
                                                minSize={20}
                                                maxSize={20}
                                                minOpacity={0.3}
                                                maxOpacity={0.9}
                                                
                                                // 80% light grey characters
                                                characterColor="rgba(204, 204, 204, 1)"
                                                shadowEnabled={false}
                                                glowEnabled={false}
                                                
                                                // Apercu Medium font
                                                fontFamily="'Apercu Pro', ui-sans-serif, system-ui, sans-serif"
                                                fontWeight="500"
                                                
                                                // No icon in animation component
                                                showIcon={false}
                                                
                                                // Flow direction
                                                flowDirection="up"
                                            />
                                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 pointer-events-none z-20">
                                        <Image
                                            src="/lock-icon.svg"
                                            alt="Lock Icon"
                                            width={72}
                                            height={72}
                                            className="w-10 h-10 sm:w-12 sm:h-12 md:w-[72px] md:h-[72px]"
                                        />
                                        <Image
                                            src="/magic.svg"
                                            alt="Magic Logo"
                                            width={200}
                                            height={200}
                                            className="w-28 h-28 sm:w-40 sm:h-40 md:w-[200px] md:h-[200px]"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <CardContent className="text-center px-4 sm:px-6 md:px-12 lg:px-20 pt-[0.5em] pb-[2.5em]">
                            <h3 className="text-xl sm:text-2xl font-normal leading-snug mb-3">Trust line</h3>
                            <p className="text-sm sm:text-base mt-0">Secure, encrypted, compliant — built to integrate with your KYC/AML and data-residency requirements.</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    )
}

const IntegrationCard = ({ children, className, isCenter = false }: { children: React.ReactNode; className?: string; isCenter?: boolean }) => {
    return (
        <div className={cn('bg-white relative z-20 flex size-10 sm:size-12 rounded-xl border border-gray-400/10', className)}>
            <div className={cn('m-auto size-fit *:size-4 sm:*:size-5', isCenter && '*:size-[5.09rem]')}>{children}</div>
        </div>
    )
}

