import fs from 'fs';
import { GameTypeEnum } from "../enums/enums";
import { GameMap } from "../classes/GameMap.class";
import { Mountain } from "../classes/Moutain.class";
import { Treasure } from "../classes/Treasure.class";
import { Adventurer } from "../classes/Adventurer.class";

export class GameManager {

    public filename: string;
    public data: string[][] = [];
    public gameMap: GameMap;

    constructor(filename: string, gameMap: GameMap) {
        this.filename = filename;
        this.gameMap = gameMap;
    }

    /**
     * Read file, split and trim values
     */
    public loadData(): void {
        //read the file and split by line break
        let data = fs.readFileSync(this.filename, { encoding: 'utf-8' }).split('\n');
        //remove commented and empty lines
        data = data.filter((row) => (!row.startsWith('#') && row.length > 0));
        //split each line by - separator and trim the value
        this.data = data.map((row: string): string[] => {
            const rowData = row.split('-');
            return rowData.map((value: string) => value.trim());
        });
        this.initData();
    }

    /**
     * Set map height and width
     */
    public initMap() {
        if (this.data[0][0] !== GameTypeEnum.C) {
            throw new Error("Please pass map information first");
        }
        // + convert string to int in javascript
        this.gameMap.setWidth(+this.data[0][1]);
        this.gameMap.setHeight(+this.data[0][2]);
    }

    public initData() {
        this.initMap();
        this.data.forEach((row: string[], index: number) => {
            //skip map data because already set in initMap function
            if (index === 0) return;
            this.insertMapData(row, index);
        });
    }

    private insertMapData(row: string[], index: number) {
        switch (row[0]) {
            case GameTypeEnum.M:
                this.gameMap.addMountain(new Mountain(+row[1], +row[2]));
                break;
            case GameTypeEnum.T:
                this.gameMap.addTreasure(new Treasure(+row[1], +row[2], +row[3]));
                break;
            case GameTypeEnum.A:
                const adventurer = new Adventurer(row[1], +row[2], +row[3], row[4], row[5]);
                adventurer.setAppearanceOrder(index);
                this.gameMap.addAdventurer(adventurer);
                break;
            case GameTypeEnum.C:
                throw new Error("A map has already been declared in the game");
        }
    }

    public output() {

        const mountainsOutput = this.gameMap.getMountains().map(mountain => {
            return `M - ${mountain.getHorizontalAxis()} - ${mountain.getVerticalAxis()}\n`
        });
        const treasuresOutput = this.gameMap.getTreasures().map(treasure => {
            return `T - ${treasure.getHorizontalAxis()} - ${treasure.getVerticalAxis()} - ${treasure.getQuantity()} \n`
        });
        const adventurersOutput = this.gameMap.getAdventurers().map(adventurer => {
            return `A - ${adventurer.getName()} - ${adventurer.getHorizontalAxis()} - ${adventurer.getVerticalAxis()} - ${adventurer.getOrientation()} - ${adventurer.getCollectedTreasures()} \n`
        });


        fs.writeFile(
            'output.txt',
            `C - ${this.gameMap.getWidth()} - ${this.gameMap.getHeight()}\n${mountainsOutput}${treasuresOutput}${adventurersOutput}`,
            function (err) {
                if (err) throw err;
                console.log('Saved!');
            });
    }


}


