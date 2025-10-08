'use client'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { AuroraText } from '@/components/ui/aurora-text'
import { RequestDemoButton } from '@/components/ui/request-demo-button'
import { TextEffect } from '@/components/ui/text-effect'
import Image from 'next/image'

export default function ContactSection() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [errors, setErrors] = useState({
        name: false,
        email: false,
        message: false
    })
    const [showErrors, setShowErrors] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    }

    const validateForm = () => {
        const newErrors = {
            name: name.trim() === '',
            email: email.trim() === '' || !validateEmail(email.trim()),
            message: message.trim() === ''
        }
        setErrors(newErrors)
        return !Object.values(newErrors).some(error => error)
    }


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        
        // Show errors after button click
        setShowErrors(true)
        
        // Validate and update errors immediately
        const newErrors = {
            name: name.trim() === '',
            email: email.trim() === '' || !validateEmail(email.trim()),
            message: message.trim() === ''
        }
        setErrors(newErrors)
        
        // Only proceed if form is valid
        const isValid = !Object.values(newErrors).some(error => error)
        if (isValid) {
            console.log('Form submitted:', { name, email, message })
            // Show thank you message
            setIsSubmitted(true)
        }
    }

    const handleReset = () => {
        setIsSubmitted(false)
        setName('')
        setEmail('')
        setMessage('')
        setShowErrors(false)
        setErrors({ name: false, email: false, message: false })
    }

    return (
        <section id="contact" className="pt-8 pb-32 md:pt-16 md:pb-32 relative z-10">
            <div className="mx-auto max-w-7xl px-6">
                <h2 className="text-center text-balance"
                    style={{ 
                        fontFamily: "'Apercu Pro', ui-sans-serif, system-ui, sans-serif", 
                        fontWeight: 450,
                        fontSize: '88pt',
                        lineHeight: 1.0
                    }}>
                    See{' '}
                    <AuroraText 
                        colors={["#306FF6", "#B7E9FC", "#306FF6", "#123888"]}
                        speed={1.5}>
                        magic
                    </AuroraText>
                    {' '}live
                </h2>

                <TextEffect
                    per="line"
                    preset="fade-in-blur"
                    speedSegment={0.3}
                    delay={0.5}
                    as="p"
                    className="mx-auto mt-8 max-w-2xl text-balance text-center"
                    style={{ fontFamily: "'Apercu Pro', ui-sans-serif, system-ui, sans-serif", fontWeight: 400, fontSize: '1.375em' }}>
                    Experience our payment solution in action. Schedule your personalized demo today.
                </TextEffect>

                <Card className="mx-auto mt-8 md:mt-16 max-w-xl p-0 rounded-[1.6875em] relative z-20" style={{
                    boxShadow: '0 0.125em 2em rgba(0, 0, 0, 0.08), 0 0.125em 2em color(display-p3 0.000 0.000 0.000 / 0.08)',
                    border: '1px solid transparent',
                    backgroundImage: 'linear-gradient(#FFFFFF, #FFFFFF), linear-gradient(0deg, #FFFFFF 0%, rgba(255, 255, 255, 0.2) 50%, #FFFFFF 100%)',
                    backgroundOrigin: 'border-box',
                    backgroundClip: 'padding-box, border-box'
                }}>
                    {isSubmitted ? (
                        // Thank You Message
                        <div className="flex flex-col justify-center min-h-[25em] space-y-8 relative z-30 px-6 pt-6 pb-4 sm:px-10 sm:pt-10 sm:pb-6 text-center">
                            <div className="flex justify-center">
                                <Image
                                    src="/success-icon.svg"
                                    alt="Success Icon"
                                    width={80}
                                    height={80}
                                    className="w-20 h-20"
                                />
                            </div>
                            
                            <div className="space-y-4">
                                <h3 className="text-balance text-black"
                                    style={{ 
                                        fontFamily: "'Apercu Pro', ui-sans-serif, system-ui, sans-serif", 
                                        fontWeight: 400,
                                        fontSize: '1.5em',
                                        lineHeight: 1.0
                                    }}>
                                    Thank you, {name}!
                                </h3>
                                <p className="text-base text-black max-w-md mx-auto"
                                   style={{ fontFamily: "'Apercu Pro', ui-sans-serif, system-ui, sans-serif", fontSize: '1em' }}>
                                    Your demo request has been received. Our team will reach out to you within 24 hours to schedule your personalized demonstration.
                                </p>
                            </div>
                        </div>
                    ) : (
                        // Contact Form
                        <form onSubmit={handleSubmit} noValidate className="space-y-6 relative z-30 px-6 pt-6 pb-4 sm:px-10 sm:pt-10 sm:pb-6">
                            <div className="space-y-2">
                                <Label htmlFor="name">Full name</Label>
                                <Input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    aria-invalid={showErrors && errors.name}
                                    className={showErrors && errors.name ? 'border-red-500 bg-red-50' : ''}
                                    style={{ fontSize: '1em' }}
                                />
                                {showErrors && errors.name && (
                                    <p className="text-red-500 text-sm mt-1">Full name is required</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Your email</Label>
                                <Input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    aria-invalid={showErrors && errors.email}
                                    className={showErrors && errors.email ? 'border-red-500 bg-red-50' : ''}
                                    style={{ fontSize: '1em' }}
                                />
                                {showErrors && errors.email && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {email.trim() === '' ? 'Email is required' : 'Please enter a valid email address'}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="message">Message</Label>
                                <Textarea
                                    id="message"
                                    name="message"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    rows={6}
                                    aria-invalid={showErrors && errors.message}
                                    className={showErrors && errors.message ? 'border-red-500 bg-red-50' : ''}
                                    style={{ fontSize: '1em' }}
                                />
                                {showErrors && errors.message && (
                                    <p className="text-red-500 text-sm mt-1">Message is required</p>
                                )}
                            </div>

                            <div className="flex justify-center">
                                <RequestDemoButton type="submit" />
                            </div>
                        </form>
                    )}
                </Card>
            </div>
        </section>
    )
}
