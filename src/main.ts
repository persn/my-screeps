import { ErrorMapper } from "utils/ErrorMapper";
import { Harvester } from './roles/harvester';
import { Upgrader } from './roles/upgrader';

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
    console.log(`Current game tick is ${Game.time}`);
    const harvester: Harvester = new Harvester();
    const upgrader: Upgrader = new Upgrader();

    for (const n in Game.creeps) {
        const creep: Creep = Game.creeps[n];

        if(creep.memory.role == 'harvester') {
            harvester.run(creep);
        } else if(creep.memory.role == 'upgrader') {
            upgrader.run(creep);
        }
    }

    // Automatically delete memory of missing creeps
    for (const name in Memory.creeps) {
        if (!(name in Game.creeps)) {
            delete Memory.creeps[name];
        }
    }
});
