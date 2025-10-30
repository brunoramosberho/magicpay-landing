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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const COUNTRIES = [
    "Afghanistan",
    "Albania",
    "Algeria",
    "Andorra",
    "Angola",
    "Antigua and Barbuda",
    "Argentina",
    "Armenia",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bhutan",
    "Bolivia",
    "Bosnia and Herzegovina",
    "Botswana",
    "Brazil",
    "Brunei",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cabo Verde",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Central African Republic",
    "Chad",
    "Chile",
    "China",
    "Colombia",
    "Comoros",
    "Congo",
    "Costa Rica",
    "Cote d'Ivoire",
    "Croatia",
    "Cuba",
    "Cyprus",
    "Czechia",
    "Democratic Republic of the Congo",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Eswatini",
    "Ethiopia",
    "Fiji",
    "Finland",
    "France",
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Greece",
    "Grenada",
    "Guatemala",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
    "Holy See",
    "Honduras",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Ireland",
    "Israel",
    "Italy",
    "Jamaica",
    "Japan",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Kuwait",
    "Kyrgyzstan",
    "Laos",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands",
    "Mauritania",
    "Mauritius",
    "Mexico",
    "Micronesia",
    "Moldova",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Morocco",
    "Mozambique",
    "Myanmar",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "North Korea",
    "North Macedonia",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Poland",
    "Portugal",
    "Qatar",
    "Romania",
    "Russia",
    "Rwanda",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Vincent and the Grenadines",
    "Samoa",
    "San Marino",
    "Sao Tome and Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Korea",
    "South Sudan",
    "Spain",
    "Sri Lanka",
    "Sudan",
    "Suriname",
    "Sweden",
    "Switzerland",
    "Syria",
    "Taiwan",
    "Tajikistan",
    "Tanzania",
    "Thailand",
    "Timor-Leste",
    "Togo",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "United States",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Venezuela",
    "Vietnam",
    "Yemen",
    "Zambia",
    "Zimbabwe"
]

export default function ContactSection() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [company, setCompany] = useState('')
    const [country, setCountry] = useState('')
    const [message, setMessage] = useState('')
    const [errors, setErrors] = useState({
        name: false,
        email: false,
        company: false,
        country: false,
        message: false
    })
    const [showErrors, setShowErrors] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitError, setSubmitError] = useState<string | null>(null)

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    }

    const validateForm = () => {
        const newErrors = {
            name: name.trim() === '',
            email: email.trim() === '' || !validateEmail(email.trim()),
            company: company.trim() === '',
            country: country.trim() === '',
            message: message.trim() === ''
        }
        setErrors(newErrors)
        return !Object.values(newErrors).some(error => error)
    }


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        // Show errors after button click
        setShowErrors(true)
        setSubmitError(null)
        
        // Validate and update errors immediately
        const newErrors = {
            name: name.trim() === '',
            email: email.trim() === '' || !validateEmail(email.trim()),
            company: company.trim() === '',
            country: country.trim() === '',
            message: message.trim() === ''
        }
        setErrors(newErrors)
        
        // Only proceed if form is valid
        const isValid = !Object.values(newErrors).some(error => error)
        if (isValid) {
            setIsSubmitting(true)
            try {
                const response = await fetch('/api/send-demo-request', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: name.trim(),
                        email: email.trim(),
                        company: company.trim(),
                        country: country.trim(),
                        message: message.trim(),
                    }),
                })

                const data = await response.json()

                if (!response.ok) {
                    throw new Error(data.error || 'Error al enviar el formulario')
                }

                // Show thank you message
                setIsSubmitted(true)
            } catch (error) {
                console.error('Error submitting form:', error)
                setSubmitError(error instanceof Error ? error.message : 'Error al enviar el formulario. Por favor intenta de nuevo.')
            } finally {
                setIsSubmitting(false)
            }
        }
    }

    const handleReset = () => {
        setIsSubmitted(false)
        setName('')
        setEmail('')
        setCompany('')
        setCountry('')
        setMessage('')
        setShowErrors(false)
        setSubmitError(null)
        setErrors({ name: false, email: false, company: false, country: false, message: false })
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
                                <Label htmlFor="company">Company Name</Label>
                                <Input
                                    type="text"
                                    id="company"
                                    name="company"
                                    value={company}
                                    onChange={(e) => setCompany(e.target.value)}
                                    aria-invalid={showErrors && errors.company}
                                    className={showErrors && errors.company ? 'border-red-500 bg-red-50' : ''}
                                    style={{ fontSize: '1em' }}
                                />
                                {showErrors && errors.company && (
                                    <p className="text-red-500 text-sm mt-1">Company name is required</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="country">Country</Label>
                                <Select value={country} onValueChange={(v) => setCountry(v)}>
                                    <SelectTrigger aria-invalid={showErrors && errors.country} className={showErrors && errors.country ? 'w-full border-red-500 bg-red-50' : 'w-full'}>
                                        <SelectValue placeholder="Select country" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {COUNTRIES.map((c) => (
                                            <SelectItem key={c} value={c}>{c}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {showErrors && errors.country && (
                                    <p className="text-red-500 text-sm mt-1">Country is required</p>
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

                            {submitError && (
                                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                    <p className="text-red-600 text-sm">{submitError}</p>
                                </div>
                            )}

                            <div className="flex justify-center">
                                <RequestDemoButton 
                                    type="submit" 
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Enviando...' : 'Request demo'}
                                </RequestDemoButton>
                            </div>
                        </form>
                    )}
                </Card>
            </div>
        </section>
    )
}
