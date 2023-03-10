describe("app.js", ()=>{
    describe("ComputerModel", ()=>{
      let computerModel1, computerModel2;

beforeEach(function() {
computerModel1 = new ComputerModel();
computerModel2 = new ComputerModel();
});
it('should implements singleton design pattern : only one instance implies all  refers to the same instance', function() {
  expect(computerModel1).toEqual(computerModel2);
  });
        describe("getRandomNumber static method", ()=> {
                it("should return a number between 0 and 2", ()=> {
                for (let i = 0; i < 100; i++) {
                    let randomNumber = ComputerModel.getRandomNumber();
                    expect(randomNumber).toBeGreaterThanOrEqual(0);
                    expect(randomNumber).toBeLessThan(3);
                }
            });
        });
        describe("getAntagonist static method", ()=>{
          it('should return ROCK when choice parameter is SCISSORS', () => {
            expect(ComputerModel.getAntagonist('SCISSORS')).toBe('ROCK');
          });
          it('should return PAPER when choice parameter is ROCK', () => {
            expect(ComputerModel.getAntagonist('ROCK')).toBe('PAPER');
          });
          it('should return SCISSORS when choice parameter is PAPER', () => {
            expect(ComputerModel.getAntagonist('PAPER')).toBe('SCISSORS');
          });
          it('should throw an error when choice parameter is falsy (i.e: null or undefined)', ()=>{
            let undefinedChoice;
            expect(()=>ComputerModel.getAntagonist(undefinedChoice)).toThrow(new TypeError(`choice is falsy: ${undefinedChoice}`))
            let nullChoice=null
            expect(()=>ComputerModel.getAntagonist(nullChoice)).toThrow(new TypeError(`choice is falsy: ${nullChoice}`))
          } );
          it('should throw an error when choice parameter is an unexpected value (e.g. 42 or FOOBAR) ', ()=>{
            let unexpectedChoice='FOOBAR';
            expect(()=>ComputerModel.getAntagonist(unexpectedChoice)).toThrow(new Error(`Unexpected choice. Can't determine antagonist choice for ${unexpectedChoice}`))
            
          } );

        });
    });
    describe('PlayerModel', () => {
        describe('getChoice', () => {
          it('should return the player choice in uppercase', () => {
            const event = { target: { id: 'rock' } };
            const expectedChoice = 'ROCK';
            const choice = PlayerModel.getChoice(event);
            expect(choice).toEqual(expectedChoice);
          });
      
          it('should throw an error if there is an error retrieving the player choice', () => {
            const event = { target: {} };
            const errorMessage = `Cannot read properties of undefined (reading 'toUpperCase')`;
            expect(() => PlayerModel.getChoice(event)).toThrowError(errorMessage);
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
              it('should throw an error when player or computer choice is an unexpected value (e.g. FOOBAR or 42)', () => {
                
                expect(() => GameModel.getRoundResult('FOOBAR', 'ROCK')).toThrow(new Error("Unexpected value of player or computer choice"));
                expect(() => GameModel.getRoundResult(42, 'ROCK')).toThrow(new TypeError(`Wrong type given`));
              });
            });
});

describe("GameView", ()=>{
  describe('getBackgroundColor', () => {
    beforeEach(() => {
      spyOn(console, 'error'); //espionner la methode error de console
    });
      it('should return the color code for a draw result', () => {
        const result = 'draw';
        const expectedColor = COLOR.DRAW;
        const color = GameView.getBackgroundColor(result);
        expect(color).toEqual(expectedColor);
      });
    
      it('should return the color code for a computer win result', () => {
        const result = 'computer wins';
        const expectedColor = COLOR.COMPUTER_WINS;
        const color = GameView.getBackgroundColor(result);
        expect(color).toEqual(expectedColor);
      });
    
      it('should return the color code for a player win result', () => {
        const result = 'you win';
        const expectedColor = COLOR.PLAYER_WINS;
        const color = GameView.getBackgroundColor(result);
        expect(color).toEqual(expectedColor);
      });
    
      it('should call console.error when result is falsy', () => {
        let nullResult=null;
        GameView.getBackgroundColor(nullResult);
        expect(console.error).toHaveBeenCalledWith('error:', new TypeError(`result falsy : ${nullResult}`));
        });

        it('should call console.error when result has an unexpected value (e.g. FOOBAR)', () => {
          const unexpectedResult = 'FOOBAR';
        
        GameView.getBackgroundColor(unexpectedResult);
        expect(console.error).toHaveBeenCalledWith('error:', new Error(`Unexpected value of result : ${unexpectedResult}`));
          });
    }); 
    


});



});