import TicketList from "./TicketList";
import { Suspense } from "react";
import Loading from "../loading";

export default function Tickets() {
    return (
        <div>
            <main>
                <nav>
                    <div>
                        <h2>Tickets</h2>
                        <p><small>Currently open tickets</small></p>
                    </div>
                </nav>

                {/* everything outside the suspense boundary still loads instantly */}
                {/* creates a boundary around the component that relies on data fetching */}
                <Suspense fallback={<Loading />}>
                    <TicketList />
                </Suspense>
                
            </main>
        </div>
    )
}
