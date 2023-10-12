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
        return values[1]; // 中央の値を返す
    }
}
