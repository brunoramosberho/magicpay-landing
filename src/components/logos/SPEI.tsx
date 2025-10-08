import Image from 'next/image'

export default function SPEI() {
    return (
        <Image
            src="/logos/6789cc77b6e94dcfc69bff38_678316f1deb3c248c28a6e62_678303b45852c5789574d308_673ac368090f6729f6f41fe6_spei_logosimbolo.png"
            alt="SPEI"
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

