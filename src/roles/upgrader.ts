import { Role } from './role';

export class Upgrader extends Role {
    get role(): string { return 'upgrader'; };

    run(creep: Creep) {
        if(creep.carry.energy == 0) {
            const sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE){
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffffff'}});
            }
        } else {
            if(creep.room.controller && creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE){
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
    }
}
