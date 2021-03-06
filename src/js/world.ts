/// <reference path="lib/three.d.ts" />
/// <reference path="lib/underscore.d.ts" />
/**
 * Describe a Three.js 3D World
 */

/**
 * A simple Three.JS block,
 * define all the materials and geometry every time.
 */
export class Block {
    public material:THREE.MeshBasicMaterial;
    public geometry:THREE.Geometry;
    public mesh:THREE.Mesh;

    constructor(x:number, y:number, z:number, width:number, height:number, depth:number) {
        this.material = new THREE.MeshBasicMaterial({color: 0x535474 });
        this.geometry = new THREE.BoxGeometry(width, height, depth);
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.position = new THREE.Vector3(x, y, z);
        this.mesh.castShadow = true;
        this.mesh.receiveShadow = true;
    }

    public distanceTo(position:THREE.Vector3) {
        return this.mesh.position.distanceTo(position);
    }

    public setPinched(value:boolean) {
        if (value) {
            this.material.color.setHex(0x42c94f);
        }
        else {
            this.material.color.setHex(0x535474);
        }
    }

    public setActive(value:boolean) {
        if (value) {
            this.material.color.setHex(0x9992B6);
        }
        else {
            this.material.color.setHex(0x535474);
        }
    }
}

/**
 * Basic world containers,
 * Register and search for items in the 3D world.
 */
export class World {
    private blocks:Block[];
    private scene:THREE.Scene;

    constructor(scene:THREE.Scene) {
        this.scene = scene;
        this.blocks = [];
    }

    public addBlock(x:number, y:number, z:number) {
        var b:Block = new Block(x, y, z, 1, 1, 1);
        this.register(b);
    }

    public register(item:any) {
        this.blocks.push(item);
        this.scene.add(item.mesh);
    }

    public getBlockAt(position:THREE.Vector3, distance:number):Block {
        var closest = _.min(this.blocks, (block:Block) => block.distanceTo(position));

        if (closest && closest.distanceTo(position) < distance) {
            return closest;
        }
        else {
            return null;
        }
    }
}