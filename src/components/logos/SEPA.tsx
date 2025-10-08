import Image from 'next/image'

export default function SEPA() {
    return (
        <Image
            src="/logos/SEPA.svg"
            alt="SEPA"
            width={45}
            height={45}
            style={{
                objectFit: 'contain',
                width: '2.25em',
                height: '2.25em',
            }}
        />
    )
}

