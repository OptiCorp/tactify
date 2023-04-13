import { useState } from "react"
import ChampionPool from "~/components/ChampionPoolOld"
import Navbar from "~/components/Navbar"
import Searchbar from "~/components/Searchbar"

import TilesMap from "~/components/TilesMap"

function CreateCompPage() {
    return (
        <div>
            {/* <Navbar /> */}
            <div className="flex justify-center mb-2 md:mb-10 text-2xl md:text-6xl">
                <h1>TACTIFY</h1>
            </div>
            <div className="grid place-items-center">
                <TilesMap />
            </div>
        </div>
    )
}

export default CreateCompPage