import { notFound } from 'next/navigation'

// this page will be rendered whenever we go to the url /tickets/id

// instructions for nextjs about what to do if a page hasn't been built ahead of time for a specific id when a request comes in for it
// dynamicParams = false will tell nextjs to return a 404 page
// setting true -> for any request for tickets that don't have pages made for them, next will try to fetch the data for the ticket and create a new page in case the id exists 
// then can generate a static page for future requests to that ticket
export const dynamicParams = true

// tell nextjs all of the ids in advance so at build time it knows all the pages and routes it needs to make so it can be statically rendered and served from a CDN
// this function gets a list of all the ids and tickets at build time so next can make a page and corresponding route for each of them
export async function generateStaticParams(){
    const res = await fetch ('http://localhost:4000/tickets/')

    const tickets = await res.json()

    // return an array of objects where each object represents a single page or route that we want nextjs to make
    // need to specify the route parameter name as a property of the object
    return tickets.map(ticket => ({
        id: ticket.id
    }))
}

// id is dynamic
async function getTicket(id){
    //imitate delay
    //await new Promise(resolve => setTimeout(resolve, 3000))

    const res = await fetch('http://localhost:4000/tickets/' + id, {
        next: {
            // the amount of time next should wait after the last page visit before revalidating the data
            revalidate: 60
        }
    })

    if(!res.ok){
        // returns a 404 page
        notFound()
    }

    return res.json()
}

// we automatically get the params property from props
// can access the parameter name (we want the id) from the params object
export default async function TicketDetails({ params }) {
    const ticket = await getTicket(params.id)
    

    return (
        <main>
            <nav>
                <h2>Ticket Details</h2>
            </nav>
            <div className="card">
                <h3>{ticket.title}</h3>
                <small>Created by {ticket.user_email}</small>
                <p>{ticket.body}</p>
                <div className={`pill ${ticket.priority}`}>
                        {ticket.priority} priority
                    </div>
            </div>
        </main>
    )
}
