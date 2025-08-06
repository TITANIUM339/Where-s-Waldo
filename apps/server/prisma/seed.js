import { PrismaClient } from "../generated/index.js";

const prisma = new PrismaClient();

const games = await prisma.game.createManyAndReturn({
    data: [
        {
            name: "Horseplay in Troy",
            description:
                "What a spectacular scene this is, Waldo-Watchers? And what an epic commotion picture! I wonder why the trojans didn't guess the wooden horse was full of greeks, and how did they get it through the gates of Troy anyway? I wouldn't like to be in the trojans sandals, if the costume department had givin them any, that is!",
            imageURL: "https://i.imgur.com/QLACwOG.jpeg",
            imageWidth: 3536,
            imageHeight: 2227,
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
            gameId: getGameId("Horseplay in Troy"),
        },
    ],
});
