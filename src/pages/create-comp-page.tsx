import { useState } from "react"
import ChampionPool from "~/components/ChampionPoolOld"
import Navbar from "~/components/Navbar"
import Searchbar from "~/components/Searchbar"

import TilesMap from "~/components/TilesMap"

function CreateCompPage() {
    return (
        <div>
            <Navbar />
            <div className="grid p-10 place-items-center">
                <h1 className="mb-6">Create Comp</h1>
                <TilesMap />
                
            </div>
        </div>
    )
}

export default CreateCompPage