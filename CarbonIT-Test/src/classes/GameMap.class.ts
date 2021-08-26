import {Mountain} from "./Moutain.class";
import {Treasure} from "./Treasure.class";
import {Adventurer} from "./Adventurer.class";
import {CoordinateInterface} from "../interfaces/interfaces";
import {GameTypeEnum} from "../enums/enums";

/**
 * Classe responsable de la gestion de la carte
 */
export class GameMap {
    private _width: number;
    private _height: number;
    private _map: string[][];
    private _mountains: Mountain[];
    private _treasures: Treasure[];
    private _adventurers: Adventurer[];

    constructor() {
        this._width = 0;
        this._height = 0;
        this._map = [];
        this._mountains = [];
        this._treasures = [];
        this._adventurers = [];
    }

    public setWidth(value: number): void {
        this._width = value;
        this.setMap();
    }

    public setHeight(value: number): void {
        this._height = value;
        this.setMap();
    }

    public getWidth(): number {
        return this._width
    }

    public getHeight(): number {
        return this._height
    }


    public getMap() {
        return this._map;
    }

    /**
     * Generate a two dimensional array based on map height and length
     */
    public setMap() {
        this._map = Array.from({
            length: this._height
        }, () => new Array(this._width).fill("."));
    }

    public addMountain(mountain: Mountain) {
        this.checkIfCoordinatesValid(mountain, GameTypeEnum.M);
        this._mountains = [...this._mountains, mountain];
        this._map[mountain.getVerticalAxis()][mountain.getHorizontalAxis()] = "M";
    }

    public addTreasure(treasure: Treasure) {
        this.checkIfCoordinatesValid(treasure, GameTypeEnum.T);
        this._treasures = [...this._treasures, treasure];
        this._map[treasure.getVerticalAxis()][treasure.getHorizontalAxis()] = `T(${treasure.getQuantity()})`;
    }


    public addAdventurer(adventurer: Adventurer) {
        this.checkIfCoordinatesValid(adventurer, GameTypeEnum.A);
        this._adventurers = [...this._adventurers, adventurer];
        this.placeAdventurer(adventurer);
    }

    public placeAdventurer(adventurer: Adventurer) {
        this._map[adventurer.getVerticalAxis()][adventurer.getHorizontalAxis()] = `A(${adventurer.getName()})`;
    }

    public getAdventurers() {
        return this._adventurers;
    }

    public getMountains() {
        return this._mountains;
    }

    public getTreasures() {
        return this._treasures;
    }

    /**
     * Retourne l'instance du trésor existant aux coordonées passées en params
     * @param verticalAxis
     * @param horizontalAxis
     */
    public getTreasureInstance(verticalAxis: number, horizontalAxis: number): Treasure {
        return this
            .getTreasures()
            .filter(treasure => {
                if (treasure.getVerticalAxis() === verticalAxis && treasure.getHorizontalAxis() === horizontalAxis) {
                    return true;
                }
            })[0]
    }

    /**
     * Retourne l'instance de l'aventurier existant aux coordonées passées en params
     * @param verticalAxis
     * @param horizontalAxis
     */
    public getAdventurerInstance(verticalAxis: number, horizontalAxis: number): Adventurer {
        return this
            .getAdventurers()
            .filter(adventurer => {
                if (adventurer.getVerticalAxis() === verticalAxis && adventurer.getHorizontalAxis() === horizontalAxis) {
                    return true;
                }
            })[0]
    }

    public removeTreasureQuantity(treasure: Treasure) {
        const nextQuantity = treasure.getQuantity() - 1;
        treasure.setQuantity(nextQuantity);
        if (nextQuantity === 0) {
            this._map[treasure.getVerticalAxis()][treasure.getHorizontalAxis()] = ".";
            this._treasures = this._treasures.filter(t => {
                if (t.getHorizontalAxis() === treasure.getHorizontalAxis() && t.getVerticalAxis() === treasure.getVerticalAxis()) {
                    return false;
                } else {
                    return true;
                }
            });
        } else {
            this._map[treasure.getVerticalAxis()][treasure.getHorizontalAxis()] = `T(${treasure.getQuantity()})`;
        }
    }

    /**
     * Vérifie si l'objet que l'on souhaite ajouter à la carte possède des coordonées valides
     * C'est à dire que sa latitude et longitude rentrent dans la carte
     * @param instance
     * @param name
     */
    public checkIfCoordinatesValid(instance: CoordinateInterface, name: GameTypeEnum) {
        if ((instance.getHorizontalAxis() > this._width - 1) || (instance.getVerticalAxis() > this._height - 1)) {
            throw new Error(`Les coordonées saisies pour l'élement ${name} - ${instance.getHorizontalAxis()} - ${instance.getVerticalAxis()} sont invalides`)
        }
        return true;
    }
}