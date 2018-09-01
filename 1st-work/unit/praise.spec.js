var value = 0;
function clickThumb(){
    value+=1;
}
describe('点赞', function () {
    clickThumb();
    it('点赞+1', function () {
        expect(value).toEqual(1);
    });

    clickThumb();
    it('点赞+2', function () {
        expect(value).toEqual(2);
    });
});