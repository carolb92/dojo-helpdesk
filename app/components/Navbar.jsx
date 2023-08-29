import Image from 'next/image'
import Link from 'next/link'
import Logo from './dojo-logo.png'

export default function Navbar() {
    return (
        <nav>
            <Image
                src={Logo}
                alt={'Dojo Helpdesk logo'}
                width={70}
                quality={100}
                placeholder='blur'
            />
            <h1>Dojo Helpdesk</h1>
            {/* link component has extra functionality compared to an a tag:
                - intercepts request to server and handles routing in front end on browser
                - next.js pre-fetches the page that Link navigates to in the background -- increases speed of the app  */}
            <Link href="/">Dashboard</Link>
            <Link href="/tickets">Tickets</Link>
            </nav>
    )
    }
