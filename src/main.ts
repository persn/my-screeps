import { ErrorMapper } from "utils/ErrorMapper";
import { Harvester } from './roles/harvester';
import { Upgrader } from './roles/upgrader';
import { Builder } from './roles/builder';

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
    const harvester: Harvester = new Harvester();
    const upgrader: Upgrader = new Upgrader();
    const builder: Builder = new Builder();

    // Spawn creep
    harvester.spawn();
    upgrader.spawn();
    builder.spawn();

    // Automate creep
    for (const n in Game.creeps) {
        const creep: Creep = Game.creeps[n];

        if(creep.memory.role == 'harvester') {
            harvester.run(creep);
        } else if(creep.memory.role == 'upgrader') {
            upgrader.run(creep);
        } else if(creep.memory.role == 'builder') {
            builder.run(creep);
        }
    }

    // Automatically delete memory of missing creeps
    for (const name in Memory.creeps) {
        if (!(name in Game.creeps)) {
            delete Memory.creeps[name];
        }
    }
});
