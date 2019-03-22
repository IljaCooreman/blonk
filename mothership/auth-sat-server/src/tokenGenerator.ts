export function tokenGenerator(cb: (token: number[]) => void): NodeJS.Timeout {
  return setInterval(() => {
    cb(generateToken());
  }, 20000)
};

function generateToken(arrLength: number = 9): number[] {
  const token = new Array(arrLength).fill(1).map(x => Math.random() >= .5 ? 1 : 0);
  const startAcc: number = 0;
  const total: number = token.reduce((acc, current) => {
    return acc + current;
  }, startAcc)
  return (total >= 3) ? token : generateToken();
}
