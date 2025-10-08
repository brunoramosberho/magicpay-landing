import Image from 'next/image'

export default function Bizum() {
    return (
        <Image
            src="/logos/bizum.svg"
            alt="Bizum"
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

