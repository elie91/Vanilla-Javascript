import { GameManager } from "./modules/GameManager";
import { GameMap } from "./classes/GameMap.class";
import { MovementManager } from "./modules/MovementManager";

const gameMap = new GameMap();

const gameManager = new GameManager('input.txt', gameMap);
gameManager.loadData();

const movementManager = new MovementManager(gameMap);
movementManager.initAdventurersMovements();

gameManager.output();