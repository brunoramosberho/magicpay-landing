import Image from 'next/image'

export default function Blik() {
    return (
        <Image
            src="/logos/blik-1.png"
            alt="Blik"
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

