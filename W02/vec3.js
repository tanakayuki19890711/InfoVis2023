class Vec3 {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    add(v) {
        this.x += v.x;
        this.y += v.y;
        this.z += v.z;
        return this;
    }

    max() {
        return Math.max(this.x, this.y, this.z);
    }

    min() {
        return Math.min(this.x, this.y, this.z);
    }

    mid() {
        const values = [this.x, this.y, this.z].sort((a, b) => a - b);
        return values[1]; 
    }

    cross(v) {
        return new Vec3(
            this.y * v.z - this.z * v.y,
            this.z * v.x - this.x * v.z,
            this.x * v.y - this.y * v.x
        );
    }

    dot(v) {
        return this.x * v.x + this.y * v.y + this.z * v.z;
    }

    subtract(v) {
        return new Vec3(this.x - v.x, this.y - v.y, this.z - v.z);
    }

    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }
}

function AreaOfTriangle(v1, v2, v3) {
    const crossProduct = v2.subtract(v1).cross(v3.subtract(v1));
    const volume = Math.abs(v1.dot(crossProduct)) / 6;
    return volume;
}

const point1 = new Vec3(1, 3, 0);
const point2 = new Vec3(1, 6, 0);
const point3 = new Vec3(0, 1, 4);
const point4 = new Vec3(0, 0, 1);

console.log(AreaOfTriangle(point2, point3, point4));
console.log(point1.min())
console.log(point2.max())
console.log(point3.mid())
