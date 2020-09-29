
class Super {
    constructor(name) {
        this.name = name;
    }
}

class Sub extends Super {
    constructor(name, age) {
        super(name);
        this.age = age;
    }
}

let x = new Sub();


/* translate into es2015 easy pseudo code*/

function _checkIsNewed(instance, classConstruct) {
    if (!(instance instanceof classConstruct)) {
        throw new Error("can not call class as a function")
    }
}

function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
        return call;
    }
    return _assertThisInitialized(self);
}

function _assertThisInitialized(self) {ß
    if (self === void 0) {
        throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
        );
    }
    return self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: { value: subClass, writable: true, configurable: true }
    });
    if (superClass) Object.setPrototypeOf(subClass, superClass);
}

function Super(name) {
    _checkIsNewed(this, Super)
    this.name = name;
}

/* proper encapsulation

*/
(function (_super) {

    // pass on prototype and set Sub's prototype to be Super in the inherits function
    // encapsulation take in Super class as parameter
    _inherit(Sub, _super)

    function Sub(name, age) {
        //check if class is newed or used as a plain function
        _checkIsNewed(this, Sub)

        // in case parent function returns object or function, this case it returns undefined, so new _this get the value of this
        let _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Sub).call(this, name))

        _this.age = age;

        return _this;
    }

    return Sub

})(Super)



