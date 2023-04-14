import { useState } from 'react';
import ChampionPool from '~/components/ChampionPoolOld';
import Navbar from '~/components/Navbar';
import Searchbar from '~/components/Searchbar';

import TilesMap from '~/components/TilesMap';

function CreateCompPage() {
  return (
    <div>
      {/* <Navbar /> */}
      <div className="mb-2 flex justify-center text-2xl md:mb-10 md:text-6xl">
        <h1>TACTIFY</h1>
      </div>
      <div className="grid place-items-center">
        <TilesMap />
      </div>
    </div>
  );
}

export default CreateCompPage;
