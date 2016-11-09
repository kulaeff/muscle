import { NumberPipe } from './number.pipe';

describe('NumberPipe', () => {
    let pipe: NumberPipe;

    beforeEach(() => {
        pipe = new NumberPipe();
    });

    it('should transform 15 to 15,00', () => {
        expect(pipe.transform(15)).toEqual('15,00');
    });
});