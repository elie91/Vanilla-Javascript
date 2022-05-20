
const STATE = {
  FULFILLED: 'fulfilled',
  REJECTED: 'rejected',
  PENDING: 'pending',
}
class MyPromise {


  #state = STATE.PENDING;
  #value;
  #thenCbs = [];
  #catchCbs = [];

  constructor(cb) {
    try {
      cb(this.#onSuccess, this.#onFailure)
    } catch (error) {
      this.#onFailure(error);
    }
  }

  #runCallbacks() {
    if (this.#state === STATE.FULFILLED) {
      this.#thenCbs.forEach(callback => {
        callback(this.#value)
      });
      this.#thenCbs = [];

    }

    if (this.#state === STATE.REJECTED) {
      this.#catchCbs.forEach(callback => {
        callback(this.#value)
      });
      this.#catchCbs = [];
    }
  }

  #onSuccess(value) {
    if (this.#state !== STATE.PENDING) return;
    this.#value = value;
    this.#state = STATE.FULFILLED;
    this.#runCallbacks();
  }

  #onFailure(value) {
    if (this.#state !== STATE.PENDING) return;
    this.#value = value;
    this.#state = STATE.REJECTED;
    this.#runCallbacks();
  }

  then(cb) {
    this.#thenCbs.push(cb);

    this.#runCallbacks();
  }

}



module.exports = MyPromise;