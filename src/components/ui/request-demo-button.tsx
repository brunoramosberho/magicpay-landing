import React from 'react'
import Image from 'next/image'

interface RequestDemoButtonProps {
  type?: 'button' | 'submit'
  onClick?: () => void
  className?: string
}

export const RequestDemoButton: React.FC<RequestDemoButtonProps> = ({ 
  type = 'button', 
  onClick,
  className = ''
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`h-16 px-6 font-medium bg-[#306FF6] hover:bg-[#4A7BF7] text-white rounded-xl border-0 cursor-pointer flex items-center gap-2 transition-all duration-100 ease-in hover:shadow-[0_0_20px_rgba(74,123,247,0.6),0_0_40px_rgba(74,123,247,0.4),0_0_60px_rgba(74,123,247,0.2)] hover:scale-[1.02] ${className}`}
      style={{ fontSize: '1.125em' }}
    >
      <Image
        src="/icon.svg"
        alt="Magic Icon"
        width={24}
        height={24}
        className="w-6 h-6"
        style={{ filter: 'brightness(0) invert(1)' }}
      />
      Request demo
    </button>
  )
}
