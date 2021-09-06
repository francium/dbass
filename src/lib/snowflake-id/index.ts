export function snowfakeId(): number {
    const ms = +new Date();
    return ms * 1000 + Math.floor(Math.random() * 1000);
}
