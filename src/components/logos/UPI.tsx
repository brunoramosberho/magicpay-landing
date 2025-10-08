import Image from 'next/image'

export default function UPI() {
    return (
        <Image
            src="/logos/upi_logo_icon_170312.png"
            alt="UPI"
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

