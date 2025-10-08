import Image from 'next/image'

export default function Pix() {
    return (
        <Image
            src="/logos/logo-pix-icone-512.png.webp"
            alt="Pix"
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

