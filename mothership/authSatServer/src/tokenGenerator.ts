export function tokenGenerator(cb: (token: number[]) => void) {
  return setInterval(() => {
    cb(generateToken());
  }, 20000)
};

function generateToken(arrLength: number = 5): number[] {
  return new Array(arrLength).fill(1).map(x => Math.random() >= .5 ? 1 : 0);
}