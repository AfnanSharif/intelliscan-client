import Logoimg from '@/images/logos/intelliscan.png'
import Image from 'next/image'
export function Logo() {
  return (
    <Image
      src={Logoimg}
      alt="Intelliscan"
      className="h-10 w-auto"
    />
  )
}
