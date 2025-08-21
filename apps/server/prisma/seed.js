import { PrismaClient } from "../generated/index.js";

const prisma = new PrismaClient();

const games = await prisma.game.createManyAndReturn({
    data: [
        {
            name: "HORSEPLAY IN TROY",
            description:
                "WHAT A SPECTACULAR SCENE THIS IS, WALDO-WATCHERS! AND WHAT AN EPIC COMMOTION PICTURE! I WONDER WHY THE TROJANS DIDN'T GUESS THE WOODEN HORSE WAS FULL OF GREEKS, AND HOW DID THEY GET IT THROUGH THE GATES OF TROY ANYWAY? I WOULDN'T LIKE TO BE IN THE TROJANS' SANDALS, IF THE COSTUME DEPARTMENT HAD GIVEN THEM ANY, THAT IS!",
            imageURL: "https://i.imgur.com/QLACwOG.jpeg",
            imageWidth: 3536,
            imageHeight: 2227,
        },
        {
            name: "DINOSAURS, SPACEMEN, AND GHOULS",
            description:
                "PHEW, INCREDIBLE! TIME, SPACE, AND HORROR ARE IN A MIGHTY MUDDLE HERE! WHAT COSMIC COSTUMES AND WHAT GREAT SPECIAL EFFECTS! ONE OF THOSE FLYING SAUCERS LOOKS LIKE IT'S REALLY FLYING! ARE THOSE REAL ALIENS INSIDE, NOT ACTORS AT ALL? SO WHAT'S REAL AND WHAT'S MADE UP IN FILMS LIKE THESE?",
            imageURL: "https://i.imgur.com/wg0Npy8.jpeg",
            imageWidth: 3538,
            imageHeight: 2223,
        },
        {
            name: "ALI BABA AND THE FORTY THIEVES",
            description:
                "WHAT A CRUSH IN THE CAVE, WALDO-FOLLOWERS, BUT PAN IN ON THOSE POTS OF TREASURE! HOW MANY THIEVES WERE IN THE STORY? I BELIEVE THIS DIRECTOR THINKS FORTY THOUSAND! HAVE YOU SPOTTED ALI BABA? HE'S IN THE ALLEY, CUTTING HAIR - THE SCRIPTWRITER THINKS HIS NAME'S ALLEY BARBER! JANGLING GENIES - WHAT A FEARFULLY FUNNY FLICK THIS IS!",
            imageURL: "https://i.imgur.com/91qfVY7.jpeg",
            imageWidth: 3505,
            imageHeight: 2226,
        },
        {
            name: "THE UNFRIENDLY GIANTS",
            description:
                "THEN WALDO AND WIZARD WHITEBEARD CAME TO THE LAND OF THE UNFRIENDLY GIANTS. WHERE MANY WALDOS HAD BEEN BEFORE. AND WALDO SAW THAT THE GIANTS WERE HORRIDLY HARASSING THE LITTLE PEOPLE. AND WHEN HE FOUND THE TENTH SCROLL, IT WAS TIME TO CONTINUE WITH HIS JOURNEY.",
            imageURL: "https://i.imgur.com/OtAW3FQ.jpeg",
            imageWidth: 3564,
            imageHeight: 2256,
        },
    ],
});

const characters = await prisma.character.createManyAndReturn({
    data: [
        {
            name: "Waldo",
            imageURL:
                "https://static.wikia.nocookie.net/waldo/images/9/9d/Character.Waldo.jpg",
        },
        {
            name: "Wenda",
            imageURL:
                "https://static.wikia.nocookie.net/waldo/images/3/3e/Character.Wenda.jpg",
        },
        {
            name: "Wizard Whitebeard",
            imageURL:
                "https://static.wikia.nocookie.net/waldo/images/6/60/Character.Whitebeard.jpg",
        },
        {
            name: "Odlaw",
            imageURL:
                "https://static.wikia.nocookie.net/waldo/images/4/45/Character.Odlaw.jpg",
        },
    ],
});

function getGameId(name) {
    return games.find(({ name: n }) => n === name).id;
}

function getCharacterId(name) {
    return characters.find(({ name: n }) => n === name).id;
}

await prisma.coordinate.createMany({
    data: [
        {
            x: 554,
            y: 1858,
            characterId: getCharacterId("Waldo"),
            gameId: getGameId("HORSEPLAY IN TROY"),
        },
        {
            x: 2727,
            y: 1633,
            characterId: getCharacterId("Wenda"),
            gameId: getGameId("HORSEPLAY IN TROY"),
        },
        {
            x: 1005,
            y: 123,
            characterId: getCharacterId("Wizard Whitebeard"),
            gameId: getGameId("HORSEPLAY IN TROY"),
        },
        {
            x: 3248,
            y: 1238,
            characterId: getCharacterId("Waldo"),
            gameId: getGameId("DINOSAURS, SPACEMEN, AND GHOULS"),
        },
        {
            x: 2934,
            y: 1286,
            characterId: getCharacterId("Wenda"),
            gameId: getGameId("DINOSAURS, SPACEMEN, AND GHOULS"),
        },
        {
            x: 2376,
            y: 1609,
            characterId: getCharacterId("Wizard Whitebeard"),
            gameId: getGameId("DINOSAURS, SPACEMEN, AND GHOULS"),
        },
        {
            x: 2556,
            y: 1337,
            characterId: getCharacterId("Waldo"),
            gameId: getGameId("ALI BABA AND THE FORTY THIEVES"),
        },
        {
            x: 3039,
            y: 424,
            characterId: getCharacterId("Wenda"),
            gameId: getGameId("ALI BABA AND THE FORTY THIEVES"),
        },
        {
            x: 356,
            y: 1422,
            characterId: getCharacterId("Wizard Whitebeard"),
            gameId: getGameId("ALI BABA AND THE FORTY THIEVES"),
        },
        {
            x: 639,
            y: 1491,
            characterId: getCharacterId("Waldo"),
            gameId: getGameId("THE UNFRIENDLY GIANTS"),
        },
        {
            x: 2464,
            y: 1794,
            characterId: getCharacterId("Wenda"),
            gameId: getGameId("THE UNFRIENDLY GIANTS"),
        },
        {
            x: 3417,
            y: 1740,
            characterId: getCharacterId("Wizard Whitebeard"),
            gameId: getGameId("THE UNFRIENDLY GIANTS"),
        },
        {
            x: 2091,
            y: 2034,
            characterId: getCharacterId("Odlaw"),
            gameId: getGameId("THE UNFRIENDLY GIANTS"),
        },
    ],
});
