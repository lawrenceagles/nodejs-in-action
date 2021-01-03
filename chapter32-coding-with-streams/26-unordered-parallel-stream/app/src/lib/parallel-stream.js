import { Transform } from 'stream';

export class ParallelStream extends Transform {
  constructor(userTransform, options) {
    super({ objectMode: true, ...options });
    this.userTransform = userTransform;
    this.running = 0;
    this.terminateCb = null;
  }

  _transform(chunk, encoding, done) {
    this.running++;
    this.userTransform(chunk, encoding, this.push.bind(this), this._onComplete.bind(this));
    done();
  }

  _flush(done) {
    if (this.running > 0) {
      this.terminateCb = done;
    } else {
      done();
    }
  }

  _onComplete(err) {
    this.running--;
    if (err) {
      return this.emit('error', err);
    }
    if (this.running === 0) {
      this.terminateCb && this.terminateCb();
    }
  }
}