export abstract class Role {
    abstract get role(): string;

    abstract run(creep: Creep): void;

    spawn(): void {
        const spawnPoint = Game.spawns['Spawn1'];
        if(spawnPoint && spawnPoint.energy >= 200) {
            let count: number = 0;

            for(const n in Game.creeps) {
                const creep: Creep = Game.creeps[n];

                if(creep.memory.role == this.role) {
                    count++;
                }
            }

            if(count === 0) {
                const name: string = `${this.role}1`;
                Game.spawns['Spawn1'].createCreep([MOVE, WORK, CARRY], name);
                Game.creeps[name].memory.role = this.role;
                console.log(`${name} generated`);
            }
        }
    }
}
