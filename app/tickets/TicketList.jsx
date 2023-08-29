// next will de-duplicate any fetches that we make to the same resource 
// if we fetch the ticket data somewhere else in the application, next only fetches it once and resuses it wherever else we call that fetch

import Link from "next/link"

// next will cache the response of any fetches that we make so that if we navigate away from the page and come back
// it uses the cached version of the data it already fetched

// we don't always want to reuse cached data, like in this app where the data will change frequently as users add more tickets
// you can ask next to revalidate the cache data (refetch it and rebuild the page that uses that data)
// you can ask it to do this after a set amount of time by adding a second argument to the fetch function
async function getTickets(){
    //imitate delay
    //await new Promise(resolve => setTimeout(resolve, 3000))

    const res = await fetch('http://localhost:4000/tickets', {
        next: {
            // the amount of time next should wait after the last page visit before revalidating the data
            revalidate: 0 // or use 0 to opt out of using cache
        }
    })

    return res.json()
}

export default async function TicketList() {
    // array of tickets data
    const tickets = await getTickets()
    return (
        <>
            {tickets.map((ticket) => (
                <div key={ticket.id} className="card my-5">
                    <Link href={`/tickets/${ticket.id}`}>
                    <h3>{ticket.title}</h3>
                    {/* returns the first 200 characters of the ticket body */}
                    <p>{ticket.body.slice(0, 200)}...</p>
                    <div className={`pill ${ticket.priority}`}>
                        {ticket.priority} priority
                    </div>
                    </Link>
                </div>
            ))}
            {tickets.length === 0 && (
                <p className="text-center">There are no open tickets, yay!</p>
            )}
        </>
    )
}
