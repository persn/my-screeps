import { ErrorMapper } from "utils/ErrorMapper";
import { Harvester } from './roles/harvester';

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
    console.log(`Current game tick is ${Game.time}`);
    const harvester: Harvester = new Harvester();

    for (const n in Game.creeps) {
        const creep = Game.creeps[n];
        harvester.run(creep);
    }

    // Automatically delete memory of missing creeps
    for (const name in Memory.creeps) {
        if (!(name in Game.creeps)) {
            delete Memory.creeps[name];
        }
    }
});
