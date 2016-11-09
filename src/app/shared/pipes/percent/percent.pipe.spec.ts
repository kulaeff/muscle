import { PercentPipe } from './percent.pipe';

describe('ToPercentPipe', () => {
    let pipe: PercentPipe;

    beforeEach(() => {
        pipe = new PercentPipe();
    });
    it('transforms 35 relative to 200 to 17.5%', () => {
        expect(pipe.transform(35, 200)).toEqual('17.5%');
    });
});