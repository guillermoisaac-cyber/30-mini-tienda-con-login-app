import {isShake,shakeMagnitude} from '../src/sensors/shake';
test('movimiento normal no provoca vaciado',()=>expect(isShake(0,0,1)).toBe(false));
test('sacudida fuerte se detecta',()=>expect(isShake(3,0,0)).toBe(true));
test('magnitud pura',()=>expect(shakeMagnitude(3,4,0)).toBe(5));
