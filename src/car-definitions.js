const Subcompact = Object.freeze({
    NAME: 'Subcompact',
    COST: 300,
    WEIGHT: 500,
    CUBIC_FEET: 200
});

const Compact = Object.freeze({
    NAME: 'Compact',
    COST: 400,
    WEIGHT: 600,
    CUBIC_FEET: 220
});

const MidSize = Object.freeze({
    NAME: 'Mid-size',
    COST: 600,
    WEIGHT: 800,
    CUBIC_FEET: 240
});

const Suv = Object.freeze({
    NAME: 'SUV',
    COST: 800,
    WEIGHT: 900,
    CUBIC_FEET: 300
});

const Semi = Object.freeze({
    NAME: 'Semi',
    COST: 30000,
    WEIGHT: 10000,
    CUBIC_FEET: 6000
});

const Pickup = Object.freeze({
    NAME: 'Pickup',
    COST: 900,
    WEIGHT: 1000,
    CUBIC_FEET: 600
});


const LightChassis = Object.freeze({
    NAME: 'Light',
    COST: 300,
    WEIGHT: 1200,
    HP: 200
});

const StandardChassis = Object.freeze({
    NAME: 'Standard',
    COST: 400,
    WEIGHT: 1500,
    HP: 300
});

const LargeChassis = Object.freeze({
    NAME: 'Large',
    COST: 600,
    WEIGHT: 2300,
    HP: 400
});

const HeavyChassis = Object.freeze({
    NAME: 'Heavy',
    COST: 800,
    WEIGHT: 2500,
    HP: 600
});

const ExtraHeavyChassis = Object.freeze({
    NAME: 'Extra Heavy',
    COST: 900,
    WEIGHT: 3200,
    HP: 800
});

const MegaLoadChassis = Object.freeze({
    NAME: 'Mega Load',
    COST: 10000,
    WEIGHT: 50000,
    HP: 1200
});

const Chassis = Object.freeze({
    LIGHT: LightChassis,
    STANDARD: StandardChassis,
    LARGE: LargeChassis,
    HEAVY: HeavyChassis,
    EXTRA_HEAVY: ExtraHeavyChassis,
    MEGALOAD: MegaLoadChassis
});
const chassisArray = Object.values(Chassis);


const SmallEngine = Object.freeze({
    NAME: 'Small',
    COST: 300,
    WEIGHT: 400,
    CUBIC_FEET: 25,
    KWATTS: 100,
    HP: 200
});

const MediumEngine = Object.freeze({
    NAME: 'Medium',
    COST: 400,
    WEIGHT: 500,
    CUBIC_FEET: 50,
    KWATTS: 125,
    HP: 300
});

const LargeEngine = Object.freeze({
    NAME: 'Large',
    COST: 600,
    WEIGHT: 600,
    CUBIC_FEET: 75,
    KWATTS: 150,
    HP: 400
});

const ExtraLargeEngine = Object.freeze({
    NAME: 'ExtraLarge',
    COST: 800,
    WEIGHT: 700,
    CUBIC_FEET: 100,
    KWATTS: 200,
    HP: 600
});

const MegaCoreEngine = Object.freeze({
    NAME: 'MegaCore',
    COST: 900,
    WEIGHT: 1000,
    CUBIC_FEET: 200,
    KWATTS: 500,
    HP: 1200
});

const FusionEngine = Object.freeze({
    SMALL: SmallEngine,
    MEDIUM: MediumEngine,
    LARGE: LargeEngine,
    EXTRA_LARGE: ExtraLargeEngine,
    MEGA_CORE: MegaCoreEngine,
});
const fusionEngineArray = Object.values(FusionEngine);

const Body = Object.freeze({
    SUBCOMPACT: Subcompact,
    COMPACT: Compact,
    MIDSIZE: MidSize,
    SUV: Suv,
    PICKUP: Pickup,
    SEMI: Semi
});
const bodyArray = Object.values(Body);

function getNextEnum(enumArray, currentEnum) {
    const currentIndex = enumArray.indexOf(currentEnum);
    const nextIndex = (currentIndex + 1) % enumArray.length;
    return enumArray[nextIndex];
}

const StandardTires = Object.freeze({
    NAME: 'Standard',
    COST: 50,
    WEIGHT: 30,
    CUBIC_FEET: 5,
    HP: 5
});

const OffRoad = Object.freeze({
    NAME: 'Off-Road',
    COST: 100,
    WEIGHT: 40,
    CUBIC_FEET: 10,
    HP: 10
});

const RunFlat = Object.freeze({
    NAME: 'Run-Flat',
    COST: 200,
    WEIGHT: 50,
    CUBIC_FEET: 5,
    HP: 15
});

const Solid = Object.freeze({
    NAME: 'Solid',
    COST: 500,
    WEIGHT: 75,
    CUBIC_FEET: 5,
    HP: 20
});

const Tires = Object.freeze({
    STANDARD: StandardTires,
    OFF_ROAD: OffRoad,
    RUN_FLAT: RunFlat,
    SOLID: Solid
});
const tiresArray = Object.values(Tires);

const MachineGun = Object.freeze({
    NAME: 'Machine Gun',
    COST: 1000,
    WEIGHT: 3,
    UNIT: 20,
    CUBIC_FEET: 5,
    DAMAGE: 20,
    AREA_DAMAGE: false
});

const GrenadeLauncher = Object.freeze({
    NAME: 'Gr. Launchr',
    COST: 1000,
    WEIGHT: 5,
    UNIT: 1,
    CUBIC_FEET: 10,
    DAMAGE: 16,
    AREA_DAMAGE: true
});

const RocketLauncher = Object.freeze({
    NAME: 'Rckt Launchr',
    COST: 1000,
    WEIGHT: 25,
    UNIT: 1,
    CUBIC_FEET: 10,
    DAMAGE: 24,
    AREA_DAMAGE: false
});

const FlameThrower = Object.freeze({
    NAME: 'Flame Thrwr',
    COST: 500,
    WEIGHT: 5,
    UNIT: 1,
    CUBIC_FEET: 10,
    DAMAGE: 20,
    AREA_DAMAGE: false
});

const None = Object.freeze({
    NAME: 'None',
    COST: 0,
    WEIGHT: 0,
    CUBIC_FEET: 0
});

const Weapon = Object.freeze({
    MACHINE_GUN: MachineGun,
    GRENADE_LAUNCHER: GrenadeLauncher,
    ROCKET_LAUNCHER: RocketLauncher,
    FLAME_THROWER: FlameThrower,
    NONE: None,
});
const weaponArray = Object.values(Weapon);
