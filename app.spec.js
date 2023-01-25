describe("app.js", ()=>{
    describe("ComputerModel", ()=>{
            describe("getRandomChoice static method", ()=> {
                it("should return a number between 0 and 2", ()=> {
                for (let i = 0; i < 100; i++) {
                    let randomChoice = ComputerModel.getRandomChoice();
                    expect(randomChoice).toBeGreaterThanOrEqual(0);
                    expect(randomChoice).toBeLessThan(3);
                }
            });
        });

    });

    describe("GameModel", ()=>{
        describe('getRoundResult', () => {
            it('should return "draw" when player and computer choices are the same', () => {
            expect(GameModel.getRoundResult('ROCK', 'ROCK')).toBe('draw');
            expect(GameModel.getRoundResult('PAPER', 'PAPER')).toBe('draw');
            expect(GameModel.getRoundResult('SCISSORS', 'SCISSORS')).toBe('draw');
            });
            
            it('should return "computer wins" when player chooses PAPER and computer chooses SCISSORS, player chooses SCISSORS and computer chooses ROCK or player chooses ROCK and computer chooses PAPER', () => {
            expect(GameModel.getRoundResult('SCISSORS', 'PAPER')).toBe('computer wins');
            expect(GameModel.getRoundResult('ROCK', 'SCISSORS')).toBe('computer wins');
            expect(GameModel.getRoundResult('PAPER', 'ROCK')).toBe('computer wins');
            });
            
            it('should return "you win" when player chooses SCISSORS and computer chooses PAPER, player chooses ROCK and computer chooses SCISSORS or player chooses PAPER and computer chooses ROCK', () => {
            expect(GameModel.getRoundResult('PAPER', 'SCISSORS')).toBe('you win');
            expect(GameModel.getRoundResult('SCISSORS', 'ROCK')).toBe('you win');
            expect(GameModel.getRoundResult('ROCK', 'PAPER')).toBe('you win');
            });
            
            it('should throw an error when computer choice is falsy', () => {
                expect(() => GameModel.getRoundResult(undefined, 'ROCK')).toThrow(new Error("computer choice is falsy"));
              });
              
              it('should throw an error when player choice is falsy', () => {
                expect(() => GameModel.getRoundResult('ROCK', null)).toThrow(new Error("player choice is falsy"));
              });
            });

});
})