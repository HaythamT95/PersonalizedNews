class News {
    constructor(title, content) {
        this._title = title;
        this._content = content;
    }

    get title(){
        return this._title;
    }

    get content(){
        return this._content;
    }

    set title(title){
        this._title = title;
    }

    set content(content){
        this._content = content;
    }
}