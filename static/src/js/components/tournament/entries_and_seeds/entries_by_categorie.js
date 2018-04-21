import React from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';

import EntriesAndSeeds from './entries_and_seeds_index';

const TabsExampleSimple = () => (
  <Tabs>
    <Tab label="Category One">
      <div>
        <EntriesAndSeeds />
      </div>
    </Tab>
    <Tab label="Item Two">
      <div>
        <h2>Tab Two</h2>
        <p>This is another example tab.</p>
      </div>
    </Tab>
  </Tabs>
);

export default TabsExampleSimple;
