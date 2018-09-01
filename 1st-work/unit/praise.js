class PraiseButton {
    constructor() {
        this.praise = 0;
    }
    addPraise() {
        this.praise += 1;
    }
    getPraise(){
        return this.praise;
    }
}

class Thumb extends PraiseButton {
    constructor(props) {
        super(props);
        this.praise = 0
    }
    clickThumb() {
        super.addPraise();
    }
}
export {Thumb};