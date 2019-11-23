export class Upgrader {
    run(creep: Creep) {
        if(creep.carry.energy == 0) {
            const sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE){
                creep.moveTo(sources[0]);
            }
        } else {
            if(creep.room.controller && creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE){
                creep.moveTo(creep.room.controller);
            }
        }
    }
}
