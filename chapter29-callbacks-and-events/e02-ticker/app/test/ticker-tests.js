import tap from 'tap';
import sinon from 'sinon';
import { ticker } from '../src/lib/ticker.js';



tap.pass('file itself can be executed');

tap.test('module can be loaded', assert => {
  assert.ok(ticker, 'ticker is available');
  assert.type(ticker, 'function', 'ticker is a function');
  assert.ok(ticker(0, () => {}), 'the function returns something');
  assert.type(ticker(0, () => {}).on, 'function', `function exposes an 'on' function`);
  assert.type(ticker(0, () => {}).emit, 'function', `function exposes an 'emit' function`);
  assert.end();
});

tap.test('happy path, millis less than 50ms', assert => {
  const doneSpy = sinon.spy();
  const listenerSpy = sinon.spy();
  const clock = sinon.useFakeTimers();

  ticker(25, doneSpy)
    .on('tick', listenerSpy);

  assert.ok(doneSpy.notCalled, 'not called before next event loop');
  assert.ok(listenerSpy.notCalled, 'listener not called before next event loop');

  clock.tick(25);
  assert.true(doneSpy.calledOnceWithExactly(null, 0), 'done has been called with 0 as argument');
  assert.ok(listenerSpy.notCalled, 'listener not called after done');
  assert.end();
});

tap.test('happy path, exactly 50ms', assert => {
  const doneSpy = sinon.spy();
  const listenerSpy = sinon.spy();
  const clock = sinon.useFakeTimers();

  ticker(50, doneSpy)
    .on('tick', listenerSpy);

  assert.ok(doneSpy.notCalled, 'not called before next event loop');
  assert.ok(listenerSpy.notCalled, 'listener not called before next event loop');

  clock.tick(50);
  assert.ok(listenerSpy.calledOnce, 'listener called once');
  assert.ok(doneSpy.calledOnceWithExactly(null, 1), 'done called in next event loop with 1 as argument');
  assert.end();
});

tap.test('happy path, 75ms', assert => {
  const doneSpy = sinon.spy();
  const listenerSpy = sinon.spy();
  const clock = sinon.useFakeTimers();

  ticker(75, doneSpy)
    .on('tick', listenerSpy);

  assert.ok(doneSpy.notCalled, 'not called before next event loop');
  assert.ok(listenerSpy.notCalled, 'listener not called before next event loop');

  clock.tick(75);
  assert.ok(listenerSpy.calledOnce, 'listener called once');
  assert.ok(doneSpy.calledOnceWithExactly(null, 1), 'done called in next event loop with 1 as argument');
  assert.end();
});

tap.test('happy path, 300ms', assert => {
  const doneSpy = sinon.spy();
  const listenerSpy = sinon.spy();
  const clock = sinon.useFakeTimers();

  ticker(300, doneSpy)
    .on('tick', listenerSpy);

  assert.ok(doneSpy.notCalled, 'not called before next event loop');
  assert.ok(listenerSpy.notCalled, 'listener not called before next event loop');

  clock.tick(300);
  assert.equals(listenerSpy.callCount, 6, 'listener called 6 times');
  assert.ok(doneSpy.calledOnceWithExactly(null, 6), 'done called in next event loop with 6 as argument');
  assert.end();
});