import {GameMap} from "../classes/GameMap.class";
import {GameTypeEnum, MovementEnum, OrientationEnum} from "../enums/enums";
import {Adventurer} from "../classes/Adventurer.class";

export class MovementManager {
  private gameMap: GameMap;

  constructor(gameMap: GameMap) {
    this.gameMap = gameMap;
    //console.log("start map", this.gameMap.getMap());
  }

  /** 
   * Boucle sur les aventuriers
   * Vérifie que l'orientation et que les mouvements sont correctes
   * Déplace l'aventurier dans la carte
   * 
   */
  public initAdventurersMovements() {
    const asyncMovements: any = [];
    this.gameMap.getAdventurers().forEach(adventurer => {
      asyncMovements.push(this.launchMovements(adventurer));
    });
    Promise.all(asyncMovements)
      //.then(() => console.log('end map', this.gameMap.getMap()))

  }

  /**
   * Lance tous les mouvements d'un aventurier
   * @param adventurer
   * @private
   */
  public async launchMovements(adventurer: Adventurer) {
    return new Promise(resolve => {
      if (!(adventurer.getOrientation() in OrientationEnum)) {
        throw new Error('Orientation not authorized');
      }
      adventurer.getMovements().forEach((move) => {
        if (!(move in MovementEnum)) {
          throw new Error('Movement not authorized');
        }
        if (move === MovementEnum.A) {
          switch (adventurer.getOrientation()) {
            case OrientationEnum.N:
              this.moveAdventurer(adventurer, -1, null);
              break;
            case OrientationEnum.S:
              this.moveAdventurer(adventurer, +1, null);
              break;
            case OrientationEnum.E:
              this.moveAdventurer(adventurer, null, +1);
              break;
            case OrientationEnum.W:
              this.moveAdventurer(adventurer, null, -1);
              break;
          }
        }
        if (move === MovementEnum.D) {
          switch (adventurer.getOrientation()) {
            case OrientationEnum.N:
              adventurer.setOrientation(OrientationEnum.E);
              break;
            case OrientationEnum.S:
              adventurer.setOrientation(OrientationEnum.W);
              break;
            case OrientationEnum.E:
              adventurer.setOrientation(OrientationEnum.S);
              break;
            case OrientationEnum.W:
              adventurer.setOrientation(OrientationEnum.N)
              break;
          }
        }

        if (move === MovementEnum.G) {
          switch (adventurer.getOrientation()) {
            case OrientationEnum.N:
              adventurer.setOrientation(OrientationEnum.W);
              break;
            case OrientationEnum.S:
              adventurer.setOrientation(OrientationEnum.E);
              break;
            case OrientationEnum.E:
              adventurer.setOrientation(OrientationEnum.N);
              break;
            case OrientationEnum.W:
              adventurer.setOrientation(OrientationEnum.S);
              break;
          }
        }
      });
      resolve(true);
    })

  }

  public moveAdventurer(adventurer: Adventurer, verticalAxis: number | null, horizontalAxis: number | null) {

    let nextCase = '';
    let nextCaseVerticalAxis = 0;
    let nextCaseHorizontalAxis = 0;
    this.updateCurrentCase(adventurer);

    if (verticalAxis) {
      nextCaseVerticalAxis = adventurer.getVerticalAxis() + verticalAxis;
      nextCaseHorizontalAxis = adventurer.getHorizontalAxis();
      this.checkIfMovementValid(nextCaseHorizontalAxis, nextCaseVerticalAxis, adventurer);
      nextCase = this.gameMap.getMap()[nextCaseVerticalAxis][adventurer.getHorizontalAxis()];
    }
    else if (horizontalAxis) {
      nextCaseHorizontalAxis = adventurer.getHorizontalAxis() + horizontalAxis;
      nextCaseVerticalAxis = adventurer.getVerticalAxis();
      this.checkIfMovementValid(nextCaseHorizontalAxis, nextCaseVerticalAxis, adventurer);
      nextCase = this.gameMap.getMap()[adventurer.getVerticalAxis()][nextCaseHorizontalAxis];
    }

    if (nextCase.startsWith(GameTypeEnum.T)) {
      const treasure = this.gameMap.getTreasureInstance(nextCaseVerticalAxis, nextCaseHorizontalAxis);
      this.gameMap.removeTreasureQuantity(treasure);
      adventurer.addCollectedTreasures();
      adventurer.setVerticalAxis(nextCaseVerticalAxis);
      adventurer.setHorizontalAxis(nextCaseHorizontalAxis);
      if (treasure.getQuantity() === 0) {
        this.gameMap.placeAdventurer(adventurer);
      }
    }
    else if (nextCase.startsWith(GameTypeEnum.M)) {
      //ignore movement if nextCase is mountain
      //place adventurer on previous case
      this.gameMap.placeAdventurer(adventurer);
      return;
    }
    else if (nextCase.startsWith(GameTypeEnum.A)) {
      //ignore movement if nextCase is adventurer
      //place adventurer on previous case
      this.gameMap.placeAdventurer(adventurer);
      return;
    }
    else {
      adventurer.setVerticalAxis(nextCaseVerticalAxis);
      adventurer.setHorizontalAxis(nextCaseHorizontalAxis);
      this.gameMap.placeAdventurer(adventurer);
    }
  }

  /**
   * Récupère la position actuelle de l'aventurier
   * S'il n'y a pas de trésor ou de montagne sur la case, remplace la case par un point car l'aventurier va se déplacer
   * @param adventurer 
   */
  private updateCurrentCase(adventurer: Adventurer) {
    const currentCase = this.gameMap.getMap()[adventurer.getVerticalAxis()][adventurer.getHorizontalAxis()];
    if (!currentCase.startsWith('T') && !currentCase.startsWith('M')) {
      this.gameMap.getMap()[adventurer.getVerticalAxis()][adventurer.getHorizontalAxis()] = ".";
    }
  }

  /**
   * Vérifie si le mouvement ne sort pas de la carte
   * @param horizontalAxis
   * @param verticalAxis
   * @param adventurer
   */
  public checkIfMovementValid(horizontalAxis: number, verticalAxis: number, adventurer: Adventurer) {
    if ((horizontalAxis > this.gameMap.getWidth() - 1) || (verticalAxis > this.gameMap.getHeight() - 1)) {
      throw new Error(`Les mouvements ${adventurer.getMovements().join('')} de l'aventurier ${adventurer.getName()} sont invalides`)
    }
    return true;
  }
}