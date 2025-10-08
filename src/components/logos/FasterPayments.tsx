import Image from 'next/image'

export default function FasterPayments() {
    return (
        <Image
            src="/logos/Faster_Payments_logo.svg.png"
            alt="Faster Payments"
            width={20}
            height={20}
            style={{
                objectFit: 'contain',
                width: '1em',
                height: '1em',
            }}
        />
    )
}

