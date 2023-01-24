describe("app.js", ()=>{
    describe("getRandomChoice function", ()=> {
        it("should return a number between 0 and 2", ()=> {
        for (let i = 0; i < 100; i++) {
            let randomChoice = getRandomChoice();
            expect(randomChoice).toBeGreaterThanOrEqual(0);
            expect(randomChoice).toBeLessThan(3);
        }
        });
        xit("should return a different number each time it's called", function() {
        let previousChoice;
        for (let i = 0; i < 100; i++) {
            let randomChoice = getRandomChoice();
            expect(randomChoice).not.toEqual(previousChoice);
            previousChoice = randomChoice;
        }
        });
    });

});